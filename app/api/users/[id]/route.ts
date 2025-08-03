import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookiesStore = await cookies();
    const supabase = createClient(cookiesStore);
    const { id } = params; // Access id from params in App Router

    const { data: supabaseUser, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (userError) {
      console.error("Database Error: Failed to fetch user from Supabase.", userError);
      return NextResponse.json({ error: "Failed to retrieve user data" }, { status: 500 });
    }
    if (!supabaseUser) {
      console.warn(`User data not found for Clerk ID: ${id}.`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { data: pricingPlan, error: planError } = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('id', supabaseUser.plan_id)
      .single();

    if (planError) {
      console.error("Database Error: Failed to fetch pricing plan from Supabase.", planError);
      return NextResponse.json({ error: "Failed to retrieve pricing plan" }, { status: 500 });
    }
    if (!pricingPlan) {
      console.warn(`Pricing plan not found for ID: ${supabaseUser.plan_id}.`);
      const userData = { ...supabaseUser, plan_name: null, plan_features: null };
      return NextResponse.json(userData, { status: 200 });
    }

    const userData = {
      ...supabaseUser,
      plan_name: pricingPlan.name,
      plan_features: pricingPlan.features,
    };

    return NextResponse.json(userData, { status: 200 });

  } catch (error) {
    console.error("Unexpected error in API route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}