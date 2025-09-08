"use client"
import { Button } from "@/components/ui/button"
import { CatalogueHeaderProps } from "@/types/components"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { FiExternalLink, FiMail, FiPhone, FiPlus } from "react-icons/fi"

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
      className="border-b shadow-lg z-50 bg-card-bg text-foreground border-card-border font-body tracking-body"
      role="banner"
      aria-label={`${type === "default" ? "Quicktalog" : "Company"} header navigation`}>
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
                className="w-auto h-[7vh] object-cover"
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
                className="font-heading tracking-heading px-2 h-9 rounded-lg border hover:scale-105 transition-all duration-200 group text-xs sm:text-sm lg:text-sm flex items-center justify-center bg-card-bg text-foreground border-primary footer-cta-button"
                aria-label={`Send email to ${type === "default" ? "quicktalog@outlook.com" : customData?.email || ""}`}>
                <FiMail
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                />
              </a>
              {type === "custom" && customData?.phone && (
                <a
                  href={`tel:${customData.phone}`}
                  className="font-heading tracking-heading px-2 h-9 rounded-lg border hover:scale-105 transition-all duration-200 group text-xs sm:text-sm lg:text-sm flex items-center justify-center bg-card-bg text-foreground border-primary footer-cta-button"
                  aria-label={`Call ${customData.phone}`}>
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
                className="font-heading tracking-heading text-xs sm:text-sm lg:text-sm transition-all duration-200 hover:scale-105 border hover:bg-primary/10 hover:text-primary bg-card-bg text-foreground border-primary footer-cta-button">
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
