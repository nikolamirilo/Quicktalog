//@ts-nocheck
import React from "react";
import ServicesSection from "@/components/sections/ServicesSection";
import CatalogueHeader from "@/components/navigation/CatalogueHeader";
import CatalogueFooter from "@/components/navigation/CatalogueFooter";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const page = async ({ params }: { params: Promise<{ name: string }> }) => {
  try {
    const { name } = await params;
    
    if (!name) {
      throw new Error("Service catalogue name is required");
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const { data, error } = await supabase
      .from("service_catalogues")
      .select()
      .eq("name", name);

    if (error) {
      console.error("Database error:", error);
      throw new Error(`Failed to fetch service catalogue: ${error.message}`);
    }

    if (!data || data.length === 0) {
      return (
        <main className="theme-elegant bg-background text-foreground min-h-screen">
          <CatalogueHeader />
          <div className="pt-40 pb-24 text-center flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-lora font-semibold text-heading drop-shadow-sm">
              Service Catalogue Not Found
            </h1>
            <p className="text-text text-base sm:text-lg md:text-xl px-5 max-w-[900px] font-lora font-normal leading-relaxed">
              The service catalogue you're looking for doesn't exist or has been removed.
            </p>
          </div>
          <CatalogueFooter type="custom" />
        </main>
      );
    }

    const item = data[0];
    
    // Validate required fields
    if (!item.title || !item.services) {
      console.error("Invalid service catalogue data:", item);
      throw new Error("Service catalogue data is incomplete");
    }

    // Safely extract contact information
    const getContactValue = (type: string) => {
      if (!item.contact || !Array.isArray(item.contact)) return undefined;
      const contact = item.contact.find((c: any) => c.type === type);
      return contact?.value;
    };

    const socialLinks = {
      instagram: getContactValue('instagram'),
      facebook: getContactValue('facebook'),
      twitter: getContactValue('twitter'),
      website: getContactValue('website'),
    };

    return (
      <main className={`${item.theme || "theme-elegant"} bg-background text-foreground min-h-screen`}>
        <CatalogueHeader />
        <div className="pt-40 pb-24 text-center flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-lora font-semibold text-heading drop-shadow-sm">
            {item.title}
          </h1>
          <p className="text-text text-base sm:text-lg md:text-xl px-5 max-w-[900px] font-lora font-normal leading-relaxed">
            {item.subtitle}
          </p>
        </div>
        {item && (
          <ServicesSection
            servicesData={item.services}
            currency={item.currency}
            type="item"
          />
        )}
        <CatalogueFooter 
          type="custom" 
          customLegalName={item.legal?.name}
          customEmail={getContactValue('email')}
          customPhone={getContactValue('phone')}
          customSocialLinks={socialLinks}
        />
      </main>
    );
  } catch (error) {
    console.error("Service catalogue page error:", error);
    
    return (
      <main className="theme-elegant bg-background text-foreground min-h-screen">
        <CatalogueHeader />
        <div className="pt-40 pb-24 text-center flex flex-col justify-center items-center gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl">
            <h1 className="text-2xl font-bold text-red-800 mb-4">
              Error Loading Service Catalogue
            </h1>
            <p className="text-red-700 mb-4">
              {error instanceof Error ? error.message : "An unexpected error occurred while loading the service catalogue."}
            </p>
            <div className="text-sm text-red-600">
              <p>Please check:</p>
              <ul className="list-disc list-inside mt-2">
                <li>The URL is correct</li>
                <li>Your internet connection</li>
                <li>Try refreshing the page</li>
              </ul>
            </div>
          </div>
        </div>
        <CatalogueFooter type="custom" />
      </main>
    );
  }
};

export default page;

