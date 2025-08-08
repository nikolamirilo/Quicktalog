"use client"
import { Record } from "@/types"
import React from "react"

const CardType2 = ({ record, currency }: { record: Record; currency: string }) => {
  return (
    <div
      className="flex flex-col bg-card-bg text-card-text rounded-[12px] border border-card-border
  shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] overflow-hidden
  w-[45%] max-w-[180px] sm:max-w-[220px] md:max-w-[260px]">
      <div
        id="image"
        style={{ backgroundImage: `url(${record.image})` }}
        className="aspect-[4/3] bg-center bg-cover w-full"></div>

      <div className="flex flex-col justify-between flex-1 p-2 sm:p-3 md:p-4 gap-1.5 sm:gap-2">
        <div>
          <h3
            className="text-[14px] sm:text-[18px] md:text-[22px] font-normal text-card-heading leading-tight truncate"
            style={{
              fontFamily: "var(--font-family-heading)",
              fontWeight: "var(--font-weight-heading)",
              letterSpacing: "var(--letter-spacing-heading)",
            }}>
            {record.name}
          </h3>
          <p
            className="text-[12px] sm:text-[15px] md:text-[16px] text-card-description font-normal leading-snug overflow-hidden"
            style={{
              fontFamily: "var(--font-family-body)",
              fontWeight: "var(--font-weight-body)",
              letterSpacing: "var(--letter-spacing-body)",
            }}>
            {record.description}
          </p>
        </div>
        <div>
          <span
            className="text-[14px] sm:text-[18px] md:text-[22px] text-price"
            style={{
              fontFamily: "var(--font-family-heading)",
              fontWeight: "var(--font-weight-heading)",
              letterSpacing: "var(--letter-spacing-heading)",
            }}>
            {record.price} {currency}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CardType2
