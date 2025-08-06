import { getUserData } from "@/actions/users"
import { ServicesFormData } from "@/types"
import ServicesForm from "./components/ServicesForm"

export default async function ServicesFormSwitcher({
  type,
  initialData,
}: {
  type: "create" | "edit"
  initialData?: ServicesFormData
}) {
  const userData = await getUserData()
  if (type == "edit") {
    return <ServicesForm type={type} userData={userData} />
  } else {
    return <ServicesForm type={type} userData={userData} initialData={initialData} />
  }
}
