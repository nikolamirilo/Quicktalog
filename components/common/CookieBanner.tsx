"use client"
import { Button } from "@/components/ui/button"
import { Cookie, Settings, Shield, X } from "lucide-react"
import { useEffect, useState } from "react"

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted")
    if (!hasAcceptedCookies) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem("cookiesAccepted", "true")
    localStorage.setItem("analyticsCookies", "true")
    localStorage.setItem("marketingCookies", "true")
    setIsVisible(false)
  }

  const handleAcceptEssential = () => {
    localStorage.setItem("cookiesAccepted", "true")
    localStorage.setItem("analyticsCookies", "false")
    localStorage.setItem("marketingCookies", "false")
    setIsVisible(false)
  }

  const handleSaveSettings = () => {
    const analytics = document.getElementById("analytics-cookies") as HTMLInputElement
    const marketing = document.getElementById("marketing-cookies") as HTMLInputElement
    
    localStorage.setItem("cookiesAccepted", "true")
    localStorage.setItem("analyticsCookies", analytics?.checked?.toString() || "false")
    localStorage.setItem("marketingCookies", marketing?.checked?.toString() || "false")
    
    setIsSettingsOpen(false)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Main Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-product-background border-t border-product-border shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Cookie Icon and Text */}
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-product-primary/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-product-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-product-foreground mb-1">
                  We use cookies to enhance your experience
                </h3>
                <p className="text-xs text-product-foreground-accent leading-relaxed">
                  We use cookies to analyze site traffic, personalize content, and provide social media features. 
                  By continuing to use our site, you consent to our use of cookies.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSettingsOpen(true)}
                className="text-xs px-3 py-2"
              >
                <Settings className="w-3 h-3 mr-1" />
                Settings
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAcceptEssential}
                className="text-xs px-3 py-2"
              >
                Essential Only
              </Button>
              <Button
                variant="cta"
                size="sm"
                onClick={handleAcceptAll}
                className="text-xs px-4 py-2"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-product-background rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
            {/* Header */}
            <div className="relative p-6 text-center bg-hero-product-background">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="absolute top-4 right-4 text-product-foreground-accent hover:text-product-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-product-primary">
                  <Shield className="w-8 h-8 text-product-secondary" />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-2 text-product-foreground">Cookie Settings</h2>
              <p className="text-sm text-product-foreground-accent">
                Choose which cookies you want to allow
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Essential Cookies */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-product-hover-background">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-product-foreground">Essential Cookies</h3>
                  <p className="text-xs text-product-foreground-accent mt-1">
                    Required for the website to function properly
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="w-4 h-4 text-product-primary bg-product-background border-product-border rounded focus:ring-product-primary"
                  />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-product-border">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-product-foreground">Analytics Cookies</h3>
                  <p className="text-xs text-product-foreground-accent mt-1">
                    Help us understand how visitors interact with our website
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <input
                    id="analytics-cookies"
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-product-primary bg-product-background border-product-border rounded focus:ring-product-primary"
                  />
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-product-border">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-product-foreground">Marketing Cookies</h3>
                  <p className="text-xs text-product-foreground-accent mt-1">
                    Used to deliver personalized advertisements
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <input
                    id="marketing-cookies"
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-product-primary bg-product-background border-product-border rounded focus:ring-product-primary"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 pt-0">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsSettingsOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="cta"
                  onClick={handleSaveSettings}
                  className="flex-1"
                >
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CookieBanner 