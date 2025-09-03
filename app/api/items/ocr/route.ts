import { fetchImageFromUnsplash } from "@/helpers/client"
import { ServicesCategory } from "@/types"
import { chatCompletion, createGenerationPrompt } from "@/utils/deepseek"
import { createClient } from "@/utils/supabase/server"
import { currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { prompt, ocr_text, formData } = await req.json()

  const supabase = await createClient()

  // Check that either prompt or ocr_text is provided
  if (!prompt && !ocr_text) {
    return NextResponse.json({ error: "Either prompt or ocr_text is required" }, { status: 400 })
  }

  const isOcrMode = !!ocr_text
  const inputText = isOcrMode ? ocr_text : prompt

  try {
    const generationPrompt = createGenerationPrompt(inputText, formData, isOcrMode)

    const response = await chatCompletion(generationPrompt)

    let generatedData: { services: ServicesCategory[] } = { services: [] }
    try {
      let cleanedText = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()
      const jsonStart = cleanedText.indexOf("{")
      const jsonEnd = cleanedText.lastIndexOf("}")

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("No JSON object found in response")
      }

      cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1)

      generatedData = JSON.parse(cleanedText)

      // Generate images only for AI mode (not OCR mode)
      if (!isOcrMode) {
        for (const category of generatedData.services) {
          if (category.layout != "variant_3") {
            for (const item of category.items) {
              item.image = await fetchImageFromUnsplash(item.name)
            }
          }
        }
      }

      // Validate that services is an array
      if (!Array.isArray(generatedData.services)) {
        console.error("Services is not an array:", generatedData)
        return NextResponse.json({ error: "Invalid services structure generated" }, { status: 500 })
      }
    } catch (e) {
      console.error("Failed to parse generated JSON:", response)
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
        .from("catalogues")
        .select("name")
        .eq("name", catalogueSlug)
        .single()

      if (!existingServiceCatalogue) break

      catalogueSlug = `${baseSlug}-${counter}`
      counter++
    }

    const { error } = await supabase
      .from("catalogues")
      .insert([
        {
          name: baseSlug,
          status: "active",
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
          services: generatedData.services,
        },
      ])
      .select()

    if (error) {
      console.error("Error inserting data into Supabase catalogues table:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { error: errorPrompt } = await supabase
      .from("prompts")
      .insert([{ user_id: user.id, service_catalogue: catalogueSlug }])
    if (errorPrompt) {
      console.error("Error inserting data into Supabase prompt table:", errorPrompt)
      return NextResponse.json({ error: errorPrompt.message }, { status: 500 })
    }

    return NextResponse.json({ restaurantUrl: `/catalogues/${catalogueSlug}` })
  } catch (error) {
    console.error("Error generating services:", error)

    // Handle specific API errors
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
