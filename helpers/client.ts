import { ContactItem, HeaderData, ServiceCatalogue } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

export async function fetchImageFromUnsplash(query: string): Promise<string> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=1&per_page=1&query=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
        },
      }
    )

    const data = await res.json()

    if (data?.results?.[0]?.urls?.regular) {
      return data.results[0].urls.regular
    }
  } catch (err) {
    console.error(`Failed to fetch image for "${query}":`, err)
  }

  return "https://static1.squarespace.com/static/5898e29c725e25e7132d5a5a/58aa11bc9656ca13c4524c68/58aa11e99656ca13c45253e2/1487540713345/600x400-Image-Placeholder.jpg?format=original"
}

export const getGridStyle = (variant: string): string => {
  switch (variant) {
    case "variant_1":
      return "grid grid-cols-1 md:grid-cols-2 gap-3 px-2 my-4"
    case "variant_2":
      return "flex flex-wrap justify-start gap-3 mx-auto sm:gap-4 md:gap-6 my-4"
    case "variant_3":
      return "grid grid-cols-1 md:grid-cols-2 gap-3 my-4"
    case "variant_4":
      return ""
    default:
      return "flex flex-row flex-wrap gap-3 my-4"
  }
}

export const contentVariants = {
  hidden: { height: 0, opacity: 0, marginTop: 0 },
  visible: { height: "auto", opacity: 1, marginTop: 16 },
}
