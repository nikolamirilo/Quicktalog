"use client"

import { Button } from "@/components/ui/button"
import { CookiePreferences } from "@/types"
import { useUser } from "@clerk/nextjs"
import { Cookie, ExternalLink, Settings } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import CookiePreferencesModal from "./CookiePreferencesModal"

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

const COOKIE_KEY = "cookiePreferences"

const defaultPreferences: CookiePreferences = {
  accepted: false,
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: "",
  version: "1.1",
}

function loadPreferences(): CookiePreferences {
  if (typeof window === "undefined") return defaultPreferences
  const raw = localStorage.getItem(COOKIE_KEY)
  return raw ? { ...defaultPreferences, ...JSON.parse(raw) } : defaultPreferences
}

function savePreferences(prefs: Partial<CookiePreferences>): CookiePreferences {
  if (typeof window === "undefined") return defaultPreferences
  const newPrefs: CookiePreferences = {
    ...defaultPreferences,
    ...loadPreferences(),
    ...prefs,
    timestamp: new Date().toISOString(),
  }
  localStorage.setItem(COOKIE_KEY, JSON.stringify(newPrefs))
  return newPrefs
}

function initializeAnalytics(enabled: boolean) {
  if (!enabled) return
  const existingScript = document.querySelector('script[src*="googletagmanager"]')
  if (existingScript) return
  const script = document.createElement("script")
  script.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  script.async = true
  document.head.appendChild(script)
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  window.gtag = gtag
  gtag("js", new Date())
  gtag("config", "GA_MEASUREMENT_ID", {
    anonymize_ip: true,
    allow_google_signals: false,
  })
}

const CookieBanner = () => {
  const { user, isSignedIn } = useUser()
  const [isVisible, setIsVisible] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false)
      return
    }

    if (isSignedIn && user) {
      // For logged-in users, check Clerk's publicMetadata.cookieConsent
      const hasClerkPreferences = !!user.publicMetadata
      if (hasClerkPreferences) {
        savePreferences(user.publicMetadata)
        setIsVisible(false)
      } else {
        // Show banner if no Clerk preferences
        setIsVisible(true)
      }
    } else {
      // For non-logged-in users, check localStorage
      const hasLocalPreferences = !!localStorage.getItem(COOKIE_KEY)
      setIsVisible(!hasLocalPreferences)
    }

    // Initialize analytics if preferences allow
    const prefs = loadPreferences()
    if (prefs.analytics) {
      initializeAnalytics(true)
    }

    setIsLoading(false)
  }, [isSignedIn, user])

  const updateUserConsent = async (prefs: CookiePreferences) => {
    if (!isSignedIn || !user) return
    try {
      const response = await fetch("/api/update-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cookieConsent: prefs }),
      })
      if (!response.ok) {
        throw new Error("Failed to update consent")
      }
    } catch (error) {
      console.error("Error updating user consent:", error)
    }
  }

  const handleAcceptAll = async () => {
    const prefs = savePreferences({
      accepted: true,
      analytics: true,
      marketing: true,
    })
    initializeAnalytics(true)
    await updateUserConsent(prefs)
    setIsVisible(false)
    if (window.gtag) {
      window.gtag("event", "consent_update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      })
    }
  }

  const handleAcceptEssential = async () => {
    const prefs = savePreferences({
      accepted: true,
      analytics: false,
      marketing: false,
    })
    await updateUserConsent(prefs)
    setIsVisible(false)
    if (window.gtag) {
      window.gtag("event", "consent_update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      })
    }
  }

  if (isLoading || !isVisible) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-product-background border-t border-product-border shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-product-primary/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-product-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-product-foreground mb-1">
                  We respect your privacy
                </h3>
                <p className="text-xs text-product-foreground-accent leading-relaxed">
                  We use cookies and similar technologies to improve your experience, analyze site
                  usage, and assist in marketing efforts. You can choose which types of cookies to
                  allow.{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-product-primary hover:underline inline-flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn more
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSettingsOpen(true)}
                className="text-xs px-3 py-2"
                aria-label="Open cookie settings">
                <Settings className="w-3 h-3 mr-1" />
                Customize
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAcceptEssential}
                className="text-xs px-3 py-2">
                Essential Only
              </Button>
              <Button
                variant="cta"
                size="sm"
                onClick={handleAcceptAll}
                className="text-xs px-4 py-2">
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CookiePreferencesModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={() => setIsVisible(false)}
      />
    </>
  )
}

export default CookieBanner
