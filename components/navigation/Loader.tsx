import { ScaleLoader } from "react-spinners"

const Loader = ({ type }: { type?: string }) => {
  return (
    <div
      className={`${type !== "dashboard" ? "bg-product-background h-screen" : "h-[50vh]"} flex justify-center items-center w-full `}>
      <ScaleLoader height={40} width={6} className="!text-product-primary" color="#ffc107" />
    </div>
  )
}

export default Loader
