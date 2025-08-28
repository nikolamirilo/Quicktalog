"use client"
import { Button } from "@/components/ui/button"
import { Plus, Scan, Sparkles, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleOptionClick = (option) => {
    console.log(`Navigating to: ${option}`)
    // In real app, you would use your router here
    // For Next.js: router.push(option)
    setIsOpen(false)
  }

  const menuOptions = [
    {
      label: "Create Catalogue",
      href: "/admin/create",
      icon: Plus,
      variant: "primary",
    },
    {
      label: "Generate with AI",
      href: "/admin/create/ai",
      icon: Sparkles,
      variant: "secondary",
    },
    {
      label: "Scan & Import",
      href: "/admin/create/ocr",
      icon: Scan,
      variant: "secondary",
    },
  ]

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50">
      {/* Backdrop overlay when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Options */}
      <div
        className={`absolute bottom-16 right-0 flex flex-col-reverse gap-3 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}>
        {menuOptions.map((option, index) => (
          <Link
            key={option.href}
            href={option.href}
            className={`transform transition-all duration-300 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}>
            <Button
              onClick={() => handleOptionClick(option.href)}
              variant={option.variant === "primary" ? "default" : "outline"}
              className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg z-10 hover:shadow-xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap text-sm font-medium ${
                option.variant === "primary"
                  ? "bg-product-primary hover:product-primary/20 text-white"
                  : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
              }`}>
              <option.icon size={18} />
              <span className="hidden sm:inline">{option.label}</span>
            </Button>
          </Link>
        ))}
      </div>

      {/* Main Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-product-primary hover:product-primary/20 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center ${
          isOpen ? "rotate-45" : "rotate-0"
        }`}
        aria-label={isOpen ? "Close menu" : "Open create menu"}>
        {isOpen ? (
          <X size={30} className="transition-transform duration-200" />
        ) : (
          <Plus size={30} className="transition-transform duration-200" />
        )}
      </button>
    </div>
  )
}

export default FloatingActionMenu
