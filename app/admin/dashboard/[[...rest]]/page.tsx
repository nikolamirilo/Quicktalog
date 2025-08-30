import { getUserData } from "@/actions/users"
import Dashboard from "@/components/admin/dashboard/Dashboard"
import FloatingActionMenu from "@/components/admin/dashboard/FloatingActionMenu"
import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"
import { Button } from "@/components/ui/button"
import type { Analytics, ServiceCatalogue, UserData } from "@/types"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function page() {
  const supabase = await createClient()
  let catalogues: ServiceCatalogue[] = []
  let analytics: Analytics[] = []
  const userData: UserData = await getUserData()
  if (userData) {
    const { data, error } = await supabase
      .from("service_catalogues")
      .select("*")
      .eq("created_by", userData.id)
    catalogues = error ? [] : data || []

    const { data: analyticsData, error: analyticsError } = await supabase
      .from("analytics")
      .select("date, hour, current_url, pageview_count, unique_visitors")
      .eq("user_id", userData.id)
    analytics = analyticsError ? [] : analyticsData || []

    const totalPageViews = analytics?.reduce((sum, a) => sum + (a.pageview_count || 0), 0)
    const totalUniqueVisitors = analytics?.reduce((sum, a) => sum + (a.unique_visitors || 0), 0)
    const totalServiceCatalogues = catalogues?.length || 0

    const overallAnalytics = {
      totalPageViews,
      totalUniqueVisitors,
      totalServiceCatalogues,
    }

    return (
      <div className="product font-lora min-h-screen">
        <Navbar />
        <Dashboard
          catalogues={catalogues}
          userData={userData}
          overallAnalytics={overallAnalytics}
        />
        <FloatingActionMenu />
        <Footer />
      </div>
    )
  }

  // Fallback with error message
  return (
    <div className="product font-lora min-h-screen">
      <Navbar />
      <div className="text-center text-black text-2xl h-screen flex flex-col gap-5 items-center justify-center">
        <p>Something went wrong. Please try again later.</p>
        <Button size="lg">
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  )
}
