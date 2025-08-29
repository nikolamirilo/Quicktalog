"use client"
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react"
import dynamic from "next/dynamic"
import { JSX, useState } from "react"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

import type { DonutChartProps } from "@/types/components"

export default function DonutChart({
  data = [],
  labels = [],
  title,
  description,
  icon,
}: DonutChartProps) {
  const [chartColors, setChartColors] = useState(["#ffc107", "#010e58"])

  const chartConfig = {
    type: "donut",
    height: 240,
    series: data.length > 0 ? data : [1],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val.toFixed(1) + "%"
        },
        dropShadow: {
          enabled: false,
        },
        style: {
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 600,
        },
      },
      colors: chartColors,
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
      },
      labels: labels.length > 0 ? labels : ["-"],
      states: {
        hover: {
          filter: {
            type: "none",
          },
        },
        active: {
          filter: {
            type: "none",
          },
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: true,
                label: "Total",
                formatter: function (w: any) {
                  const total = w.globals.seriesTotals.reduce((a: number, b: number) => {
                    return a + b
                  }, 0)
                  return Number(total.toFixed(0)).toLocaleString()
                },
              },
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
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
        <div className="w-max rounded-lg bg-product-secondary text-white p-2">{icon}</div>
        <div>
          {/*@ts-ignore */}
          <Typography variant="h6" color="blue-gray">
            {title}
          </Typography>
          {/*@ts-ignore */}
          <Typography variant="small" color="gray" className="max-w-sm font-normal">
            {description}
          </Typography>
        </div>
      </CardHeader>
      {/*@ts-ignore */}
      <CardBody className="px-2 pb-0 donut-chart-wrapper">
        {/*@ts-ignore */}
        <Chart {...chartConfig} height={350} />
      </CardBody>
    </Card>
  )
}
