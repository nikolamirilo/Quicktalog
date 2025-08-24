import { ServicesCategory } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { currentUser } from "@clerk/nextjs/server"
import Groq from "groq-sdk"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { ocr_text, formData } = await req.json()

    const supabase = await createClient()
    if (!ocr_text) {
        return NextResponse.json({ error: "OCR text is required" }, { status: 400 })
    }

    try {
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY!,
        })

        const generationPrompt = `
      Role: You are an expert in creating service offers (restaurant services, beauty center service offer, etc.).
      Based on the following prompt, generate a complete service offer configuration in JSON format.
      The JSON object should strictly follow the type definition from the project.
      
      Prompt: Create services array based on text extracted from service catalogue: ${ocr_text}
      
      Schema: ${JSON.stringify({
            services: [
                {
                    name: "Name of category (e.g. lunch, breakfast, welness, etc.)",
                    layout: "variant_3",
                    items: [{
                        name: "Item Name",
                        description: "Description of Item",
                        price: 12,
                        image: "leave as empty string as I will populate this later via unsplash API"
                    }]
                }
            ]
        })}

    For layout use always variant_3

    Detect categories in text (breakfast, lunch, etc.) if you dont see it there group items by similarity. 

    General information about service catalogue: ${JSON.stringify(formData)}
      
      IMPORTANT REQUIREMENTS:
      1. Return ONLY the JSON object, no additional text, explanations, or formatting
      2. Start your response directly with { and end with }
      3. Service offer should be created in the language and alphabet of the text.
      4. Ensure the JSON is valid and well-formed  
      `
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

        let generatedData: { services: ServicesCategory[] } = { services: [] }
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

            // for (const category of generatedData.services) {
            //     if (category.layout != "variant_3") {
            //         for (const item of category.items) {
            //             item.image = await fetchImageFromUnsplash(item.name)
            //         }
            //     }
            // }

            // Validate that services is an array
            if (!Array.isArray(generatedData.services)) {
                console.error("Services is not an array:", generatedData)
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
        const baseSlug = formData.name.toLowerCase().replace(/\s+/g, "-")
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
                    name: baseSlug,
                    title: formData.title,
                    currency: formData.currency,
                    theme: formData.theme,
                    subtitle: formData.subtitle,
                    created_by: user.id,
                    logo: "",
                    legal: {},
                    partners: [],
                    configuration: {},
                    contact: [],
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
