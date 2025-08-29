import { ILinkItem, ISocials } from "@/types/components"

export const footerDetails: {
  subheading: string
  quickLinks: ILinkItem[]
  email: string
  telephone: string
  socials: ISocials
} = {
  subheading: "Empowering businesses to go digital with interactive catalogues.",
  quickLinks: [
    {
      text: "Pricing",
      url: "/pricing",
    },
    {
      text: "Showcases",
      url: "/showcases",
    },
    {
      text: "Terms & Conditions",
      url: "/terms-and-conditions",
    },
    {
      text: "Privacy Policy",
      url: "/privacy-policy",
    },
    {
      text: "Refund Policy",
      url: "/refund-policy",
    },
  ],
  email: "quicktalog@outlook.com",
  telephone: "+1 (800) 123-4567",
  socials: {
    // github: 'https://github.com',
    // x: 'https://twitter.com/x',
    twitter: "https://twitter.com/Twitter",
    facebook: "https://facebook.com",
    // youtube: 'https://youtube.com',
    linkedin: "https://www.linkedin.com",
    // threads: 'https://www.threads.net',
    instagram: "https://www.instagram.com",
  },
}
