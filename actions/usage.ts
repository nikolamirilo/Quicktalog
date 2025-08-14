"use server"
import { createClient } from "@/utils/supabase/server"
import { currentUser } from "@clerk/nextjs/server"
import { cookies } from "next/headers"

export async function assignUsage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const user = await currentUser()
  const { error: errorPrompt } = await supabase.from("ocr").insert([{ user_id: user.id }])
  if (errorPrompt) {
    console.error("Error inserting data into Supabase prompt table:", errorPrompt)
    return false
  } else {
    return true
  }
}
