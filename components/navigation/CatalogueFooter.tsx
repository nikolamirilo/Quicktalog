"use client"
import { newsletterSignup } from "@/actions/newsletter"
import { Button } from "@/components/ui/button"
import { footerDetails } from "@/constants/details"
import { getPlatformIconByName } from "@/constants/ui"
import { CatalogueFooterProps } from "@/types/components"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import {
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiPlus,
  FiShield,
  FiUsers,
  FiZap
} from "react-icons/fi"
import { MdTitle } from "react-icons/md"

// Custom hook for theme detection
const useThemeDetection = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      const hasDarkTheme = document.querySelector(".theme-elegant, .theme-modern, .theme-creative")
      setIsDarkTheme(!!hasDarkTheme)
    }

    checkTheme()

    // Add mutation observer for dynamic theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return { isDarkTheme }
}

const CatalogueFooter: React.FC<CatalogueFooterProps> = ({ type = "default", customData }) => {
  const {
    logo: customLogo,
    name: customCompanyName,
    email: customEmail,
    phone: customPhone,
    socialLinks: customSocialLinks,
    partners: customPartnerBadges,
    ctaFooter,
    newsletter,
    catalogue,
    legal,
  } = customData || {}

  const { isDarkTheme } = useThemeDetection()
  const [logoPath, setLogoPath] = useState("/logo.svg")
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const socialLinks = footerDetails.socials

  const features = [
    {
      icon: <FiZap className="w-4 h-4" />,
      title: "OCR Import Technology",
      description: "Scan existing catalogs",
    },
    {
      icon: <FiShield className="w-4 h-4" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security",
    },
    {
      icon: <FiUsers className="w-4 h-4" />,
      title: "Multi-device Access",
      description: "Works on all devices",
    },
    {
      icon: <FiExternalLink className="w-4 h-4" />,
      title: "QR Code Sharing",
      description: "One-click sharing",
    },
  ]

  // Determine logo based on theme
  useEffect(() => {
    const getLogoPath = () => {
      if (type === "custom" && customLogo) {
        return customLogo
      }

      return type === "default"
        ? isDarkTheme
          ? "/logo-light.svg"
          : "/logo.svg"
        : customLogo || "/logo.svg"
    }

    setLogoPath(getLogoPath())
  }, [type, customLogo, isDarkTheme])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      // Call the actual newsletter signup function
      await newsletterSignup(newsletterEmail, catalogue?.id, catalogue?.owner_id)

      console.log("Newsletter signup successful:", newsletterEmail)

      setNewsletterEmail("")
      setSubmitSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error: any) {
      console.error("Newsletter signup failed:", error)

      // If there's a specific message from the error (e.g. from Supabase or fetch), use it
      const message =
        error?.message || error?.response?.data?.message || "Failed to subscribe. Please try again."

      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Enhanced Social Icon Component
  const SocialIcon = ({
    platform,
    href,
    className = "",
  }: {
    platform: string
    href: string
    className?: string
  }) => (
    <Link
      href={href}
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-3 group bg-card-bg text-card-description border border-card-border ${className}`}
      aria-label={`Follow us on ${platform}`}>
      <div className="group-hover:text-primary transition-colors duration-300">
        {getPlatformIconByName(platform)}
      </div>
    </Link>
  )

  // Enhanced Partner Badge Component
  const PartnerBadge = ({
    partner,
  }: {
    partner: { name: string; logo: string; description: string; rating: number; url?: string }
  }) => {
    const [imageError, setImageError] = useState(false)

    return (
      <div
        className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer bg-card-bg text-card-description border border-card-border"
        onClick={() => partner.url && window.open(partner.url, "_blank")}
        role={partner.url ? "button" : undefined}
        tabIndex={partner.url ? 0 : undefined}
        onKeyDown={(e) => {
          if (partner.url && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault()
            window.open(partner.url, "_blank")
          }
        }}>
        <div className="w-8 h-8 flex items-center justify-center">
          {imageError ? (
            <span className="text-lg">{partner.name.charAt(0)}</span>
          ) : (
            <Image
              src={partner.logo || `https://logo.clearbit.com/${partner.url}`}
              alt={`${partner.name} logo`}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm font-heading font-weight-heading tracking-heading text-card-heading">
            {partner.name}
          </div>
          <div className="text-xs text-card-description">{partner.description}</div>
        </div>
      </div>
    )
  }

  return (
    <footer
      className="border-t mt-auto font-body font-weight-body tracking-body bg-footer-bg text-footer-text border-footer-border"
      role="contentinfo"
      aria-label={`${type === "default" ? "Quicktalog" : customCompanyName || "Custom"} footer`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Primary Footer - Top Row */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1: Brand + Social + CTA (Default) / Brand + Social (Custom) */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Link
                  href="/"
                  className="flex flex-col items-start space-y-2 group transition-transform duration-200 hover:scale-105"
                  aria-label={`Go to ${type === "default" ? "Quicktalog" : customCompanyName || "Custom"} homepage`}>
                  <Image
                    src={logoPath}
                    alt={`${type === "default" ? "Quicktalog" : customCompanyName || "Custom"} logo`}
                    width={120}
                    height={40}
                    className="w-24 h-auto"
                  />
                  {type === "default" && (
                    <p className="text-sm text-card-description">Digital Catalogue Platform</p>
                  )}
                  {type === "custom" && (
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200 font-heading font-weight-heading tracking-heading text-section-heading">
                        {customCompanyName}
                      </h3>
                      <p className="text-sm text-card-description">Professional Services</p>
                    </div>
                  )}
                </Link>
                <p className="text-sm leading-relaxed text-card-description">
                  {type === "default"
                    ? footerDetails.subheading
                    : "Professional services delivered with excellence and attention to detail."}
                </p>
              </div>

              {/* Social Icons (Custom only) */}
              {type === "custom" &&
                customSocialLinks &&
                Object.keys(customSocialLinks).length > 0 && (
                  <nav
                    className="flex items-center space-x-3"
                    role="navigation"
                    aria-label="Social media links">
                    {Object.keys(customSocialLinks).map((platform) => {
                      const socialUrl =
                        customSocialLinks[platform as keyof typeof customSocialLinks]
                      if (platform && socialUrl) {
                        return <SocialIcon key={platform} platform={platform} href={socialUrl} />
                      }
                      return null
                    })}
                  </nav>
                )}
            </div>

            {/* Column 2: Contact & Support */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold flex items-center space-x-2 font-heading font-weight-heading tracking-heading text-section-heading">
                <div className="w-1 h-5 bg-primary rounded-full" aria-hidden="true"></div>
                <span>Contact & Support</span>
              </h4>
              <ul className="space-y-4">
                {(type === "default" || customEmail) && (
                  <li>
                    <a
                      href={`mailto:${type === "default" ? footerDetails.email : customEmail}`}
                      className="flex items-center space-x-3 text-sm hover:text-primary transition-colors duration-200 group text-card-description"
                      aria-label={`Send email to ${type === "default" ? footerDetails.email : customEmail || "contact"}`}>
                      <FiMail
                        className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                        aria-hidden="true"
                      />
                      <span>{type === "default" ? footerDetails.email : customEmail}</span>
                    </a>
                  </li>
                )}
                <li>
                  <Link
                    href="/contact"
                    className="flex items-center space-x-3 text-sm hover:text-primary transition-colors duration-200 group text-card-description"
                    aria-label="Contact us">
                    <FiExternalLink
                      className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                      aria-hidden="true"
                    />
                    <span>Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Platform Features (Default) / Company Info (Custom) */}
            <div className="space-y-6">
              {type === "default" ? (
                <>
                  <h4 className="text-lg font-semibold flex items-center space-x-2 font-heading font-weight-heading tracking-heading text-section-heading">
                    <div className="w-1 h-5 bg-primary rounded-full" aria-hidden="true"></div>
                    <span>Platform Features</span>
                  </h4>
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 group text-card-description">
                        <div className="mt-1 group-hover:scale-110 transition-transform duration-200 text-primary">
                          {feature.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-sm font-heading font-weight-heading tracking-heading text-card-heading">
                            {feature.title}
                          </div>
                          <div className="text-xs opacity-75">{feature.description}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h4 className="text-lg font-semibold flex items-center space-x-2 font-heading font-weight-heading tracking-heading text-section-heading">
                    <div className="w-1 h-5 bg-primary rounded-full" aria-hidden="true"></div>
                    <span>Company Information</span>
                  </h4>
                  <ul className="space-y-4">
                    {legal?.name && (
                      <li className="flex items-center space-x-3">
                        <MdTitle className="w-4 h-4 flex-shrink-0 text-card-description" />
                        <span className="text-sm text-card-description">{legal.name}</span>
                      </li>
                    )}
                    {legal?.address && (
                      <li className="flex items-start space-x-3">
                        <FiMapPin className="w-4 h-4 mt-1 flex-shrink-0 text-card-description" />
                        <div className="text-sm text-card-description">
                          <div>{legal.address}</div>
                        </div>
                      </li>
                    )}
                  </ul>
                </>
              )}
            </div>

            {/* Column 4: Social + CTA (Default) / Trusted Partners (Custom) */}
            <div className="space-y-6">
              {type === "default" ? (
                <>
                  {/* Social Icons (Default only) */}
                  <div className="flex items-center space-x-3">
                    {Object.keys(socialLinks).map((platform, index) => (
                      <SocialIcon
                        key={index}
                        platform={platform}
                        className="rounded-lg"
                        href={socialLinks[platform as keyof typeof socialLinks]}
                      />
                    ))}
                  </div>

                  {/* CTA Button (Default only) */}
                  <Button
                    asChild
                    variant="secondary"
                    size="default"
                    className="font-heading tracking-heading text-xs sm:text-sm lg:text-sm transition-all duration-200 hover:scale-105 border hover:bg-primary/10 hover:text-primary bg-card-bg text-foreground border-primary footer-cta-button">
                    <Link href="/auth?mode=signup" aria-label="Create your own digital catalog">
                      <FiPlus className="w-4 h-4" />
                      Create Your Digital Catalog
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <h4 className="text-lg font-semibold flex items-center space-x-2 font-heading font-weight-heading tracking-heading text-section-heading">
                    <div className="w-1 h-5 bg-primary rounded-full" aria-hidden="true"></div>
                    <span>Trusted Partners</span>
                  </h4>
                  <ul className="space-y-3">
                    {customPartnerBadges &&
                      customPartnerBadges.length > 0 &&
                      customPartnerBadges.map((partner, index) => (
                        <li key={index}>
                          <PartnerBadge partner={partner} />
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Legal Footer - Bottom Row */}
        <div className="border-t py-6 border-footer-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-card-description">
            <span>
              © {new Date().getFullYear()}{" "}
              {type === "default" ? "Quicktalog" : customCompanyName || "Your Company"}. All rights
              reserved.
            </span>
            <nav className="flex items-center space-x-6" role="navigation" aria-label="Legal links">
              {type === "default" ? (
                <>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-primary transition-colors duration-200"
                    aria-label="Privacy Policy">
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-and-conditions"
                    className="hover:text-primary transition-colors duration-200"
                    aria-label="Terms of Service">
                    Terms of Service
                  </Link>
                  <Link
                    href="/refund-policy"
                    className="hover:text-primary transition-colors duration-200"
                    aria-label="Refund Policy">
                    Refund Policy
                  </Link>
                </>
              ) : (
                <>
                  {legal?.privacy_policy && (
                    <Link
                      href={legal.privacy_policy}
                      className="hover:text-primary transition-colors duration-200"
                      aria-label="Privacy Policy">
                      Privacy Policy
                    </Link>
                  )}
                  {legal?.terms_and_conditions && (
                    <Link
                      href={legal.terms_and_conditions}
                      className="hover:text-primary transition-colors duration-200"
                      aria-label="Terms of Service">
                      Terms of Service
                    </Link>
                  )}
                </>
              )}
            </nav>

            {/* Enhanced Newsletter for Custom */}
            {type === "custom" && newsletter?.enabled && newsletter?.url && (
              <div>
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex items-center space-x-2"
                  role="form"
                  aria-label="Newsletter subscription">
                  <div className="relative">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      placeholder="your@email.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-48 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-card-bg text-card-text border border-card-border"
                      required
                      disabled={isSubmitting}
                      aria-describedby="newsletter-description"
                      aria-invalid={submitError ? "true" : "false"}
                    />
                    {submitSuccess && (
                      <div
                        className="absolute -top-8 left-0 text-xs text-green-500"
                        role="status"
                        aria-live="polite">
                        Successfully subscribed!
                      </div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="secondary"
                    size="default"
                    className="text-xs sm:text-sm lg:text-sm transition-all duration-200 hover:scale-105 flex items-center gap-2 bg-card-bg text-card-text border border-primary footer-cta-button"
                    disabled={isSubmitting}
                    aria-label="Subscribe to newsletter">
                    {isSubmitting ? (
                      <>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <span>Subscribe</span>
                    )}
                  </Button>
                  {submitError && (
                    <p
                      className="text-red-500 text-xs absolute -bottom-6 left-0"
                      role="alert"
                      aria-live="polite">
                      {submitError}
                    </p>
                  )}
                </form>
                <p id="newsletter-description" className="text-xs mt-2 text-card-description">
                  Stay updated with our latest news and offers.
                </p>
              </div>
            )}
            {type === "custom" && ctaFooter?.enabled && ctaFooter?.url && (
              <Button
                asChild
                variant="secondary"
                size="default"
                className="text-xs sm:text-sm lg:text-sm transition-all duration-200 hover:scale-105 flex items-center gap-2 bg-card-bg text-card-text border border-primary footer-cta-button">
                <Link href={ctaFooter.url} aria-label={ctaFooter.label}>
                  <FiExternalLink className="w-4 h-4" />
                  {ctaFooter.label}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default CatalogueFooter
