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

    const { data: analyticsData } = await supabase
      .from("analytics")
      .select("date, hour, current_url, pageview_count, unique_visitors")
      .eq("user_id", userData.id)

    const { count: newsletterCount } = await supabase
      .from("newsletter")
      .select("*", { count: "exact", head: true })
      .eq("owner_id", userData.id)

    const totalPageViews = analyticsData?.reduce((sum, a) => sum + (a.pageview_count || 0), 0) || 0
    const totalUniqueVisitors =
      analyticsData?.reduce((sum, a) => sum + (a.unique_visitors || 0), 0) || 0
    const totalNewsletterSubscriptions = newsletterCount || 0

    return NextResponse.json({
      totalPageViews,
      totalUniqueVisitors,
      totalNewsletterSubscriptions,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
