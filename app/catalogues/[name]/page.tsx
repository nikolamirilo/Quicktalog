//@ts-nocheck
import LimitsModal from "@/components/modals/LimitsModal"
import CatalogueFooter from "@/components/navigation/CatalogueFooter"
import CatalogueHeader from "@/components/navigation/CatalogueHeader"
import ServicesSection from "@/components/sections/ServicesSection"
import { KEYWORDS } from "@/constants"
import { buildFooterData, buildHeaderData } from "@/helpers/client"
import { ServiceCatalogue } from "@/types"
import { createClient } from "@/utils/supabase/client"
import { Metadata } from "next"

export async function generateStaticParams() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("catalogues").select("name")

    if (error) {
      console.error("Error fetching catalogues:", error)
      return []
    }

    return (
      data?.map((catalogue: { name: string }) => ({
        name: catalogue.name,
      })) || []
    )
  } catch (error) {
    console.error("generateStaticParams error:", error)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  try {
    const { name } = await params
    const supabase = await createClient()
    const { data } = await supabase.from("catalogues").select("title, subtitle").eq("name", name).single()

    if (!data) {
      return {
        title: "Service Catalogue Not Found | Quicktalog",
        description: "The service catalogue you're looking for doesn't exist or has been removed.",
      }
    }

    const title = `${data.title} - Digital Service Catalogue | Quicktalog`
    const description = data.subtitle || `Explore ${data.title}'s services and offerings in this interactive digital catalogue.`

    return {
      title,
      description,
      generator: "Quicktalog",
      applicationName: "Quicktalog",
      keywords: [...KEYWORDS, data.title],
      authors: [{ name: "Quicktalog" }],
      creator: "Quicktalog",
      publisher: "Quicktalog",
      metadataBase: new URL("https://quicktalog.app"),
      alternates: {
        canonical: `https://quicktalog.app/catalogues/${name}`,
      },
      openGraph: {
        title,
        description,
        url: `https://quicktalog.app/catalogues/${name}`,
        type: "website",
        images: ["/opengraph-image.png"],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/twitter-image.png"],
        creator: "Quicktalog",
        site: `https://quicktalog.app/catalogues/${name}`,
      },
    }
  } catch (error) {
    return {
      title: "Service Catalogue | Quicktalog",
      description: "Explore this digital service catalogue created with Quicktalog.",
    }
  }
}
const page = async ({ params }: { params: Promise<{ name: string }> }) => {
  try {
    const { name } = await params

    if (!name) {
      throw new Error("Service catalogue name is required")
    }

    const supabase = await createClient()
    const { data, error } = await supabase.from("catalogues").select().eq("name", name).single() // Use single() since we expect only one result

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to fetch service catalogue: ${error.message}`)
    }

    if (!data) {
      return <NotFoundPage />
    }

    const item = data as ServiceCatalogue

    // Validate required fields
    if (!item.title || !item.services) {
      console.error("Invalid service catalogue data:", item)
      throw new Error("Service catalogue data is incomplete")
    }

    // Check if user is on free plan
    const isFreePlan = item?.logo == "" || item?.logo == null

    // Only build header/footer data if not on free plan
    const headerData = isFreePlan ? undefined : buildHeaderData(item)
    const footerData = isFreePlan ? undefined : buildFooterData(item)
    if (item.status === "active") {
      // Generate LD schema for this catalogue
      const catalogueSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${item.title} - Digital Service Catalogue`,
        "description": item.subtitle || `Explore ${item.title}'s services and offerings in this interactive digital catalogue.`,
        "url": `https://quicktalog.app/catalogues/${name}`,
        "mainEntity": {
          "@type": "Service",
          "name": item.title,
          "description": item.subtitle,
          "provider": {
            "@type": "Organization",
            "name": item.title
          },
          "serviceType": "Digital Service Catalogue",
          "offers": {
            "@type": "Offer",
            "description": "Interactive digital catalogue services"
          }
        }
      }

      return (
        <div
          className={`${item.theme || "theme-elegant"} bg-background text-foreground min-h-screen flex flex-col`}
          role="application"
          aria-label={`${item.title} Service Catalogue`}>
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogueSchema) }} 
          />
          {isFreePlan ? (
            <CatalogueHeader type="default" />
          ) : (
            <CatalogueHeader type="custom" customData={headerData} />
          )}

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
            <section
              className="flex-1 w-full max-w-7xl mx-auto lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-8 min-h-[60vh]"
              aria-label="Services and items">
              <ServicesSection servicesData={item.services} currency={item.currency} type="item" />
            </section>
          </main>

          {isFreePlan ? (
            <CatalogueFooter type="default" />
          ) : (
            <CatalogueFooter type="custom" customData={footerData} />
          )}
        </div>
      )
    } else {
      return <LimitsModal type="catalogue" />
    }
  } catch (error) {
    console.error("Service catalogue page error:", error)
    return <ErrorPage error={error} />
  }
}

export default page

const ErrorPage = ({ error }: { error: unknown }) => (
  <div
    className="theme-elegant bg-background text-foreground min-h-screen flex flex-col"
    role="application"
    aria-label="Service Catalogue Error">
    <CatalogueHeader type="default" />
    <main
      className="flex-1 flex flex-col justify-center items-center px-4 py-16 sm:py-24"
      role="main"
      aria-label="Error content">
      <div
        className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl"
        role="alert"
        aria-live="polite">
        <h1 className="text-2xl font-bold text-red-800 mb-4">Error Loading Service Catalogue</h1>
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

// Not found component
const NotFoundPage = () => (
  <div
    className="theme-elegant bg-background text-foreground min-h-screen flex flex-col"
    role="application"
    aria-label="Service Catalogue">
    <CatalogueHeader type="default" />
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
    <CatalogueFooter type="default" />
  </div>
)
