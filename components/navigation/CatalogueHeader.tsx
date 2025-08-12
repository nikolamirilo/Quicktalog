"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { FiExternalLink, FiMail, FiPhone, FiPlus } from "react-icons/fi"

interface CatalogueHeaderProps {
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

const CatalogueHeader: React.FC<CatalogueHeaderProps> = ({ type = "default", customData }) => {
  const [logoPath, setLogoPath] = useState("/logo.svg")

  useEffect(() => {
    const getLogoPath = () => {
      if (type === "custom" && customData?.logo) {
        return customData.logo
      }

      const mainElement = document.querySelector("main")
      const isDarkTheme =
        mainElement?.classList.contains("theme-elegant") ||
        mainElement?.classList.contains("theme-modern") ||
        mainElement?.classList.contains("theme-creative") ||
        document.querySelector(".theme-elegant") ||
        document.querySelector(".theme-modern") ||
        document.querySelector(".theme-creative")

      return type === "default"
        ? isDarkTheme
          ? "/logo-light.svg"
          : "/logo.svg"
        : customData?.logo || "/logo.svg"
    }

    setLogoPath(getLogoPath())
  }, [type, customData?.logo])

  return (
    <header
      className="border-b shadow-lg z-50"
      role="banner"
      aria-label={`${type === "default" ? "Quicktalog" : "Company"} header navigation`}
      style={{
        fontFamily: "var(--font-family-body, inherit)",
        fontWeight: "var(--font-weight-body, 400)",
        letterSpacing: "var(--letter-spacing-body, 0)",
        backgroundColor: "var(--header-bg, var(--card-bg))",
        color: "var(--foreground)",
        borderBottom: "1px solid var(--card-border)",
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 group transition-transform duration-200 hover:scale-105"
              aria-label={`Go to ${type === "default" ? "Quicktalog" : "company"} homepage`}>
              <Image
                src={logoPath}
                alt={`${type === "default" ? "Quicktalog" : "Company"} logo`}
                width={type === "default" ? 120 : 100}
                height={40}
                className="w-auto h-[7vh] rounded-full object-cover"
              />
            </Link>
          </div>

          {/* Contact & CTA */}
          <nav
            className="flex items-center space-x-2 sm:space-x-4"
            role="navigation"
            aria-label="Contact and actions">
            {/* Contact Icons */}
            <div
              className="hidden sm:flex items-center space-x-2"
              role="group"
              aria-label="Contact options">
              <a
                href={`mailto:${type === "default" ? "quicktalog@outlook.com" : customData?.email || ""}`}
                className="font-semibold px-2 h-9 rounded-lg border hover:scale-105 transition-all duration-200 group text-xs sm:text-sm lg:text-sm flex items-center justify-center"
                aria-label={`Send email to ${type === "default" ? "quicktalog@outlook.com" : customData?.email || ""}`}
                style={{
                  fontFamily: "var(--font-family-heading, inherit)",
                  fontWeight: "var(--font-weight-heading, 600)",
                  letterSpacing: "var(--letter-spacing-heading, -0.02em)",
                  backgroundColor: "var(--card-bg)",
                  color: "var(--foreground)",
                  borderColor: "var(--primary)",
                }}>
                <FiMail
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                />
              </a>
              {type === "custom" && customData?.phone && (
                <a
                  href={`tel:${customData.phone}`}
                  className="font-semibold px-2 h-9 rounded-lg border hover:scale-105 transition-all duration-200 group text-xs sm:text-sm lg:text-sm flex items-center justify-center"
                  aria-label={`Call ${customData.phone}`}
                  style={{
                    fontFamily: "var(--font-family-heading, inherit)",
                    fontWeight: "var(--font-weight-heading, 600)",
                    letterSpacing: "var(--letter-spacing-heading, -0.02em)",
                    backgroundColor: "var(--card-bg)",
                    color: "var(--foreground)",
                    borderColor: "var(--primary)",
                  }}>
                  <FiPhone
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>

            {/* CTA Button */}
            {(type === "default" || (type === "custom" && customData?.ctaNavbar?.enabled)) && (
              <Button
                asChild
                variant="secondary"
                size="default"
                className="font-semibold text-xs sm:text-sm lg:text-sm transition-all duration-200 hover:scale-105 border hover:bg-primary/10 hover:text-primary"
                style={{
                  fontFamily: "var(--font-family-heading, inherit)",
                  fontWeight: "var(--font-weight-heading, 600)",
                  letterSpacing: "var(--letter-spacing-heading, -0.02em)",
                  backgroundColor: "var(--card-bg)",
                  color: "var(--foreground)",
                  borderColor: "var(--primary)",
                }}>
                <Link
                  href={
                    type === "default" ? "/auth?mode=signup" : customData?.ctaNavbar?.url || "#"
                  }
                  aria-label={
                    type === "default"
                      ? "Create your own digital catalog"
                      : customData?.ctaNavbar?.label || "Learn more"
                  }>
                  {type === "default" ? (
                    <>
                      <FiPlus className="w-4 h-4 mr-2" aria-hidden="true" />
                      <span className="hidden sm:inline">Create Your Catalog</span>
                      <span className="sm:hidden">Get Started</span>
                    </>
                  ) : (
                    <>
                      <FiExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                      <span>{customData?.ctaNavbar?.label}</span>
                    </>
                  )}
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default CatalogueHeader
