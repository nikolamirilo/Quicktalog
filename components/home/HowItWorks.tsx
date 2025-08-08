"use client"
import clsx from "clsx"
import { motion, Variants } from "framer-motion"
import React, { useState } from "react"
import { FiCheck, FiShare2, FiUpload, FiZap } from "react-icons/fi"
import { IoDiamondOutline } from "react-icons/io5"
import { MdOutlineLocalOffer } from "react-icons/md"
import { TbCategory } from "react-icons/tb"
import "swiper/css"
import { Mousewheel } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const containerVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      bounce: 0.2,
      duration: 0.9,
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
}

const stepVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      bounce: 0.3,
      duration: 0.8,
    },
  },
}

const StepCard: React.FC<{ step: any; index: number }> = ({ step, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={stepVariants}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="h-full">
      {/* Exact same shadow styling as PricingColumn */}
      <div
        className={clsx(
          "group relative w-full h-full bg-product-background text-product-foreground rounded-xl border border-gray-200 transition-all duration-300 ease-out overflow-hidden",
          {
            "shadow-lg hover:shadow-xl hover:scale-101 hover:-translate-y-0.5": !isHovered,
            "shadow-xl scale-101 -translate-y-0.5": isHovered,
          }
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Image section */}
        <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-product-primary/5 to-product-primary/10 overflow-hidden">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full px-3 py-3 border-b-2 border-product-border object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement
              target.style.display = "none"
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = `
                                    <div class="flex items-center justify-center h-full bg-gradient-to-br from-product-primary/10 to-product-primary/20">
                                        <div class="w-16 h-16 bg-product-primary/20 rounded-2xl flex items-center justify-center text-product-primary">
                                            ${step.icon?.toString() || ""}
                                        </div>
                                    </div>
                                `
              }
            }}
          />

          {/* Step number overlay */}
          <div className="absolute top-4 left-4 w-10 h-10 bg-product-primary rounded-full flex items-center justify-center text-product-background font-bold text-sm shadow-lg">
            {step.step}
          </div>
        </div>

        {/* Content section */}
        <div className="flex flex-col justify-start p-4 sm:p-6 gap-2 flex-grow">
          <div className="flex flex-col gap-2 flex-grow">
            <h3 className="text-lg sm:text-xl font-bold text-product-foreground font-lora">
              {step.title}
            </h3>
            <p className="text-sm text-product-foreground-accent leading-relaxed font-lora">
              {step.description}
            </p>
          </div>

          {/* Features list */}
          <div className="mt-3 jus space-y-2">
            {step.features.map((feature: string, featureIndex: number) => (
              <div key={featureIndex} className="flex items-start gap-2">
                <div className="flex-shrink-0 w-4 h-4 bg-product-primary/10 rounded-full flex items-center justify-center mt-0.5">
                  <FiCheck className="w-2.5 h-2.5 text-product-primary" />
                </div>
                <span className="text-xs text-product-foreground-accent font-lora">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "1",
      title: "Tell Us About Your Business",
      description:
        "First, let's get to know you. Add your business name, choose a theme that matches your brand, and set your currency. This is the foundation of your beautiful new catalog.",
      icon: <FiUpload className="w-8 h-8" />,
      image: "/images/card1-business.svg",
      features: [
        "Add your business name and logo",
        "Choose from a variety of themes",
        "Set your currency and contact info",
      ],
    },
    {
      step: "2",
      title: "Organize Your Offerings",
      description:
        "Create categories to group your services or products. This makes it easy for your customers to find exactly what they're looking for.",
      icon: <TbCategory className="w-8 h-8" />,
      image: "/images/step2.svg", // Placeholder image
      features: [
        "Create unlimited categories",
        "Choose from different layouts",
        "Drag and drop to reorder",
      ],
    },
    {
      step: "3",
      title: "Add Your Services",
      description:
        "Now for the fun part! Add your services, products, or menu items. Include photos, descriptions, and prices to make them irresistible.",
      icon: <MdOutlineLocalOffer className="w-8 h-8" />,
      image: "/images/card3.svg", // Placeholder image
      features: ["Add high-quality images", "Write compelling descriptions", "Set your prices"],
    },
    {
      step: "4",
      title: "Brand and Launch",
      description:
        "Add the finishing touches to make your catalog uniquely yours. Add your logo, customize your colors, and hit 'launch' to share it with the world.",
      icon: <IoDiamondOutline className="w-8 h-8" />,
      image: "/images/card4.svg", // Placeholder image
      features: ["Upload your logo", "Customize your brand colors", "Add your contact information"],
    },
    {
      step: "5",
      title: "Share with the World",
      description:
        "Your beautiful new catalog is ready! Share it with a link or QR code, and watch the customers roll in. Update it anytime, anywhere.",
      icon: <FiShare2 className="w-8 h-8" />,
      image: "/images/card5.svg", // Placeholder image
      features: [
        "Get a unique link and QR code",
        "Share on social media or in-person",
        "Update your catalog in real-time",
      ],
    },
    {
      step: "AI",
      title: "Or... Let AI Do the Work",
      description:
        "Feeling lazy? Just describe your business and our AI will create a beautiful, professional catalog for you in seconds. It's like magic!",
      icon: <FiZap className="w-8 h-8" />,
      image: "/images/ai.svg", // Placeholder image
      features: [
        "Just describe your business",
        "AI generates your entire catalog",
        "Ready in seconds, not minutes",
      ],
    },
  ]

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}>
      {/* First card aligned with container, extends to right edge */}
      <div className="relative w-full">
        <div className="w-screen relative left-1/2 -translate-x-1/2">
          <Swiper
            spaceBetween={24}
            slidesPerView={"auto"}
            modules={[Mousewheel]}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 1,
              releaseOnEdges: true,
            }}
            touchRatio={1}
            touchAngle={45}
            touchMoveStopPropagation={false}
            touchStartPreventDefault={false}
            touchStartForcePreventDefault={false}
            touchReleaseOnEdges={true}
            className="my-4"
            style={{
              paddingLeft: "max(20px, calc((100vw - 1280px) / 2 + 20px))",
              paddingRight: "max(20px, calc((100vw - 1280px) / 2 + 20px))",
              paddingTop: "8px",
              paddingBottom: "16px",
            }}>
            {steps.map((step, index) => (
              <SwiperSlide
                key={step.step}
                className="!w-[280px] sm:!w-[320px] md:!w-[360px] lg:!w-[400px] flex-shrink-0 flex flex-col !h-auto">
                <StepCard step={step} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2 text-product-foreground-accent text-sm font-lora">
          <span>Swipe to see all steps</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-product-primary/30 rounded-full"></div>
            <div className="w-2 h-2 bg-product-primary/20 rounded-full"></div>
            <div className="w-2 h-2 bg-product-primary/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HowItWorks
