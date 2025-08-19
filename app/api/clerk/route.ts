import { createPaddleCustomer } from "@/actions/paddle"
import { createClient } from "@/utils/supabase/server"
import { verifyWebhook } from "@clerk/nextjs/webhooks"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req)

    if (event.type === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } = event.data
      const email = email_addresses?.[0]?.email_address || null
      const full_name = [first_name, last_name].filter(Boolean).join(" ")

      const supabase = await createClient()

      const paddleResponse = await createPaddleCustomer(email, full_name)
      if (paddleResponse.error) {
        console.error("Error creating customer:", paddleResponse.error)
        return new Response(`${paddleResponse.error}, details: ${paddleResponse.details}`, { status: 500 })
      }

      const { error } = await supabase.from("users").upsert([
        {
          id: id,
          email,
          image: image_url,
          name: full_name,
          plan_id: "pri_01k27ajepm199twd1x77rpwdrq",
          customer_id: paddleResponse.customer.id
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
