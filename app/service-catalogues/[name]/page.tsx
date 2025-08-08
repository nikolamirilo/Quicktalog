//@ts-nocheck
import CatalogueFooter from "@/components/navigation/CatalogueFooter"
import CatalogueHeader from "@/components/navigation/CatalogueHeader"
import ServicesSection from "@/components/sections/ServicesSection"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

const page = async ({ params }: { params: Promise<{ name: string }> }) => {
  try {
    const { name } = await params

    if (!name) {
      throw new Error("Service catalogue name is required")
    }

    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.from("service_catalogues").select().eq("name", name)

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to fetch service catalogue: ${error.message}`)
    }

    if (!data || data.length === 0) {
      return (
        <div
          className={`theme-elegant bg-background text-foreground min-h-screen flex flex-col`}
          role="application"
          aria-label="Service Catalogue">
          <CatalogueHeader />
          <main
            className="flex-1 flex flex-col justify-center items-center px-4 py-16 sm:py-24"
            role="main"
            aria-label="Service catalogue content">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-lora font-semibold text-heading drop-shadow-sm mb-6">
                Service Catalogue Not Found
              </h1>
              <p className="text-text text-base sm:text-lg md:text-xl px-5 max-w-[900px] font-lora font-normal leading-relaxed">
                The service catalogue you're looking for doesn't exist or has been removed.
              </p>
            </div>
          </main>
          <CatalogueFooter />
        </div>
      )
    }

    const item = data[0]

    // Validate required fields
    if (!item.title || !item.services) {
      console.error("Invalid service catalogue data:", item)
      throw new Error("Service catalogue data is incomplete")
    }

    // Safely extract contact information
    const getContactValue = (type: string) => {
      if (!item.contact || !Array.isArray(item.contact)) return undefined
      const contact = item.contact.find((c: any) => c.type === type)
      return contact?.value
    }

    const socialLinks = {
      instagram: getContactValue("instagram"),
      facebook: getContactValue("facebook"),
      twitter: getContactValue("twitter"),
      website: getContactValue("website"),
    }

    return (
      <div
        className={`${item.theme} bg-background text-foreground min-h-screen flex flex-col`}
        role="application"
        aria-label={`${item.title} Service Catalogue`}>
        <CatalogueHeader type="custom" />
        <main
          className="flex-1 flex flex-col min-h-0"
          role="main"
          aria-label="Service catalogue content">
          {/* Hero Section */}
          <section
            className="flex flex-col justify-start items-center text-center px-4 pt-8 sm:pt-12 md:pt-16 flex-shrink-0"
            aria-labelledby="catalogue-title">
            <div className="max-w-4xl mx-auto">
              <h1
                id="catalogue-title"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-lora font-semibold text-heading drop-shadow-sm mb-4">
                {item.title}
              </h1>
              {item.subtitle && (
                <p
                  className="text-text text-base sm:text-lg md:text-xl lg:text-2xl px-5 max-w-[900px] font-lora font-normal leading-relaxed"
                  aria-describedby="catalogue-title">
                  {item.subtitle}
                </p>
              )}
            </div>
          </section>

          {/* Services Section */}
          {item && (
            <section
              className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-8 min-h-[60vh]"
              aria-label="Services and items">
              <ServicesSection servicesData={item.services} currency={item.currency} type="item" />
            </section>
          )}
        </main>
        <CatalogueFooter
          type="custom"
          customLegalName={item.legal?.name}
          customEmail={getContactValue("email")}
          customPhone={getContactValue("phone")}
          customSocialLinks={socialLinks}
        />
      </div>
    )
  } catch (error) {
    console.error("Service catalogue page error:", error)

    return (
      <div
        className={`theme-elegant bg-background text-foreground min-h-screen flex flex-col`}
        role="application"
        aria-label="Service Catalogue Error">
        <CatalogueHeader />
        <main
          className="flex-1 flex flex-col justify-center items-center px-4 py-16 sm:py-24"
          role="main"
          aria-label="Error content">
          <div
            className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl"
            role="alert"
            aria-live="polite">
            <h1 className="text-2xl font-bold text-red-800 mb-4">
              Error Loading Service Catalogue
            </h1>
            <p className="text-red-700 mb-4">
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred while loading the service catalogue."}
            </p>
            <div className="text-sm text-red-600">
              <p>Please check:</p>
              <ul className="list-disc list-inside mt-2">
                <li>The URL is correct</li>
                <li>Your internet connection</li>
                <li>Try refreshing the page</li>
              </ul>
            </div>
          </div>
        </main>
        <CatalogueFooter type="default" />
      </div>
    )
  }
}

export default page
