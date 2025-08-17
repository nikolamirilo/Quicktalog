"use server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function newsletterSignup(email: string, catalogue_id: string, owner_id: string) {
    try {
        const cookieStore = await cookies()
        const supabase = createClient(cookieStore)

        const { error } = await supabase
            .from("newsletter")
            .insert([{ email, catalogue_id, owner_id }])

        if (error) {
            console.error("Error inserting data into Supabase 'newsletter' table:", error)
            return false
        }

        return true
    } catch (err) {
        console.error("Unexpected error while inserting record in newsletter table:", err)
        return false
    }
}
