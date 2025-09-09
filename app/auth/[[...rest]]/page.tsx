"use client"
import ConsentModal from "@/components/common/ConsentModal"
import Navbar from "@/components/navigation/Navbar"
import { SignIn, SignUp, useAuth } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [showSignupForm, setShowSignupForm] = useState(false)

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/admin/dashboard")
    }
  }, [isSignedIn, router])

  useEffect(() => {
    // Check consent for signup flow only
    if (mode === "signup") {
      const consent = localStorage.getItem("consent")
      if (consent === "true") {
        setShowSignupForm(true)
      } else {
        setShowConsentModal(true)
      }
    } else {
      // For signin, show form directly
      setShowSignupForm(true)
    }
  }, [mode])

  const handleConsentConfirm = () => {
    setShowConsentModal(false)
    setShowSignupForm(true)
  }

  const handleConsentCancel = () => {
    setShowConsentModal(false)
    router.push("/")
  }

  return (
    <>
      <Navbar />
      <div className="product font-lora min-h-screen">
        <div className="flex justify-center items-center mt-[5vh] min-h-screen px-4">
          <div className="w-full max-w-md">
            {showSignupForm && (
              <>
                {mode === "signup" ? (
                  <SignUp afterSignOutUrl="/" signInUrl="/auth" />
                ) : (
                  <SignIn afterSignOutUrl="/auth?mode=signup" />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      <ConsentModal
        isOpen={showConsentModal}
        onConfirm={handleConsentConfirm}
        onCancel={handleConsentCancel}
      />
    </>
  )
}
