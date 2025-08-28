import { layouts, themes } from "@/constants/general"
import { Customer } from "@paddle/paddle-node-sdk"
import { JSX } from "react"

export type Record = {
  name: string
  description: string
  price: number
  image: string
}
export type CookiePreferences = {
  accepted: boolean
  essential: boolean
  analytics: boolean
  marketing: boolean
  timestamp: string
  version: string
}

export type NavbarProps = {
  itemData?: unknown
}

export type ServicesItem = {
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

export type ThemeVariant = (typeof themes)[number]["key"]
export type LayoutVariant = (typeof layouts)[number]["key"]

export type ServicesCategory = {
  name: string
  layout: LayoutVariant
  items: ServicesItem[]
}

export type ServiceCatalogue = {
  id: string
  name: string
  created_by: string
  theme: ThemeVariant
  logo?: string
  title: string
  currency: string
  contact?: ContactInfo[]
  subtitle?: string
  services: ServicesCategory[]
  partners?: Partner[]
  legal?: Legal
  configuration?: Configuration
}

export type ServicesFormData = Omit<ServiceCatalogue, "id" | "created_by" | "">

export type Service = {
  name: string
  image: string
  price: number
  description: string
}

export type Legal = {
  name: string
  address: string
  terms_and_conditions: string
  privacy_policy: string
}

export type Partner = {
  name: string
  logo: string
  description: string
  rating: number
  url?: string
}

export type Configuration = {
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

export type Analytics = {
  date: string
  hour: string
  current_url: string
  pageview_count: number
  unique_visitors: number
}

export type User = {
  id: string
  email: string | null
  name: string | null
  created_at: string
  image: string | null
  plan_id: string | null
  customer_id: string | null
}

export type ContactInfo = {
  type: string
  value: string
}

export type PaddleCustomerResponse = {
  data?: Customer
  error?: {
    type: string
    code: string
    detail: string
    documentation_url: string
  }
  meta: {
    request_id: string
  }
}

export type Usage = {
  traffic: { pageview_count: number; unique_visitors: number }
  ocr: number
  prompts: number
  catalogues: number
}

export type UserData = User & {
  usage: Usage
  plan_name: string
  next_plan: string
  plan_features: PricingPlan["features"] | null
  current_plan_id: number
}
export interface LanguageOption {
  code: string
  name: string
  flag: string
}

export interface OcrState {
  result: string
  selectedImage: File | null
  processedImageUrl: string
  status: string
  confidence: number
  selectedLanguage: string
  detectedLanguage: string
  isSubmitting: boolean
  serviceCatalogueUrl: string
  showSuccessModal: boolean
}

export type IServicesItem = {
  text: string
  url: string
}

export type IBenefit = {
  title: string
  description: string
  imageSrc: string
  bullets: IBenefitBullet[]
}

export type IBenefitBullet = {
  title: string
  description: string
  icon: JSX.Element
}

export type ServicesFormBaseProps = {
  type: "create" | "edit"
  initialData?: ServicesFormData
  onSuccess?: (restaurantUrl: string) => void
  userData: UserData
}

export type EditServicesFormProps = {
  initialData: ServicesFormData
  onSuccess?: (restaurantUrl: string) => void
}

export type PricingPlan = {
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

export type OverallUsage = {
  traffic: number
  prompts: number
  ocr: number
  catalogues: number
}

export type IFAQ = {
  question: string
  answer: string
}

export type ITestimonial = {
  name: string
  role: string
  message: string
  avatar: string
  industry?: string
  metric?: string
}

export type IStats = {
  title: string
  icon: JSX.Element
  description: string
}

export type CatalogueHeaderProps = {
  type?: "default" | "custom"
  customData?: {
    logo?: string
    email?: string
    phone?: string
    emailButtonNavbar?: boolean
    ctaNavbar?: {
      enabled: boolean
      label: string
      url: string
    }
  }
}

export type ISocials = {
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

export type ContactItem = {
  type: string
  value: string
}

export type HeaderData = {
  logo: string
  email: string
  phone: string
  emailButtonNavbar?: boolean
  ctaNavbar?: any
}

export type FooterData = {
  logo: string
  name: string
  email?: string
  partners?: Partner[]
  phone?: string
  socialLinks: {
    instagram?: string
    facebook?: string
    twitter?: string
    website?: string
    linkedin?: string
    youtube?: string
    github?: string
    x?: string
    threads?: string
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
  legal?: Legal
  catalogue?: {
    id?: string
    owner_id?: string
  }
}

export type FooterDetails = {
  subheading: string
  quickLinks: IServicesItem[]
  email: string
  telephone: string
  socials: ISocials
}

export type CatalogueFooterProps = {
  type?: "default" | "custom"
  customData?: FooterData
}
