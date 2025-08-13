import { createClient } from "@/utils/supabase/server"
import { verifyWebhook } from "@clerk/nextjs/webhooks"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req)

    if (event.type === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } = event.data
      const email = email_addresses?.[0]?.email_address || null
      const cookieStore = await cookies()
      const supabase = createClient(cookieStore)

      const { error } = await supabase.from("users").upsert([
        {
          id: id,
          email,
          image: image_url,
          name: [first_name, last_name].filter(Boolean).join(" "),
          plan_id: "pri_01k27ajepm199twd1x77rpwdrq",
        },
      ])

      if (error) {
        console.error("Database error:", error)
        return new Response("Database error", { status: 500 })
      }
      return new Response("Webhook received", { status: 200 })
    } else {
      return new Response("Event type not handled", { status: 200 })
    }
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error verifying webhook", { status: 400 })
  }
}
