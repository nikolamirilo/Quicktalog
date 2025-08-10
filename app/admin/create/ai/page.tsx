import { getUserData } from "@/actions/users"
import AiServicesForm from "@/components/admin/form/AiServicesForm"
import UpgradePlan from "@/components/common/UpgradePlan"
import Navbar from "@/components/navigation/Navbar"

export const dynamic = "force-dynamic"
export default async function AiCreateServicesPage() {
  const userData = await getUserData()
  if (userData && userData.plan_name !== "Starter") {
    return (
      <div className="product font-lora min-h-screen">
        <Navbar />
        <div className="w-full min-h-screen px-2 md:px-8 pt-24 pb-12 bg-gradient-to-br from-product-background to-hero-product-background animate-fade-in">
          <div className="container mx-auto flex flex-col px-4 gap-8">
            <AiServicesForm />
          </div>
        </div>
      </div>
    )
  } else {
    return <UpgradePlan />
  }
}
