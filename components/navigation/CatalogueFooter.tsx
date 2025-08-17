"use client"
import { newsletterSignup } from "@/actions/newsletter"
import { Button } from "@/components/ui/button"
import { Legal } from "@/types"
import { getPlatformIconByName } from "@/utils/client"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import {
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPlus,
  FiShield,
  FiUsers,
  FiZap,
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

interface CatalogueFooterProps {
  type?: "default" | "custom"
  customData?: {
    logo?: string
    name?: string
    address?: string
    city?: string
    email?: string
    partners?: Array<{
      name: string
      logo: string
      description: string
      rating: number
      url?: string
    }>
    phone?: string
    socialLinks?: Record<string, string>
    ctaFooter?: {
      enabled: boolean
      label: string
      url: string
    }
    newsletter?: {
      enabled: boolean
      url: string
    }
    legal?: Legal,
    catalogue?: {
      id?: string
      owner_id?: string;
    }
  }
}

const CatalogueFooter: React.FC<CatalogueFooterProps> = ({ type = "default", customData = {} }) => {
  const {
    logo: customLogo,
    name: customCompanyName = "Your Company",
    email: customEmail = "hello@example.com",
    phone: customPhone = "+1 (555) 123-4567",
    socialLinks: customSocialLinks = {
      facebook: "https://facebook.com/yourcompany",
      twitter: "https://twitter.com/yourcompany",
      linkedin: "https://linkedin.com/company/yourcompany",
      instagram: "https://instagram.com/yourcompany",
    },
    partners: customPartnerBadges = [
      {
        name: "Partner 1",
        logo: "/partners/partner1.svg",
        description: "Business Partner",
        rating: 4.8,
      },
      {
        name: "Partner 2",
        logo: "/partners/partner2.svg",
        description: "Business Partner",
        rating: 4.9,
      },
      {
        name: "Partner 3",
        logo: "/partners/partner3.svg",
        description: "Business Partner",
        rating: 4.7,
      },
    ],
    ctaFooter = { enabled: false, label: "Learn More", url: "#" },
    newsletter = { enabled: false, url: "" },
    catalogue = { id: null, owner_id: null },
    legal = {
      name: "Quicktalog",
      address: "123 Business St, City, State 12345",
      terms_and_conditions: "https://termify.io/terms-and-conditions-generator",
      privacy_policy: "https://termify.io/terms-and-conditions-generator",
    },
  } = customData

  const { isDarkTheme } = useThemeDetection()
  const [logoPath, setLogoPath] = useState("/logo.svg")
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const socialLinks = {
    facebook: "https://facebook.com/quicktalog",
    twitter: "https://twitter.com/quicktalog",
    linkedin: "https://linkedin.com/company/quicktalog",
    instagram: "https://instagram.com/quicktalog",
  }

  const partnerBadges = [
    {
      name: "Glovo",
      logo: "/partners/glovo.svg",
      description: "Delivery Partner",
      rating: 4.8,
      url: "https://glovo.com",
    },
    {
      name: "Wolt",
      logo: "/partners/wolt.svg",
      description: "Delivery Partner",
      rating: 4.9,
      url: "https://wolt.com",
    },
    {
      name: "Uber Eats",
      logo: "/partners/uber-eats.svg",
      description: "Delivery Partner",
      rating: 4.7,
      url: "https://ubereats.com",
    },
  ]

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
      await newsletterSignup(newsletterEmail, catalogue.id, catalogue.owner_id)

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
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-3 group ${className}`}
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--card-description)",
        border: "1px solid var(--card-border)",
      }}
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
        className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
        style={{
          backgroundColor: "var(--card-bg)",
          color: "var(--card-description)",
          border: "1px solid var(--card-border)",
        }}
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
              src={`https://logo.clearbit.com/${partner.url}`}
              alt={`${partner.name} logo`}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="flex-1">
          <div
            className="font-semibold text-sm"
            style={{
              fontFamily: "var(--font-family-heading, inherit)",
              fontWeight: "var(--font-weight-heading, 600)",
              letterSpacing: "var(--letter-spacing-heading, -0.02em)",
              color: "var(--card-heading)",
            }}>
            {partner.name}
          </div>
          <div className="text-xs text-card-description">{partner.description}</div>
        </div>
        {/* <div className="flex items-center space-x-1">
          <FiStar className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
          <span
            className="text-xs font-medium"
            style={{ color: "var(--card-description)" }}
            aria-label={`Rating: ${partner.rating} out of 5`}>
            {partner.rating}
          </span>
        </div> */}
      </div>
    )
  }

  return (
    <footer
      className="border-t mt-auto"
      role="contentinfo"
      aria-label={`${type === "default" ? "Quicktalog" : customCompanyName} footer`}
      style={{
        fontFamily: "var(--font-family-body, inherit)",
        fontWeight: "var(--font-weight-body, 400)",
        letterSpacing: "var(--letter-spacing-body, 0)",
        backgroundColor: "var(--footer-bg, var(--section-bg))",
        color: "var(--section-heading)",
        borderTop: "1px solid var(--section-border)",
      }}>
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
                  aria-label={`Go to ${type === "default" ? "Quicktalog" : customCompanyName} homepage`}>
                  <Image
                    src={logoPath}
                    alt={`${type === "default" ? "Quicktalog" : customCompanyName} logo`}
                    width={120}
                    height={40}
                    className="w-24 h-auto"
                  />
                  {type === "default" && (
                    <p className="text-sm" style={{ color: "var(--card-description)" }}>
                      Digital Catalogue Platform
                    </p>
                  )}
                  {type === "custom" && (
                    <div>
                      <h3
                        className="text-xl font-semibold group-hover:text-primary transition-colors duration-200"
                        style={{
                          fontFamily: "var(--font-family-heading, inherit)",
                          fontWeight: "var(--font-weight-heading, 600)",
                          letterSpacing: "var(--letter-spacing-heading, -0.02em)",
                          color: "var(--section-heading)",
                        }}>
                        {customCompanyName}
                      </h3>
                      <p className="text-sm" style={{ color: "var(--card-description)" }}>
                        Professional Services
                      </p>
                    </div>
                  )}
                </Link>
                <p className="text-sm leading-relaxed" style={{ color: "var(--card-description)" }}>
                  {type === "default"
                    ? "Create beautiful, shareable digital catalogs in minutes. No tech skills required."
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
                    {Object.keys(customSocialLinks).map(
                      (platform) =>
                        customSocialLinks[platform] && (
                          <SocialIcon
                            key={platform}
                            platform={platform}
                            href={customSocialLinks[platform as keyof typeof customSocialLinks]}
                          />
                        )
                    )}
                  </nav>
                )}
            </div>

            {/* Column 2: Contact & Support */}
            <div className="space-y-6">
              <h4
                className="text-lg font-semibold flex items-center space-x-2"
                style={{
                  fontFamily: "var(--font-family-heading, inherit)",
                  fontWeight: "var(--font-weight-heading, 600)",
                  letterSpacing: "var(--letter-spacing-heading, -0.02em)",
                  color: "var(--section-heading)",
                }}>
                <div className="w-1 h-5 bg-primary rounded-full" aria-hidden="true"></div>
                <span>Contact & Support</span>
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${type === "default" ? "hello@quicktalog.com" : customEmail}`}
                    className="flex items-center space-x-3 text-sm hover:text-primary transition-colors duration-200 group"
                    aria-label={`Send email to ${type === "default" ? "hello@quicktalog.com" : customEmail}`}
                    style={{ color: "var(--card-description)" }}>
                    <FiMail
                      className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                      aria-hidden="true"
                    />
                    <span>{type === "default" ? "hello@quicktalog.com" : customEmail}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${type === "default" ? "+1234567890" : customPhone}`}
                    className="flex items-center space-x-3 text-sm hover:text-primary transition-colors duration-200 group"
                    aria-label={`Call ${type === "default" ? "+1 (234) 567-890" : customPhone}`}
                    style={{ color: "var(--card-description)" }}>
                    <FiPhone
                      className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                      aria-hidden="true"
                    />
                    <span>{type === "default" ? "+1 (234) 567-890" : customPhone}</span>
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <FiMapPin
                    className="w-4 h-4 mt-1 flex-shrink-0"
                    style={{ color: "var(--card-description)" }}
                  />
                  <span className="text-sm" style={{ color: "var(--card-description)" }}>
                    {type === "default" ? "Belgrade, Serbia" : `${legal.address}`}
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 3: Platform Features (Default) / Company Info (Custom) */}
            <div className="space-y-6">
              {type === "default" ? (
                <>
                  <h4
                    className="text-lg font-semibold flex items-center space-x-2"
                    style={{
                      fontFamily: "var(--font-family-heading, inherit)",
                      fontWeight: "var(--font-weight-heading, 600)",
                      letterSpacing: "var(--letter-spacing-heading, -0.02em)",
                      color: "var(--section-heading)",
                    }}>
                    <div className="w-1 h-5 bg-primary rounded-full" aria-hidden="true"></div>
                    <span>Platform Features</span>
                  </h4>
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 group"
                        style={{ color: "var(--card-description)" }}>
                        <div className="mt-1 group-hover:scale-110 transition-transform duration-200 text-primary">
                          {feature.icon}
                        </div>
                        <div>
                          <div
                            className="font-semibold text-sm"
                            style={{
                              fontFamily: "var(--font-family-heading, inherit)",
                              fontWeight: "var(--font-weight-heading, 600)",
                              letterSpacing: "var(--letter-spacing-heading, -0.02em)",
                              color: "var(--card-heading)",
                            }}>
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
                  <h4
                    className="text-lg font-semibold flex items-center space-x-2"
                    style={{
                      fontFamily: "var(--font-family-heading, inherit)",
                      fontWeight: "var(--font-weight-heading, 600)",
                      letterSpacing: "var(--letter-spacing-heading, -0.02em)",
                      color: "var(--section-heading)",
                    }}>
                    <div className="w-1 h-5 bg-primary rounded-full" aria-hidden="true"></div>
                    <span>Company Information</span>
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3">
                      <MdTitle
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: "var(--card-description)" }}
                      />
                      <span className="text-sm" style={{ color: "var(--card-description)" }}>
                        {customData.legal.name}
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <FiMapPin
                        className="w-4 h-4 mt-1 flex-shrink-0"
                        style={{ color: "var(--card-description)" }}
                      />
                      <div className="text-sm" style={{ color: "var(--card-description)" }}>
                        <div>{legal.address}</div>
                      </div>
                    </li>
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
                        href={socialLinks[platform as keyof typeof socialLinks]}
                      />
                    ))}
                  </div>

                  {/* CTA Button (Default only) */}
                  <Button
                    asChild
                    variant="secondary"
                    size="default"
                    className="text-xs sm:text-sm lg:text-sm transition-all duration-200 hover:scale-105 flex items-center gap-2"
                    style={{
                      fontFamily: "var(--font-family-heading, inherit)",
                      fontWeight: "var(--font-weight-heading, 600)",
                      letterSpacing: "var(--letter-spacing-heading, -0.02em)",
                      backgroundColor: "var(--card-bg)",
                      color: "var(--card-text)",
                      border: "1px solid var(--primary)",
                    }}>
                    <Link href="/auth?mode=signup" aria-label="Create your own digital catalog">
                      <FiPlus className="w-4 h-4" />
                      Create Your Digital Catalog
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <h4
                    className="text-lg font-semibold flex items-center space-x-2"
                    style={{
                      fontFamily: "var(--font-family-heading, inherit)",
                      fontWeight: "var(--font-weight-heading, 600)",
                      letterSpacing: "var(--letter-spacing-heading, -0.02em)",
                      color: "var(--section-heading)",
                    }}>
                    <div className="w-1 h-5 bg-primary rounded-full" aria-hidden="true"></div>
                    <span>Trusted Partners</span>
                  </h4>
                  <ul className="space-y-3">
                    {customPartnerBadges &&
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
        <div className="border-t py-6" style={{ borderTop: "1px solid var(--section-border)" }}>
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
            style={{ color: "var(--card-description)" }}>
            <span>
              © {new Date().getFullYear()} {type === "default" ? "Quicktalog" : customData.name}.
              All rights reserved.
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
            {type === "custom" && newsletter?.enabled && (
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
                      className="w-48 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      style={{
                        backgroundColor: "var(--card-bg)",
                        color: "var(--card-text)",
                        border: "1px solid var(--card-border)",
                      }}
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
                    className="text-xs sm:text-sm lg:text-sm transition-all duration-200 hover:scale-105 flex items-center gap-2"
                    style={{
                      fontFamily: "var(--font-family-heading, inherit)",
                      fontWeight: "var(--font-weight-heading, 600)",
                      letterSpacing: "var(--letter-spacing-heading, -0.02em)",
                      backgroundColor: "var(--card-bg)",
                      color: "var(--card-text)",
                      border: "1px solid var(--primary)",
                    }}
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
                <p
                  id="newsletter-description"
                  className="text-xs mt-2"
                  style={{ color: "var(--card-description)" }}>
                  Stay updated with our latest news and offers.
                </p>
              </div>
            )}
            {type === "custom" && ctaFooter?.enabled && (
              <Button
                asChild
                variant="secondary"
                size="default"
                className="text-xs sm:text-sm lg:text-sm transition-all duration-200 hover:scale-105 flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-family-heading, inherit)",
                  fontWeight: "var(--font-weight-heading, 600)",
                  letterSpacing: "var(--letter-spacing-heading, -0.02em)",
                  backgroundColor: "var(--card-bg)",
                  color: "var(--card-text)",
                  border: "1px solid var(--primary)",
                }}>
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
