"use client"

import SuccessModal from "@/components/modals/SuccessModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { revalidateData } from "@/utils/server"
import Link from "next/link"
import React, { useState } from "react"
import {
  RiGamepadLine,
  RiHeartPulseLine,
  RiLightbulbLine,
  RiScissorsLine,
  RiSparkling2Line,
  RiStore2Line,
} from "react-icons/ri"

export default function AiServicesForm() {
  const [prompt, setPrompt] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [restaurantUrl, setServiceCatalogueUrl] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setServiceCatalogueUrl("")

    try {
      const response = await fetch("/api/items/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      if (response.ok) {
        const { restaurantUrl } = await response.json()
        setServiceCatalogueUrl(restaurantUrl)
        setShowSuccessModal(true)
        toast({
          title: "Success!",
          description: (
            <p>
              Your digital showcase has been created. You can view it at{" "}
              <Link href={restaurantUrl} className="text-primary-accent hover:underline">
                {restaurantUrl}
              </Link>
            </p>
          ),
        })
      } else {
        const errorData = await response.json()
        toast({
          title: "Error",
          description: `Failed to create showcase: ${errorData.error || "Unknown error"}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while submitting the prompt.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      revalidateData()
    }
  }

  const handleCloseModal = () => setShowSuccessModal(false)

  const businessExamples = [
    {
      icon: <RiStore2Line size={18} />,
      category: "Restaurant",
      prompt:
        "A cozy Italian restaurant with fresh pasta, wood-fired pizzas, and wine pairings in a warm, family-friendly atmosphere",
    },
    {
      icon: <RiScissorsLine size={18} />,
      category: "Beauty Salon",
      prompt:
        "A modern beauty salon offering haircuts, coloring, styling, manicures, and facial treatments with premium products",
    },
    {
      icon: <RiHeartPulseLine size={18} />,
      category: "Fitness Gym",
      prompt:
        "A fitness center with personal training, group classes, weight training, and cardio equipment for all fitness levels",
    },
    {
      icon: <RiGamepadLine size={18} />,
      category: "Entertainment",
      prompt:
        "A bowling alley with lane rentals, birthday parties, arcade games, and food service for families and groups",
    },
    {
      icon: <RiStore2Line size={18} />,
      category: "Café",
      prompt:
        "A specialty coffee shop with artisan drinks, fresh pastries, light meals, and a cozy workspace atmosphere",
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto bg-product-background/95 border border-product-border shadow-md rounded-3xl">
      <Card
        className="w-full h-full bg-transparent border-0 shadow-none rounded-none backdrop-blur-none"
        type="form">
        <CardHeader className="p-6 sm:p-8">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-product-foreground font-heading">
            AI Business Catalogue Generator
          </CardTitle>
          <CardDescription className="text-center text-product-foreground-accent text-base sm:text-lg mt-2 font-body">
            Create stunning digital showcases for your services in minutes. Perfect for restaurants,
            salons, gyms, and more.
          </CardDescription>
          <div className="flex justify-center mt-6">
            {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-accent text-white shadow-md">
              <RiSparkling2Line size={32} />
            </div> */}
          </div>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="prompt" className="text-sm font-medium text-product-foreground">
                Business Description
              </label>
              <Textarea
                id="prompt"
                placeholder="e.g., A modern beauty salon specializing in premium hair treatments, nail services, and skincare..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                className="resize-none border border-product-border focus:border-product-primary focus:ring-product-primary bg-transparent text-product-foreground transition-colors"
              />
              <p className="text-xs text-product-foreground-accent">
                {prompt.length}/500 characters
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !prompt.trim()}
              variant="cta"
              className="h-12 font-medium rounded-lg">
              {isSubmitting ? (
                <div className="flex items-center gap-2 animate-pulse">
                  <RiSparkling2Line size={20} className="animate-spin" />
                  Creating Your Catalogue...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <RiSparkling2Line size={20} />
                  Generate Catalogue
                </div>
              )}
            </Button>
          </form>

          {/* Example Prompts */}
          <div className="mt-8 pt-6 border-t border-product-border">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-product-foreground flex items-center gap-2">
                <RiLightbulbLine className="text-primary-accent" />
                Business Examples
              </h3>
              <p className="text-product-foreground-accent text-sm">
                Choose your business type or get inspired
              </p>
            </div>
            <div className="grid gap-3">
              {businessExamples.map((example, index) => (
                <Button
                  key={index}
                  onClick={() => setPrompt(example.prompt)}
                  disabled={isSubmitting}
                  variant="ghost"
                  className="text-left p-4 rounded-lg bg-transparent hover:bg-product-hover-background border border-product-border transition-all group !h-fit">
                  <div className="flex flex-row justify-start items-center w-full h-full gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-accent/10 flex items-center justify-center group-hover:bg-primary-accent/20 transition-colors">
                      <span className="text-product-primary">{example.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-product-foreground group-hover:text-product-primary mb-1">
                        {example.category}
                      </div>
                      <div className="text-sm text-product-foreground-accent group-hover:text-product-primary">
                        {example.prompt}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        restaurantUrl={restaurantUrl}
        type="ai"
      />
    </div>
  )
}
