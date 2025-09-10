"use server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function revalidateData() {
  revalidatePath("/", "layout")
}
export async function revalidateAllCatalogues() {
  revalidatePath("/catalogues/[name]")
}

export async function revalidatePageData(catalogueName: string) {
  try {
    console.log(`Attempting to revalidate: /catalogues/${catalogueName}`)

    // Revalidate the specific catalogue page
    revalidatePath(`/catalogues/${catalogueName}`, "page")

    // Also revalidate the catalogues listing page if it exists
    revalidatePath("/catalogues", "page")

    // Optionally revalidate the layout to ensure navigation updates
    revalidatePath("/", "layout")

    console.log(`Successfully revalidated: /catalogues/${catalogueName}`)
    return { success: true }
  } catch (error) {
    console.error(`Failed to revalidate /catalogues/${catalogueName}:`, error)
    return { success: false, error: error.message }
  }
}

export async function revalidateTagCustom(tag: string) {
  try {
    console.log(`Attempting to revalidate tag: ${tag}`)
    revalidateTag(tag)
    console.log(`Successfully revalidated tag: ${tag}`)
    return { success: true }
  } catch (error) {
    console.error(`Failed to revalidate tag ${tag}:`, error)
    return { success: false, error: error.message }
  }
}

// New helper for multiple revalidation strategies
export async function revalidateCatalogueData(catalogueName: string) {
  try {
    // Strategy 1: Revalidate specific paths
    revalidatePath(`/catalogues/${catalogueName}`, "page")
    revalidatePath("/catalogues", "page")

    // Strategy 2: Revalidate by tag (if you're using tags in your data fetching)
    revalidateTag(`catalogue-${catalogueName}`)
    revalidateTag("catalogues")

    // Strategy 3: Force revalidate the entire app if needed (use sparingly)
    // revalidatePath("/", "layout")

    return { success: true }
  } catch (error) {
    console.error(`Failed to revalidate catalogue data for ${catalogueName}:`, error)
    return { success: false, error: error.message }
  }
}
