import { PageWrapperClient } from "@/components/wrappers/PageWrapperClient"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"

import ClarityScript from "@/components/analytics/ClarityScript"
import {
  crimsonText,
  inter,
  loraRegular,
  loraSemiBold,
  nunito,
  playfairDisplay,
  poppins,
} from "@/fonts"
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
      </head>
      <ClerkProvider afterSignOutUrl="/">
        <body className="product">
          <PageWrapperClient children={children} />
        </body>
      </ClerkProvider>
    </html>
  )
}
