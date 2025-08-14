"use client"
import { BiGridAlt, BiScan } from "react-icons/bi"
import { FiBarChart2 } from "react-icons/fi"
import { IoAnalyticsOutline } from "react-icons/io5"
import { RiSparkling2Line } from "react-icons/ri"
import DonutChart from "../../charts/DonutChart"

const Usage = ({ data }) => {
  const trafficUsage = {
    data: [data.traffic, 10000 - data.traffic],
    labels: ["Used", "Remaining"],
    title: "Traffic",
    description: "8,252 / 10,000",
    icon: <IoAnalyticsOutline size={30} />,
  }

  const cataloguesUsage = {
    data: [data.catalogues, 20 - data.catalogues],
    labels: ["Used", "Remaining"],
    title: "Catalogues",
    description: "5 / 20",
    icon: <BiGridAlt size={30} />,
  }

  const aiPromptsUsage = {
    data: [data.prompts, 10 - data.prompts],
    labels: ["Used", "Remaining"],
    title: "AI Prompts",
    description: "8 / 10",
    icon: <RiSparkling2Line size={30} />,
  }

  const ocrUsage = {
    data: [data.ocr, 5 - data.ocr],
    labels: ["Used", "Remaining"],
    title: "OCR Import",
    description: "4 / 5",
    icon: <BiScan size={30} />,
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
        {charts.map((chart, index) => (
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
