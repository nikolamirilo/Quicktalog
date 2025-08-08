import { PageWrapperClient } from "@/components/wrappers/PageWrapperClient"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Crimson_Text, Inter, Lora, Nunito, Playfair_Display, Poppins } from "next/font/google"
import "./globals.css"

const loraRegular = Lora({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lora-regular",
  display: "swap",
})

const loraSemiBold = Lora({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-lora-semibold",
  display: "swap",
})

// Theme Fonts
const playfairDisplay = Playfair_Display({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const nunito = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
})

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-crimson-text",
  display: "swap",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Quicktalog App",
  description:
    "Qicktalog is Sass application that allows you to create and manage your own catalog of services and digitlize your business.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${loraRegular.variable} ${loraSemiBold.variable} ${playfairDisplay.variable} ${inter.variable} ${nunito.variable} ${crimsonText.variable} ${poppins.variable} antialiased`}>
      <ClerkProvider afterSignOutUrl="/">
        <body className="product">
          <PageWrapperClient children={children} />
        </body>
      </ClerkProvider>
    </html>
  )
}
