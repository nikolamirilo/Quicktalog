"use client"
import { Record } from "@/types"
import React from "react"

const CardType1 = ({ record, currency }: { record: Record; currency: string }) => {
  return (
    <div
      className="flex flex-row bg-card-bg text-card-text rounded-[12px]
shadow-lg overflow-hidden max-w-full min-h-[110px] sm:min-h-[150px]">
      <div
        style={{ backgroundImage: `url(${record.image})` }}
        className="w-[40%] min-w-[90px] sm:min-w-[120px] aspect-[4/3] bg-center bg-cover flex-shrink-0"></div>

      <div className="flex flex-col p-1.5 sm:p-3 flex-1 gap-1 sm:gap-2 min-w-0">
        <h3
          className="text-[13px] sm:text-[22px] font-normal text-card-heading leading-tight truncate"
          style={{
            fontFamily: "var(--font-family-heading)",
            fontWeight: "var(--font-weight-heading)",
            letterSpacing: "var(--letter-spacing-heading)",
          }}>
          {record.name}
        </h3>
        <p
          className="text-[11px] sm:text-[16px] text-card-description font-normal leading-snug overflow-hidden"
          style={{
            fontFamily: "var(--font-family-body)",
            fontWeight: "var(--font-weight-body)",
            letterSpacing: "var(--letter-spacing-body)",
          }}>
          {record.description}
        </p>
        <div className="pt-0 sm:pt-1 mt-auto">
          <span
            className="text-[13px] sm:text-[20px] font-thin text-price"
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

export default CardType1
