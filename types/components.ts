import { JSX } from "react"
import { FooterData, ServicesFormData, UserData } from "."

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

export type CatalogueFooterProps = {
  type?: "default" | "custom"
  customData?: FooterData
}

export type IFAQ = {
  question: string
  answer: string
}

export type ILinkItem = {
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
