import { getUserData } from "@/actions/users"
import AiServicesFormSwithcer from "@/components/admin/form/AiServicesFormSwitcher"
import UpgradePlan from "@/components/modals/LimitsModal"
import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"

export const dynamic = "force-dynamic"
export default async function page() {
  const userData = await getUserData()
  console.log(userData)
  if (userData && userData.plan_name !== "Starter") {
    return (
      <div className="product font-lora min-h-screen">
        <Navbar />
        <div className="w-full min-h-screen px-2 md:px-8 pt-24 pb-12 bg-gradient-to-br from-product-background to-hero-product-background animate-fade-in">
          <div className="container mx-auto flex flex-col px-4 gap-8">
            <AiServicesFormSwithcer type="ai_prompt" />
          </div>
        </div>
        <Footer />
      </div>
    )
  } else {
    return <UpgradePlan />
  }
}
