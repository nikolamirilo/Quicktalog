import { ServicesFormData } from "@/types"
import schema from "@/utils/catalogue.schema.json"
import { createClient } from "@/utils/supabase/server"
import { currentUser } from "@clerk/nextjs/server"
import Groq from "groq-sdk"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { input } = await req.json()

    const supabase = await createClient()
    if (!input) {
        return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    try {
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY!,
        })

        const generationPrompt = `
        Role: You are an expert in creating structured service offers (e.g., restaurant menus, beauty center service lists, etc.).

        Task: Generate a complete service offer configuration in **valid JSON format**.  
        The JSON object must strictly follow the **ServicesFormData** type definition from the project.

        Input text (OCR extracted):  
        ${input}  

        Schema according to which you MUST prepare output:  
        ${JSON.stringify(schema)}  

        IMPORTANT RULES:
        1. Output must be **ONLY the JSON object** — no extra text, no markdown, no explanations. IT SHOULD BE VALID JSON!!.
        2. Response must begin with "{" and end with "}".  
        3. Service offer language and alphabet must match the input text.  
        4. The \`services\` field must be an **array of categories**, not an object.  
        5. Exclude fields: \`id\`, \`created_at\`, \`updated_at\`, \`created_by\`.  
        6. Each category must contain: \`name\`, \`layout\`, and \`items\` (array). Name detect from menu sections or if there is no exact name group items in logical way.
        7. Always set \`layout\` = "variant_3".  
        8. Each item must contain:  
        - \`name\` (full name of dish/service, e.g., "Spaghetti Carbonara", not just "Carbonara")  
        - \`description\` (write it yourself if missing in input)  
        - \`price\` (invent if missing in input)  
        - \`image\` (use placeholder: "https://static1.squarespace.com/static/5898e29c725e25e7132d5a5a/58aa11bc9656ca13c4524c68/58aa11e99656ca13c45253e2/1487540713345/600x400-Image-Placeholder.jpg?format=original")  
        9. Choose theme:  
        - Dark = restaurant  
        - Light = coffee shop or similar  
        10. Leave fields as follows:  
        - \`legal\` = {}  
        - \`configuration\` = {}  
        - \`contact\` = []  
        - \`logo\` = ""  
        11. If name and subtitle of business are missing, invent them. Write subtitle of at least 250 characters.
        12. Output MUST comply with SCHEMA!!!

        Now generate the JSON object:
        `;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: generationPrompt,
                },
            ],
            model: "gemma2-9b-it",
            temperature: 0.7,
            max_tokens: 8000,
            top_p: 1,
            stream: false,
        })

        const text = chatCompletion.choices[0]?.message?.content || ""

        let generatedData: ServicesFormData
        try {
            // Clean up the response to extract JSON
            let cleanedText = text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim()

            // Find the JSON object in the response
            const jsonStart = cleanedText.indexOf("{")
            const jsonEnd = cleanedText.lastIndexOf("}")

            if (jsonStart === -1 || jsonEnd === -1) {
                throw new Error("No JSON object found in response")
            }

            cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1)

            generatedData = JSON.parse(cleanedText)

            // IMAGE GENERATION

            // for (const category of generatedData.services) {
            //     for (const item of category.items) {
            //         item.image = await fetchImageFromUnsplash(item.name)
            //     }
            // }

            // Validate that services is an array
            if (!Array.isArray(generatedData.services)) {
                console.error("Services is not an array:", generatedData.services)
                return NextResponse.json({ error: "Invalid services structure generated" }, { status: 500 })
            }
        } catch (e) {
            console.error("Failed to parse generated JSON:", text)
            return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 })
        }

        const user = await currentUser()

        if (!user) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
        }

        // Generate unique restaurant slug
        const baseSlug = generatedData.name.toLowerCase().replace(/\s+/g, "-")
        let catalogueSlug = baseSlug
        let counter = 1

        // Check if slug already exists and make it unique
        while (true) {
            const { data: existingServiceCatalogue } = await supabase
                .from("service_catalogues")
                .select("name")
                .eq("name", catalogueSlug)
                .single()

            if (!existingServiceCatalogue) break

            catalogueSlug = `${baseSlug}-${counter}`
            counter++
        }

        // Transform services array to object structure expected by database
        const transformedServices = generatedData.services.reduce(
            (acc, category) => {
                const categorySlug = category.name.toLowerCase().replace(/\s+/g, "-")
                acc[categorySlug] = {
                    layout: category.layout,
                    items: category.items,
                }
                return acc
            },
            {} as Record<string, { layout: string; items: any[] }>
        )

        const { error } = await supabase
            .from("service_catalogues")
            .insert([
                {
                    name: catalogueSlug,
                    created_by: user.id,
                    theme: generatedData.theme,
                    logo: generatedData.logo,
                    title: generatedData.title,
                    currency: generatedData.currency,
                    legal: generatedData.legal,
                    partners: generatedData.partners,
                    configuration: generatedData.configuration,
                    contact: generatedData.contact,
                    subtitle: generatedData.subtitle,
                    services: transformedServices,
                },
            ])
            .select()

        if (error) {
            console.error("Error inserting data into Supabase service-catalogues table:", error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        const { error: errorPrompt } = await supabase
            .from("prompts")
            .insert([{ user_id: user.id, service_catalogue: catalogueSlug }])
        if (errorPrompt) {
            console.error("Error inserting data into Supabase prompt table:", errorPrompt)
            return NextResponse.json({ error: errorPrompt.message }, { status: 500 })
        }
        return NextResponse.json({ restaurantUrl: `/service-catalogues/${catalogueSlug}` })
    } catch (error) {
        console.error("Error generating services:", error)

        // Handle specific Groq API errors
        if (error instanceof Error) {
            if (error.message.includes("rate limit")) {
                return NextResponse.json(
                    {
                        error: "Rate limit exceeded. Please try again in a moment.",
                    },
                    { status: 429 }
                )
            }
            if (error.message.includes("401")) {
                return NextResponse.json(
                    {
                        error: "Invalid API key configuration.",
                    },
                    { status: 500 }
                )
            }
        }

        return NextResponse.json({ error: "Failed to generate services" }, { status: 500 })
    }
}
