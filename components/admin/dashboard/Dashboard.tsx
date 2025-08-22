"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  FiBarChart2,
  FiCalendar,
  FiSettings
} from "react-icons/fi"
import { TbFileAnalytics } from "react-icons/tb"
import Overview from "./Overview"
import Settings from "./Settings"
import Subscription from "./Subscription"
import Usage from "./Usage"

const TABS = [
  { value: "overview", label: "Overview", icon: <TbFileAnalytics className="mr-2" size={20} /> },
  { value: "subscription", label: "Subscription", icon: <FiCalendar className="mr-2" size={20} /> },
  { value: "usage", label: "Usage", icon: <FiBarChart2 className="mr-2" size={20} /> },
  { value: "settings", label: "Settings", icon: <FiSettings className="mr-2" size={20} /> },
]

export default function Dashboard({
  user,
  catalogues,
  analytics,
  pricingPlan,
  promptsUsage,
  ocrUsage
}) {
  const [activeTab, setActiveTab] = useState("overview")

  // Aggregate analytics
  const totalPageViews = analytics?.reduce((sum, a) => sum + (a.pageview_count || 0), 0)
  const totalUniqueVisitors = analytics?.reduce((sum, a) => sum + (a.unique_visitors || 0), 0)
  const totalServiceCatalogues = catalogues?.length || 0

  const usage = {
    traffic: totalPageViews,
    catalogues: totalServiceCatalogues,
    prompts: promptsUsage,
    ocr: ocrUsage,
  }
  const overallAnalytics = {
    totalPageViews,
    totalUniqueVisitors,
    totalServiceCatalogues
  }

  // Sidebar content for md+ screens
  function getSidebarButtonClass(isActive: boolean) {
    return isActive
      ? "font-bold !bg-product-hover-background !text-navbar-button-active !border !border-product-primary shadow-sm hover:scale-[1.03] hover:transform"
      : "font-medium"
  }

  const SidebarContent = (
    <nav className="p-4 flex md:flex-col flex-row gap-2 md:gap-3">
      {TABS.map((tab) => (
        <Button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          variant="nav"
          className={`${getSidebarButtonClass(activeTab === tab.value)} flex items-center justify-start`}
          aria-current={activeTab === tab.value ? "page" : undefined}>
          <span className="flex items-center justify-center">{tab.icon}</span>
          {tab.label}
        </Button>
      ))}
    </nav>
  )

  // Mobile tab bar
  const MobileTabBar = (
    <nav className="mobile-tab-scroll md:hidden flex flex-row gap-2 overflow-x-auto py-2 px-1 bg-product-background/95 mb-4">
      {TABS.map((tab) => (
        <Button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          variant="nav"
          className={`${activeTab === tab.value
            ? "!bg-product-hover-background !text-navbar-button-active !border !border-product-primary shadow-sm font-semibold hover:scale-[1.03] hover:transform"
            : ""
            } flex items-center justify-start font-body flex-shrink-0 whitespace-nowrap`}
          aria-current={activeTab === tab.value ? "page" : undefined}>
          <span className="flex items-center justify-center">{tab.icon}</span>
          {tab.label}
        </Button>
      ))}
    </nav>
  )

  return (
    <div className="w-full min-h-screen px-2 sm:px-4 md:px-6 lg:px-8 pt-32 pb-12 bg-gradient-to-br from-product-background to-hero-product-background animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
        {/* Sidebar Tabs (hidden on mobile) */}
        <aside className="hidden md:block w-56 flex-shrink-0 bg-product-background/90 border border-product-border shadow-md rounded-2xl sticky top-24 self-start">
          {SidebarContent}
        </aside>
        {/* Main Content Section */}
        <section className="flex-1 min-w-0 bg-product-background/95 border border-product-border shadow-md rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 relative z-10 text-xs sm:text-sm md:text-base lg:text-lg">
          {/* Mobile tab bar */}
          {MobileTabBar}
          {activeTab === "overview" && (
            <section className="animate-fade-in">
              <Overview user={user} overallAnalytics={overallAnalytics} catalogues={catalogues} />
            </section>
          )}
          {activeTab === "subscription" && (
            <section className="animate-fade-in">
              <Subscription pricingPlan={pricingPlan} />
            </section>
          )}
          {activeTab === "usage" && (
            <section className="animate-fade-in">
              <Usage data={usage} />
            </section>
          )}
          {activeTab === "settings" && (
            <section className="animate-fade-in">
              <Settings />
            </section>
          )}
        </section>
      </div>
    </div>
  )
}
