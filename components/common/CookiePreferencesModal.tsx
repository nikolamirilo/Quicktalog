// components/CookiePreferencesModal.tsx
"use client"

import { Button } from "@/components/ui/button"
import { CookiePreferences } from "@/types"
import { useUser } from "@clerk/nextjs"
import { Shield, X } from "lucide-react"
import { useState } from "react"
import FocusLock from "react-focus-lock"

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

interface CookiePreferencesModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: () => void
}

const CookiePreferencesModal = ({ isOpen, onClose, onSave }: CookiePreferencesModalProps) => {
  const { user, isSignedIn } = useUser()
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [marketingEnabled, setMarketingEnabled] = useState(false)

  useState(() => {
    const prefs = loadPreferences()
    setAnalyticsEnabled(prefs.analytics)
    setMarketingEnabled(prefs.marketing)
  })

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

  const handleSaveSettings = async () => {
    const prefs = savePreferences({
      accepted: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    })

    if (analyticsEnabled) {
      initializeAnalytics(true)
    }

    await updateUserConsent(prefs)
    onClose()
    onSave?.()

    if (window.gtag) {
      window.gtag("event", "consent_update", {
        analytics_storage: analyticsEnabled ? "granted" : "denied",
        ad_storage: marketingEnabled ? "granted" : "denied",
      })
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 rounded-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title">
      <FocusLock>
        <div className="bg-product-background rounded-lg shadow-lg max-w-lg w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="relative p-6 text-center bg-hero-product-background">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-product-foreground-accent hover:text-product-foreground transition-colors"
              aria-label="Close cookie settings">
              <X className="w-5 h-5" />
            </button>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-product-primary">
                <Shield className="w-8 h-8 text-product-secondary" />
              </div>
            </div>
            <h2
              id="cookie-settings-title"
              className="text-xl font-semibold mb-2 text-product-foreground">
              Cookie Settings
            </h2>
            <p className="text-sm text-product-foreground-accent">Choose how we use your data</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Your Rights:</strong> Withdraw consent anytime. If signed in, preferences
                sync with your account.
                <a href="/privacy" className="text-blue-600 hover:underline ml-1">
                  Privacy Policy
                </a>
              </p>
            </div>
            <div className="flex items-start justify-between p-4 rounded-lg bg-product-hover-background">
              <div className="flex-1 pr-3">
                <h3 className="text-sm font-medium text-product-foreground mb-1">
                  Essential Cookies
                </h3>
                <p className="text-xs text-product-foreground-accent leading-relaxed">
                  Needed for site security, login, and core features. Cannot be disabled.
                </p>
                <div className="mt-2 text-xs text-product-foreground-accent">
                  <strong>Examples:</strong> Sessions, tokens, accessibility, user details.
                </div>
              </div>
              <div className="flex-shrink-0">
                <input
                  type="checkbox"
                  checked
                  disabled
                  aria-label="Essential cookies always enabled"
                  className="w-4 h-4 text-product-primary bg-product-background border-product-border rounded focus:ring-product-primary"
                />
              </div>
            </div>
            <div className="flex items-start justify-between p-4 rounded-lg border border-product-border">
              <div className="flex-1 pr-3">
                <h3 className="text-sm font-medium text-product-foreground mb-1">Analytics</h3>
                <p className="text-xs text-product-foreground-accent leading-relaxed">
                  Anonymous data to improve site performance and fix issues.
                </p>
                <div className="mt-2 text-xs text-product-foreground-accent">
                  <strong>Examples:</strong> Google Analytics, page views, clicks, errors
                </div>
              </div>
              <div className="flex-shrink-0">
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  aria-label="Enable analytics cookies"
                  className="w-4 h-4 text-product-primary bg-product-background border-product-border rounded focus:ring-product-primary cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-start justify-between p-4 rounded-lg border border-product-border">
              <div className="flex-1 pr-3">
                <h3 className="text-sm font-medium text-product-foreground mb-1">Marketing</h3>
                <p className="text-xs text-product-foreground-accent leading-relaxed">
                  Personalized ads and content. May share data with partners.
                </p>
                <div className="mt-2 text-xs text-product-foreground-accent">
                  <strong>Examples:</strong> Ad pixels, retargeting, A/B tests, recommendations
                </div>
              </div>
              <div className="flex-shrink-0">
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                  aria-label="Enable marketing cookies"
                  className="w-4 h-4 text-product-primary bg-product-background border-product-border rounded focus:ring-product-primary cursor-pointer"
                />
              </div>
            </div>
            <div className="mt-6 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <p className="text-xs text-gray-600">
                <strong>Retention:</strong> Analytics kept 26 months, marketing 13 months. You may
                request deletion anytime.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 pt-0">
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button variant="cta" onClick={handleSaveSettings} className="flex-1">
                Save
              </Button>
            </div>
          </div>
        </div>
      </FocusLock>
    </div>
  )
}

export default CookiePreferencesModal
