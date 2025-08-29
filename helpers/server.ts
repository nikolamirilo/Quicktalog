"use server"
import { revalidatePath, revalidateTag } from "next/cache"

export async function revalidateData() {
  revalidatePath("/", "layout")
}
export async function revalidateTagCustom(tag: string) {
  revalidateTag(tag)
}
