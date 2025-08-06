import { Record } from "@/types";

const CardType3 = ({ record, currency }: { record: Record; currency: string }) => {
  return (
    <div
      className="bg-card-bg rounded-[12px] p-2 sm:p-4 text-card-text flex flex-col
    sm:flex-row sm:flex-wrap border border-card-border shadow-[0_0_5px_1px_rgba(233,245,254,0.2)]
     gap-1.5 sm:gap-2 sm:items-center sm:justify-between">
      <div className="flex flex-col flex-1 gap-0.5 sm:gap-1 min-w-0">
        <h3
          className="text-[14px] sm:text-[24px] font-normal text-card-heading leading-tight"
          style={{
            fontFamily: "var(--font-family-heading)",
            fontWeight: "var(--font-weight-heading)",
            letterSpacing: "var(--letter-spacing-heading)",
          }}>
          {record.name}
        </h3>
        <p
          className="text-[12px] sm:text-[16px] text-card-description font-normal leading-snug overflow-hidden"
          style={{
            fontFamily: "var(--font-family-body)",
            fontWeight: "var(--font-weight-body)",
            letterSpacing: "var(--letter-spacing-body)",
          }}>
          {record.description}
        </p>
      </div>

      <div className="pt-1 sm:pt-0 sm:pl-4 flex-shrink-0 text-right">
        <span
          className="text-[14px] sm:text-[22px] font-thin text-price block"
          style={{
            fontFamily: "var(--font-family-heading)",
            fontWeight: "var(--font-weight-heading)",
            letterSpacing: "var(--letter-spacing-heading)",
          }}>
          {record.price} {currency}
        </span>
      </div>
    </div>
  )
}

export default CardType3
