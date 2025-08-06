// @ts-nocheck
"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { useMainContext } from "@/context/MainContext";
import CardsSwitcher from "../cards";
import SectionHeader from "./SectionHeader";
import { contentVariants, getGridStyle } from "./helpers";

const ServicesSection = ({
  servicesData,
  currency,
  type,
}: {
  servicesData: any;
  currency: string;
  type: "playground" | "item";
}) => {
  const { layout } = useMainContext();
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const sectionsData = useMemo(() => {
    if (!servicesData) {
      console.warn("ServicesSection: No servicesData provided");
      return [];
    }
    
    console.log("ServicesSection: Processing servicesData:", servicesData);
    
    try {
      const customOrder = ["breakfast", "lunch", "snacks", "desserts"];
      
      const sections = Object.keys(servicesData).map((item) => ({
        title: item
          .replace(/[-_]/g, " ")                      // Replace dashes/underscores with space
          .split(" ")                                 // Split into words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize each word
          .join(" "),                                 // Join back into a string
        code: item,
      }))
        .sort((a, b) => {
          const aIndex = customOrder.indexOf(a.code);
          const bIndex = customOrder.indexOf(b.code);
          return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
        });

      return sections;
    } catch (error) {
      console.error("ServicesSection: Error processing sections data:", error);
      return [];
    }
  }, [servicesData]);

  const handleToggleSection = (code: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  if (!servicesData) {
    console.warn("ServicesSection: No servicesData, rendering null");
    return (
      <main className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">No Services Available</h2>
          <p className="text-yellow-700">No service data has been loaded yet.</p>
        </div>
      </main>
    );
  }

  console.log("ServicesSection: Rendering with sectionsData:", sectionsData);

  if (sectionsData.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">No Service Categories</h2>
          <p className="text-yellow-700">No service categories were found in the data.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-4">
      {sectionsData.map((item) => {
        // The 'layout' variable now comes directly from the context
        const currentLayout = type === "playground" ? layout : servicesData[item.code]?.layout;
        
        console.log(`ServicesSection: Rendering section ${item.code} with layout ${currentLayout}`);

        // Validate section data
        if (!servicesData[item.code] || !Array.isArray(servicesData[item.code].items)) {
          console.error(`ServicesSection: Invalid data for section ${item.code}:`, servicesData[item.code]);
          return (
            <section key={item.code} className="mb-5" id={item.code}>
              <SectionHeader
                title={item.title}
                code={item.code}
                isExpanded={!!expandedSections[item.code]}
                onToggle={handleToggleSection}
              />
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <p className="text-red-700 text-sm">Invalid data for this section</p>
              </div>
            </section>
          );
        }

        return (
          <section key={item.code} className="mb-5" id={item.code}>
            <SectionHeader
              title={item.title}
              code={item.code}
              isExpanded={!!expandedSections[item.code]}
              onToggle={handleToggleSection}
            />
            
            <AnimatePresence initial={false}>
              {expandedSections[item.code] && (
                <motion.div
                  id={`section-content-${item.code}`}
                  key="content"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  {currentLayout === "variant_4" ? (
                    <Swiper
                      spaceBetween={12}
                      slidesPerView={"auto"}
                      className="mt-4 px-0 sm:px-2"
                    >
                      {servicesData[item.code].items.map((record: any, i: number) => (
                        <SwiperSlide
                          key={i}
                          className="!w-[160px] sm:!w-[220px] md:!w-[260px] lg:!w-[320px] flex-shrink-0 flex flex-col !h-auto"
                        >
                          <CardsSwitcher
                            variant={currentLayout}
                            record={record}
                            currency={currency}
                            i={i}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className={getGridStyle(currentLayout)}>
                      {servicesData[item.code].items.map((record: any, i: number) => (
                        <CardsSwitcher
                          key={i}
                          variant={currentLayout}
                          record={record}
                          currency={currency}
                          i={i}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        );
      })}
    </main>
  );
};

export default ServicesSection;