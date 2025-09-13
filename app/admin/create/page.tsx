import { getUserData } from "@/actions/users"
import ServicesFormSwitcher from "@/components/admin/create/ServicesFormSwitcher"
import LimitsModal from "@/components/modals/LimitsModal"
import Navbar from "@/components/navigation/Navbar"
import { UserData } from "@/types"

export const dynamic = "force-dynamic"
export default async function CreateServicesPage() {
  const userData: UserData = await getUserData()
  console.log(userData)
  if (userData && userData.usage.catalogues < userData.pricing_plan.features.catalogues) {
    return (
      <div className="product font-lora min-h-screen">
        <Navbar />
        <div className="w-full min-h-screen md:px-8 pt-24 pb-12 bg-gradient-to-br from-product-background to-hero-product-background animate-fade-in">
          <div className="container mx-auto flex flex-col px-4 gap-8">
            <ServicesFormSwitcher type="create" />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <LimitsModal
        type="catalogue"
        currentPlan={userData.pricing_plan.name}
        requiredPlan={userData.pricing_plan.next_plan}
      />
    )
  }
}
