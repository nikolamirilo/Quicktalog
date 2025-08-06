import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const {
      name,
      created_by,
      services,
      theme,
      logo,
      title,
      currency,
      legal,
      contact,
      subtitle,
      configuration,
    } = await request.json()

    const { data, error } = await supabase
      .from("service_catalogues")
      .insert([
        {
          name,
          created_by,
          services,
          theme,
          logo,
          title,
          currency,
          legal,
          contact,
          subtitle,
          configuration,
        },
      ])
      .select()

    if (error) {
      console.error("Error inserting service catalogue:", error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ data }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("Request error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const {
      name,
      services,
      theme,
      logo,
      title,
      currency,
      legal,
      contact,
      subtitle,
      configuration,
    } = await request.json()

    // Update the service catalogue record
    const { data, error } = await supabase
      .from("service_catalogues")
      .update({
        services,
        theme,
        logo,
        title,
        currency,
        legal,
        contact,
        subtitle,
        configuration,
        updated_at: new Date().toISOString(),
      })
      .eq("name", name)
      .select()

    if (error) {
      console.error("Error updating service catalogue:", error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!data || data.length === 0) {
      return new Response(JSON.stringify({ error: "Service Catalogue not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("Request error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}
