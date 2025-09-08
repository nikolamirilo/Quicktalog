"use client"
import Navbar from "@/components/navigation/Navbar"
import { SignIn, SignUp, useAuth } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mode !== "signup") return

    const root = containerRef.current
    if (!root) return

    const lockCheckbox = () => {
      const checkbox = root.querySelector<HTMLInputElement>("#legalAccepted-field")
      if (!checkbox) return

      // Ensure checked and sync Clerk’s internal state
      if (!checkbox.checked) {
        checkbox.checked = true
        checkbox.dispatchEvent(new Event("input", { bubbles: true }))
        checkbox.dispatchEvent(new Event("change", { bubbles: true }))
      }

      // “Disable” interaction without breaking form submission
      const clickBlocker = (e: Event) => e.preventDefault()
      const keyBlocker = (e: Event) => e.preventDefault()

      checkbox.tabIndex = -1
      checkbox.setAttribute("aria-disabled", "true")
      checkbox.style.pointerEvents = "none"
      checkbox.style.opacity = "0.6"
      checkbox.addEventListener("click", clickBlocker)
      checkbox.addEventListener("keydown", keyBlocker)

      // cleanup on unmount/re-render
      return () => {
        checkbox.removeEventListener("click", clickBlocker)
        checkbox.removeEventListener("keydown", keyBlocker)
      }
    }

    // run immediately in case it’s already in the DOM
    let cleanup = lockCheckbox()

    // watch for Clerk re-renders
    const observer = new MutationObserver(() => {
      cleanup?.()
      cleanup = lockCheckbox()
    })
    observer.observe(root, { childList: true, subtree: true })

    lockCheckbox()
  }, [mode])

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/admin/dashboard")
    }
  }, [isSignedIn, router])

  return (
    <>
      <Navbar />
      <div className="product font-lora min-h-screen h-fit">
        <div className="flex justify-center items-center mt-[10vh] min-h-screen px-4">
          <div className="w-full max-w-md" ref={containerRef}>
            {mode === "signup" ? <SignUp afterSignOutUrl="/" /> : <SignIn afterSignOutUrl="/" />}
          </div>
        </div>
      </div>
    </>
  )
}
