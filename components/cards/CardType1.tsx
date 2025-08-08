"use client"
import { Record } from "@/types"

const CardType1 = ({ record, currency }: { record: Record; currency: string }) => {
  return (
    <article
      className="flex flex-row bg-card-bg text-card-text rounded-[12px] border border-card-border
shadow-lg overflow-hidden max-w-full min-h-[110px] sm:min-h-[150px]"
      role="article"
      aria-labelledby={`item-title-${record.name?.replace(/\s+/g, "-").toLowerCase()}`}
      tabIndex={0}>
      <div
        style={{ backgroundImage: `url(${record.image})` }}
        className="w-[40%] min-w-[90px] sm:min-w-[120px] aspect-[4/3] bg-center bg-cover flex-shrink-0"
        role="img"
        aria-label={`Image of ${record.name}`}></div>

      <div className="flex flex-col p-1.5 sm:p-3 flex-1 gap-1 sm:gap-2 min-w-0">
        <h3
          id={`item-title-${record.name?.replace(/\s+/g, "-").toLowerCase()}`}
          className="text-[13px] sm:text-[22px] font-heading tracking-heading text-card-heading leading-tight truncate">
          {record.name}
        </h3>
        <p
          className="text-[11px] sm:text-[16px] text-card-description font-body tracking-body leading-snug overflow-hidden"
          aria-describedby={`item-title-${record.name?.replace(/\s+/g, "-").toLowerCase()}`}>
          {record.description}
        </p>
        <div className="pt-0 sm:pt-1 mt-auto">
          <span
            className="text-[13px] sm:text-[20px] font-thin text-price font-heading tracking-heading"
            aria-label={`Price: ${record.price} ${currency}`}>
            {record.price} {currency}
          </span>
        </div>
      </div>
    </article>
  )
}

export default CardType1
