import ServicesFormSwitcher from "@/components/admin/form/ServicesFormSwitcher"
import Navbar from "@/components/navigation/Navbar"
import { ContactInfo, ServicesCategory, ServicesFormData, ServicesItem } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export default async function EditServicesPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase
    .from("service_catalogues")
    .select("*")
    .eq("name", name)
    .single()

  if (error || !data) {
    return <div className="p-8 text-center text-red-600">Failed to load restaurant data.</div>
  }

  // Transform DB data to ServicesFormData shape
  const servicesObj = data.services || {}
  const services: ServicesCategory[] = Object.entries(servicesObj).map(
    ([name, section]: [string, { layout: string; items: ServicesItem[] }]) => ({
      name,
      layout: section.layout || "variant_1",
      items: section.items || [],
    })
  )
  let contact: ContactInfo[] = []
  if (Array.isArray(data.contact)) {
    contact = data.contact
  } else if (data.contact && typeof data.contact === "object") {
    contact = Object.entries(data.contact).map(([type, value]) => ({
      type,
      value: String(value),
    }))
  }
  const initialData: ServicesFormData = {
    name: data.name || "",
    theme: data.theme || "",
    logo: data.logo || "",
    title: data.title || "",
    currency: data.currency || "",
    legal: data.legal || undefined,
    partners: data.partners || undefined,
    configuration: data.configuration || undefined,
    contact,
    subtitle: data.subtitle || "",
    services,
  }

  return (
    <div className="product font-lora min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 py-32">
        <ServicesFormSwitcher type="edit" initialData={initialData} />
      </div>
    </div>
  )
}
