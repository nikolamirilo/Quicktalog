"use client"
import Navbar from "@/components/navigation/Navbar"
import { SignIn, SignUp, useAuth } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")
  const router = useRouter()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/admin/dashboard")
    }
  }, [isSignedIn, router])

  return (
    <>
      <Navbar />
      <div className="product font-lora min-h-screen">
        <div className="flex justify-center items-center mt-[5vh] min-h-screen px-4">
          <div className="w-full max-w-md">
            {mode === "signup" ? (
              <SignUp afterSignOutUrl="/" signInUrl="/auth" />
            ) : (
              <SignIn afterSignOutUrl="/auth?mode=signup" />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
