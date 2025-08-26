"use client"

import SuccessModal from "@/components/modals/SuccessModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { examplePrompts } from "@/constants/static"
import { toast } from "@/hooks/use-toast"
import { revalidateData } from "@/utils/server"
import Link from "next/link"
import React, { useState } from "react"
import { RiLightbulbLine, RiSparkling2Line } from "react-icons/ri"
import Step1General from "./components/Step1General"
import OcrReader from "./OcrReader"
import PromptInput from "./PromptInput"

export default function AiServicesFormSwithcer({ type }) {
  const [formData, setFormData] = useState({
    name: "",
    theme: "",
    title: "",
    currency: "",
    subtitle: "",
  })
  const [prompt, setPrompt] = useState("")

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [restaurantUrl, setServiceCatalogueUrl] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) newErrors.name = "Name is required."
    if (!formData.title.trim()) newErrors.title = "Title is required."
    if (!formData.currency.trim()) newErrors.currency = "Currency is required."
    if (!formData.theme.trim()) newErrors.theme = "Theme is required."
    if (!prompt.trim()) newErrors.prompt = "Services description is required."
    setErrors(newErrors)
    setTouched({
      name: true,
      title: true,
      currency: true,
      theme: true,
      prompt: true,
    })
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setServiceCatalogueUrl("")

    try {
      const response = await fetch("/api/items/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: formData, prompt }),
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

  return (
    <div className="w-full max-w-4xl mx-auto bg-product-background/95 border border-product-border shadow-md rounded-3xl my-32">
      <Card
        className="w-full h-full bg-transparent border-0 shadow-none rounded-none backdrop-blur-none"
        type="form">
        <CardHeader className="p-6 sm:p-8">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-product-foreground font-heading">
            {type === "ai_prompt"
              ? "AI Business Catalogue Generator"
              : "Service Catalogue OCR import"}
          </CardTitle>
          <CardDescription className="text-center text-product-foreground-accent text-base sm:text-lg mt-2 font-body">
            {type === "ai_prompt"
              ? "Generate stunning service catalogues"
              : "Import your existing service catalogues"}{" "}
            of your services in minutes. Perfect for restaurants, salons, gyms, and more.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Step1General
              formData={formData}
              handleInputChange={handleInputChange}
              setFormData={setFormData}
              errors={errors}
              touched={touched}
            />

            {type === "ai_prompt" ? (
              <>
                <PromptInput
                  prompt={prompt}
                  touched={touched}
                  errors={errors}
                  setPrompt={setPrompt}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
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
              </>
            ) : type === "ocr_import" ? (
              <OcrReader formData={formData} />
            ) : null}
          </form>

          {type === "ai_prompt" && (
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
                {examplePrompts.map((example, index) => (
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
          )}
        </CardContent>
      </Card>
      {type === "ai_prompt" && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          restaurantUrl={restaurantUrl}
          type="ai"
        />
      )}
    </div>
  )
}
