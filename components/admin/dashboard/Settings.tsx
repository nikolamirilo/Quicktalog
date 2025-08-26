// components/Settings.tsx
"use client"

import CookiePreferencesModal from "@/components/common/CookiePreferencesModal"
import { Button } from "@/components/ui/button"
import { SignOutButton, UserProfile } from "@clerk/nextjs"
import { useState } from "react"
import { FiSettings } from "react-icons/fi"
import { LuCookie } from "react-icons/lu"
import { MdLogout } from "react-icons/md"

const Settings = () => {
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false)

  return (
    <div className="w-full relative">
      <CookiePreferencesModal
        isOpen={isCookieSettingsOpen}
        onClose={() => setIsCookieSettingsOpen(false)}
      />
      <h2
        className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 text-product-foreground flex items-center gap-2 sm:gap-3"
        style={{ fontFamily: "var(--font-playfair-display), var(--font-inter), serif" }}>
        <FiSettings className="text-product-primary w-6 h-6 sm:w-8 sm:h-8" /> Settings
      </h2>
      <div className="flex flex-row gap-5 my-8">
        <Button
          onClick={() => setIsCookieSettingsOpen(true)}
          aria-label="Manage cookie preferences">
          <LuCookie className="w-4 h-4" />
          Manage Cookie Preferences
        </Button>
        <SignOutButton redirectUrl="/" component="div">
          <Button variant="destructive">
            <MdLogout /> Sign Out
          </Button>
        </SignOutButton>
      </div>
      <UserProfile />
    </div>
  )
}

export default Settings
