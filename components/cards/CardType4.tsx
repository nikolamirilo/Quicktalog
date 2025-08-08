"use client"
import { Record } from "@/types";

const CardType4 = ({ record, currency }: { record: Record; currency: string }) => {
  return (
    <article
      className="flex flex-col !h-full bg-card-bg text-card-text rounded-[16px] border border-card-border shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] 
      w-full sm:w-[220px] md:w-[260px] lg:w-[320px] flex-shrink-0 overflow-hidden" role="article" aria-labelledby={`item-title-${record.name?.replace(/\s+/g, '-').toLowerCase()}`} tabIndex={0}>
      <div
        style={{ backgroundImage: `url(${record.image})` }}
        className="w-full aspect-[4/3] max-h-[120px] sm:max-h-[140px] md:max-h-[180px] bg-center bg-cover"
        role="img"
        aria-label={`Image of ${record.name}`}
      ></div>

      <div className="flex flex-col justify-start p-2 sm:p-3 gap-1 flex-grow">
        <div className="flex flex-col gap-1 flex-grow min-h-[60px]">
          <h5
            id={`item-title-${record.name?.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-[12px] sm:text-[14px] md:text-[18px] font-heading tracking-heading text-card-heading text-left truncate"
          >
            {record.name}
          </h5>
          <p
            className="text-[10px] sm:text-[12px] md:text-[14px] text-card-description font-body tracking-body text-left overflow-hidden leading-snug"
            aria-describedby={`item-title-${record.name?.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {record.description}
          </p>
        </div>

        <span
          className="text-[12px] sm:text-[14px] md:text-[18px] font-thin text-price text-left mt-auto font-heading tracking-heading"
          aria-label={`Price: ${record.price} ${currency}`}
        >
          {record.price} {currency}
        </span>
      </div>
    </article>
  )
}

export default CardType4
