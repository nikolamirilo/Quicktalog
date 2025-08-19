import { tiers } from "@/constants/pricing"
import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {

    const supabase = await createClient()
    const { id } = await params

    const { data: User, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single()

    if (userError) {
      console.error("Database Error: Failed to fetch user from Supabase.", userError)
      return NextResponse.json({ error: "Failed to retrieve user data" }, { status: 500 })
    }
    if (!User) {
      console.warn(`User data not found for Clerk ID: ${id}.`)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const pricingPlan = tiers.find((tier) =>
      Object.values(tier.priceId).includes(User.plan_id)
    )
    if (!pricingPlan) {
      console.warn(`Pricing plan not found for ID: ${User.plan_id}.`)
      const userData = { ...User, plan_name: null, plan_features: null }
      return NextResponse.json(userData, { status: 200 })
    }

    const userData = {
      ...User,
      plan_name: pricingPlan.name,
      plan_features: pricingPlan.features,
    }

    return NextResponse.json(userData, { status: 200 })
  } catch (error) {
    console.error("Unexpected error in API route:", error)
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 })
  }
}
