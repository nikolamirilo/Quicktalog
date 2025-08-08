import React from "react"
import Navbar from "@/components/navigation/Navbar"
import ServicesFormSwitcher from "@/components/admin/form/ServicesFormSwitcher"

export default function CreateServicesPage() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen px-2 md:px-8 pt-24 pb-12 bg-gradient-to-br from-product-background to-hero-product-background animate-fade-in">
        <div className="container mx-auto flex flex-col px-4 gap-8">
          <ServicesFormSwitcher type="create" />
        </div>
      </div>
    </>
  )
}
