import { layouts, themes } from "@/constants/form"
import { JSX } from "react"

export type Record = {
  name: string
  description: string
  price: number
  image: string
}

export type NavbarProps = {
  itemData?: any
}

export interface ServicesItem {
  name: string
  description: string
  price: number
  image: string
}

export type Theme = {
  key: string
  label: string
  image: string
  description: string
}

export type Layout = Theme

export interface ServicesCategory {
  name: string
  layout: LayoutVariant
  items: ServicesItem[]
}

export type ThemeVariant = (typeof themes)[number]["key"]
export type LayoutVariant = (typeof layouts)[number]["key"]
export interface ServiceCatalogue {
  id: string
  name: string
  created_by: string
  theme: ThemeVariant
  logo?: string
  title: string
  currency: string
  contact?: {
    type: string
    value: string
  }[]
  subtitle?: string
  services: {
    [key: string]: ServicesCategory
  }
  partners?: Partner[]
  legal?: Legal
  configuration?: Configuration
}
export interface Service {
  name: string
  image: string
  price: number
  description: string
}
export interface Legal {
  name: string
  address: string
  terms_and_conditions: string
  privacy_policy: string
}
export interface Partner {
  name: string
  description: string
  url: string
}
export interface Configuration {
  emailButtonNavbar?: boolean
  ctaNavbar?: {
    enabled: boolean
    label: string
    url: string
  }
  ctaFooter?: {
    enabled: boolean
    label: string
    url: string
  }
  newsletter?: {
    enabled: boolean
    url: string
  }
}

export interface Analytics {
  date: string
  hour: string
  current_url: string
  pageview_count: number
  unique_visitors: number
}
export interface SupabaseUser {
  id: string
  email: string | null
  name: string | null
  created_at: string
  image: string | null
  plan_id: string | null
}

export interface ContactInfo {
  type: string
  value: string
}

export interface ServicesFormData {
  name: string
  theme?: string
  logo?: string
  layout?: string
  title?: string
  currency?: string
  legal?: Legal
  contact: ContactInfo[]
  subtitle?: string
  services: ServicesCategory[]
  configuration?: Configuration
  partners?: Partner[]
}
export interface UserData extends SupabaseUser {
  plan_name: string
  features: string[]
}

export const contactTypes = [
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "website", label: "Website" },
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter" },
]

export interface IServicesItem {
  text: string
  url: string
}

export interface IBenefit {
  title: string
  description: string
  imageSrc: string
  bullets: IBenefitBullet[]
}

export interface IBenefitBullet {
  title: string
  description: string
  icon: JSX.Element
}
export interface ServicesFormBaseProps {
  type: "create" | "edit"
  initialData?: ServicesFormData
  onSuccess?: (restaurantUrl: string) => void
  userData: UserData
}
export interface EditServicesFormProps {
  initialData: ServicesFormData
  onSuccess?: (restaurantUrl: string) => void
}

export interface PricingPlan {
  id: number
  name: string
  priceId: {
    month: string
    year: string
  }
  description: string
  features: {
    support: string
    catalogues: number
    newsletter: boolean
    customization: string
    ocr_ai_import: number
    traffic_limit: number
    custom_features: boolean
    analytics: string
    ai_catalogue_generation: number
  }
}

export interface IFAQ {
  question: string
  answer: string
}

export interface ITestimonial {
  name: string
  role: string
  message: string
  avatar: string
  industry?: string
  metric?: string
}

export interface IStats {
  title: string
  icon: JSX.Element
  description: string
}

export interface ISocials {
  facebook?: string
  github?: string
  instagram?: string
  linkedin?: string
  threads?: string
  twitter?: string
  youtube?: string
  x?: string
  [key: string]: string | undefined
}

export type ContactData = {
  message: string
  email: string
  name: string
  subject: string
}
