import { defaultCookiePreferences } from "@/constants"
import { createClient } from "@/utils/supabase/server"
import { verifyWebhook } from "@clerk/nextjs/webhooks"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req)
    const supabase = await createClient()

    if (event.type === "user.created" || event.type === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url, public_metadata } = event.data
      const email = email_addresses?.[0]?.email_address || null
      const full_name = [first_name, last_name].filter(Boolean).join(" ")

      function handleUserData() {
        if (event.type === "user.updated") {
          return {
            id,
            email,
            image: image_url,
            name: full_name,
            cookie_preferences: public_metadata?.cookie_preferences || defaultCookiePreferences,
          }
        }

        if (event.type === "user.created") {
          return {
            id: id,
            email,
            image: image_url,
            name: full_name,
            plan_id: "pri_01k27ajepm199twd1x77rpwdrq",
            customer_id: null,
            cookie_preferences: defaultCookiePreferences,
          }
        }
      }

      const { error } = await supabase.from("users").upsert([handleUserData()])
      if (error) {
        console.error("Database error:", error)
        return new Response("Database error", { status: 500 })
      }

      return new Response("Webhook received", { status: 200 })
    }

    if (event.type === "user.deleted") {
      const { id } = event.data

      const { error } = await supabase.from("users").delete().eq("id", id)
      if (error) {
        console.error("Database error:", error)
        return new Response("Database error", { status: 500 })
      }

      return new Response("User deleted", { status: 200 })
    }

    return new Response("Event type not handled", { status: 200 })
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error verifying webhook", { status: 400 })
  }
}
