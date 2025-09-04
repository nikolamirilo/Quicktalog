import { getUserData } from "@/actions/users"
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const userData = await getUserData()

    if (!userData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("catalogues")
      .select("*")
      .eq("created_by", userData.id)

    if (error) {
      throw error
    }

    return NextResponse.json(data || [])
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch catalogues" }, { status: 500 })
  }
}
