"use client"
import { FaRegCheckCircle } from "react-icons/fa"
import { Button } from "../ui/button"

const InfoModal = ({
  message = "We received your answer",
  setIsOpen,
  isOpen,
}: {
  message?: string
  setIsOpen: any
  isOpen: boolean
}) => {
  return (
    <div className="w-full top-0 left-0 h-screen absolute bg-black/60 flex items-center justify-center z-10 ">
      <div className="relative dark:bg-dark bg-product-background rounded-lg shadow min-w-72">
        <div className="p-4 md:p-5 text-center">
          <FaRegCheckCircle size={40} className="text-primaryColor mx-auto my-4" />
          <h3 className="mb-5 text-lg font-normal dark:text-white text-dark max-w-[98vw] md:max-w-[500px]">
            {message}
          </h3>
          <Button
            type="button"
            variant="modal"
            onClick={() => {
              setIsOpen(!isOpen)
            }}>
            Got it!
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InfoModal
