import { tiers } from "@/constants/pricing"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { id } = await params

    const { data: supabaseUser, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single()

    if (userError) {
      console.error("Database Error: Failed to fetch user from Supabase.", userError)
      return NextResponse.json({ error: "Failed to retrieve user data" }, { status: 500 })
    }
    if (!supabaseUser) {
      console.warn(`User data not found for Clerk ID: ${id}.`)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const pricingPlan = tiers.find((tier) =>
      Object.values(tier.priceId).includes(supabaseUser.plan_id)
    )
    if (!pricingPlan) {
      console.warn(`Pricing plan not found for ID: ${supabaseUser.plan_id}.`)
      const userData = { ...supabaseUser, plan_name: null, plan_features: null }
      return NextResponse.json(userData, { status: 200 })
    }

    const userData = {
      ...supabaseUser,
      plan_name: pricingPlan.name,
      plan_features: pricingPlan.features,
    }

    return NextResponse.json(userData, { status: 200 })
  } catch (error) {
    console.error("Unexpected error in API route:", error)
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 })
  }
}
