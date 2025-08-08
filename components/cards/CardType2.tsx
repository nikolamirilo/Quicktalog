'use client'
import { Record } from '@/types'

const CardType2 = ({ record, currency }: { record: Record, currency: string }) => {
  return (
    <article className="flex flex-col bg-card-bg text-card-text rounded-[12px] border border-card-border
  shadow-[0_0_5px_1px_rgba(233,245,254,0.2)] overflow-hidden
  w-[45%] max-w-[180px] sm:max-w-[220px] md:max-w-[260px]" role="article" aria-labelledby={`item-title-${record.name?.replace(/\s+/g, '-').toLowerCase()}`} tabIndex={0}>

      <div
        style={{ backgroundImage: `url(${record.image})` }}
        className="aspect-[4/3] bg-center bg-cover w-full"
        role="img"
        aria-label={`Image of ${record.name}`}
      ></div>

      <div className="flex flex-col justify-between flex-1 p-2 sm:p-3 md:p-4 gap-1.5 sm:gap-2">
        <div>
          <h3
            id={`item-title-${record.name?.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-[14px] sm:text-[18px] md:text-[22px] font-heading tracking-heading text-card-heading leading-tight truncate"
          >
            {record.name}
          </h3>
          <p
            className="text-[12px] sm:text-[15px] md:text-[16px] text-card-description font-body tracking-body leading-snug overflow-hidden"
            aria-describedby={`item-title-${record.name?.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {record.description}
          </p>
        </div>
        <div>
          <span
            className="text-[14px] sm:text-[18px] md:text-[22px] text-price font-heading tracking-heading"
            aria-label={`Price: ${record.price} ${currency}`}
          >
            {record.price} {currency}
          </span>
        </div>
      </div>
    </article>

  )
}

export default CardType2
