import { ContactItem, HeaderData, ServiceCatalogue } from "@/types"

export function formatPrice(price) {
  if (!price.includes(".")) return price
  return price.split(".")[0]
}

const now = new Date()
export const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
export const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

export const getContactValue = (
  contact: ContactItem[] | undefined,
  type: string
): string | undefined => {
  if (!contact || !Array.isArray(contact)) return undefined
  return contact.find((c) => c.type === type)?.value
}

export const buildHeaderData = (item: ServiceCatalogue): HeaderData => ({
  logo: item.logo || "/logo.svg",
  email: getContactValue(item.contact, "email") || "",
  phone: getContactValue(item.contact, "phone") || "",
  emailButtonNavbar: item.configuration?.emailButtonNavbar,
  ctaNavbar: item.configuration?.ctaNavbar,
})

export const buildFooterData = (item: ServiceCatalogue) => ({
  logo: item.logo || "/logo.svg",
  name: item.name || "",
  email: getContactValue(item.contact, "email"),
  partners: item.partners,
  phone: getContactValue(item.contact, "phone"),
  socialLinks: {
    instagram: getContactValue(item.contact, "instagram"),
    facebook: getContactValue(item.contact, "facebook"),
    twitter: getContactValue(item.contact, "twitter"),
    website: getContactValue(item.contact, "website"),
  },
  ctaFooter: item.configuration?.ctaFooter,
  newsletter: item.configuration?.newsletter,
  legal: item.legal,
  catalogue: {
    id: item.id,
    owner_id: item.created_by,
  },
})
