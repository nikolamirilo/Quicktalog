import Pricing from "@/components/home/Pricing/Pricing"
import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"
import React from "react"

const page = () => {
  return (
    <>
      <Navbar />
      <div className="div w-11/12 max-w-[1000px] mx-auto h-screen flex flex-col items-center justify-center pt-12">
        <h1 className="text-3xl font-bold mb-4">Pricing</h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore our flexible pricing plans designed to fit your needs.
        </p>
        <Pricing />
      </div>
      <Footer />
    </>
  )
}

export default page
