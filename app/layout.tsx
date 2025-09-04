import ClarityScript from "@/components/analytics/ClarityScript"
import CookieBanner from "@/components/common/CookieBanner"
import { PageWrapperClient } from "@/components/wrappers/PageWrapperClient"
import {
  crimsonText,
  inter,
  loraRegular,
  loraSemiBold,
  nunito,
  playfairDisplay,
  poppins,
} from "@/fonts"
import { ClerkProvider } from "@clerk/nextjs"
import { GoogleTagManager } from "@next/third-parties/google"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Digital Catalog Builder - Create Online Catalogs Fast | Quicktalog",
  description:
    "Create interactive, mobile-friendly digital catalogs in minutes. No-code builder, AI generation, QR sharing, and analytics. Start free.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${loraRegular.variable} ${loraSemiBold.variable} ${playfairDisplay.variable} ${inter.variable} ${nunito.variable} ${crimsonText.variable} ${poppins.variable} antialiased`}>
      <head>
        <ClarityScript />
        <GoogleTagManager gtmId="G-RXHJ9X3T5T" />
      </head>
      <ClerkProvider afterSignOutUrl="/">
        <body className="product">
          <PageWrapperClient children={children} />
          <CookieBanner />
        </body>
      </ClerkProvider>
    </html>
  )
}
