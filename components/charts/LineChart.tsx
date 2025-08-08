"use client"
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react"
import dynamic from "next/dynamic"
import { CgLoadbarSound } from "react-icons/cg"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

interface LineChartProps {
  data: { date: string; count: number }[]
}

export default function LineChart({ data = [] }: LineChartProps) {
  // Prepare chart data from props
  const categories = data.map((d) => d.date)
  const seriesData = data.map((d) => d.count)

  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Page Views",
        data: seriesData.length > 0 ? seriesData : [0],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: categories.length > 0 ? categories : ["-"],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  }

  return (
    //@ts-ignore
    <Card>
      {/*@ts-ignore */}
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center">
        <div className="w-max rounded-lg bg-product-secondary text-white">
          <CgLoadbarSound size={50} />
        </div>
        <div>
          {/*@ts-ignore */}
          <Typography variant="h6" color="blue-gray">
            Traffic Overview
          </Typography>
          {/*@ts-ignore */}
          <Typography variant="small" color="gray" className="max-w-sm font-normal">
            Track analytics of your digital catalogue.
          </Typography>
        </div>
      </CardHeader>
      {/*@ts-ignore */}
      <CardBody className="px-2 pb-0">
        {/*@ts-ignore */}
        <Chart {...chartConfig} height={350} />
      </CardBody>
    </Card>
  )
}
