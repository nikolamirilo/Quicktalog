import { fetchImageFromUnsplash } from "@/helpers/client"
import { ServicesCategory } from "@/types"
import { NextResponse } from "next/server"

// Type definitions for better type safety
export interface GenerationRequest {
  prompt: string
  formData: {
    name: string
    title: string
    currency: string
    theme: string
    subtitle: string
  }
}

export interface GeneratedData {
  services: ServicesCategory[]
}

// Utility functions
export const createErrorResponse = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status })

export const extractJSONFromResponse = (response: string): GeneratedData => {
  const cleanedText = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

  const jsonStart = cleanedText.indexOf("{")
  const jsonEnd = cleanedText.lastIndexOf("}")

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("No JSON object found in response")
  }

  const jsonString = cleanedText.substring(jsonStart, jsonEnd + 1)
  const parsedData = JSON.parse(jsonString) as GeneratedData

  if (!parsedData.services || !Array.isArray(parsedData.services)) {
    throw new Error("Invalid services structure in response")
  }

  return parsedData
}

export const generateUniqueSlug = async (supabase: any, baseName: string): Promise<string> => {
  const baseSlug = baseName.toLowerCase().replace(/\s+/g, "-")
  let catalogueSlug = baseSlug
  let counter = 1

  while (true) {
    const { data: existing } = await supabase
      .from("catalogues")
      .select("name")
      .eq("name", catalogueSlug)
      .single()

    if (!existing) break

    catalogueSlug = `${baseSlug}-${counter}`
    counter++
  }

  return catalogueSlug
}

export const processImagesForServices = async (services: ServicesCategory[]): Promise<void> => {
  // Use Promise.all for concurrent image fetching instead of sequential
  const imagePromises = services
    .filter((category) => category.layout !== "variant_3")
    .flatMap((category) =>
      category.items.map(async (item) => {
        try {
          item.image = await fetchImageFromUnsplash(item.name)
        } catch (error) {
          console.warn(`Failed to fetch image for ${item.name}:`, error)
          // Set a default or leave empty instead of failing the entire request
          item.image = ""
        }
      })
    )

  await Promise.all(imagePromises)
}

export const insertCatalogueData = async (
  supabase: any,
  formData: GenerationRequest["formData"],
  generatedData: GeneratedData,
  userId: string,
  slug: string
) => {
  const catalogueData = {
    name: slug,
    status: "active" as const,
    title: formData.title,
    currency: formData.currency,
    theme: formData.theme,
    subtitle: formData.subtitle,
    created_by: userId,
    logo: "",
    legal: {},
    partners: [],
    configuration: {},
    contact: [],
    services: generatedData.services,
  }

  const { error } = await supabase.from("catalogues").insert([catalogueData]).select()

  if (error) {
    throw new Error(`Failed to insert catalogue: ${error.message}`)
  }

  // Insert prompt data
  const { error: promptError } = await supabase
    .from("prompts")
    .insert([{ user_id: userId, service_catalogue: slug }])

  if (promptError) {
    console.warn("Failed to insert prompt data:", promptError.message)
    // Don't fail the entire request for prompt insertion failure
  }

  return slug
}
