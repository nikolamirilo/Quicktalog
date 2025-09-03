// app/dashboard/page.tsx
import { getUserData } from "@/actions/users"
import Dashboard from "@/components/admin/dashboard/Dashboard"
import FloatingActionMenu from "@/components/admin/dashboard/FloatingActionMenu"
import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"
import { Button } from "@/components/ui/button"
import type { UserData } from "@/types"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function page() {
  // Only fetch essential user data on server
  const userData: UserData = await getUserData()

  if (!userData) {
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

  const { pricing_plan, usage, ...user } = userData

  return (
    <div className="product font-lora min-h-screen">
      <Navbar />
      <Dashboard user={user} pricingPlan={pricing_plan} usage={usage} />
      <FloatingActionMenu />
      <Footer />
    </div>
  )
}
