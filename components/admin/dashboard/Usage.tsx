"use client"
import { OverallUsage, PricingPlan } from "@/types"
import { BiGridAlt, BiScan } from "react-icons/bi"
import { FiBarChart2 } from "react-icons/fi"
import { IoAnalyticsOutline } from "react-icons/io5"
import { RiSparkling2Line } from "react-icons/ri"
import DonutChart from "../../charts/DonutChart"

const Usage = ({ data, pricingPlan }: { data: OverallUsage, pricingPlan: PricingPlan }) => {
  const trafficUsage = {
    data: [data.traffic, pricingPlan.features.traffic_limit - data.traffic],
    labels: ["Used", "Remaining"],
    title: "Traffic",
    description: `${data.traffic} / ${pricingPlan.features.traffic_limit}`,
    icon: <IoAnalyticsOutline size={30} />,
    shown: true
  }

  const cataloguesUsage = {
    data: [data.catalogues, pricingPlan.features.catalogues - data.catalogues],
    labels: ["Used", "Remaining"],
    title: "Catalogues",
    description: `${data.catalogues} / ${pricingPlan.features.catalogues}`,
    icon: <BiGridAlt size={30} />,
    shown: true
  }

  const aiPromptsUsage = {
    data: [data.prompts, pricingPlan.features.ai_catalogue_generation - data.prompts],
    labels: ["Used", "Remaining"],
    title: "AI Prompts",
    description: `${data.prompts} / ${pricingPlan.features.ai_catalogue_generation}`,
    icon: <RiSparkling2Line size={30} />,
    shown: pricingPlan.features.ai_catalogue_generation > 0 ? true : false
  }

  const ocrUsage = {
    data: [data.ocr, pricingPlan.features.ocr_ai_import - data.ocr],
    labels: ["Used", "Remaining"],
    title: "OCR Import",
    description: `${data.ocr} / ${pricingPlan.features.ocr_ai_import}`,
    icon: <BiScan size={30} />,
    shown: pricingPlan.features.ocr_ai_import > 0 ? true : false
  }

  const charts = [trafficUsage, cataloguesUsage, aiPromptsUsage, ocrUsage]

  return (
    <div>
      <h2
        className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 text-product-foreground flex items-center gap-2 sm:gap-3"
        style={{ fontFamily: "var(--font-playfair-display), var(--font-inter), serif" }}>
        <FiBarChart2 className="text-product-primary w-6 h-6 sm:w-8 sm:h-8" /> Usage Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {charts.filter((item) => item.shown === true).map((chart, index) => (
          <DonutChart
            key={index}
            data={chart.data}
            labels={chart.labels}
            title={chart.title}
            description={chart.description}
            icon={chart.icon}
          />
        ))}
      </div>
    </div>
  )
}

export default Usage
