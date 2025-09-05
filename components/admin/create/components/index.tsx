"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { defaultServiceCatalogueData } from "@/constants"
import { toast } from "@/hooks/use-toast"
import { ContactInfo, ServicesCategory, ServicesFormData, ServicesItem } from "@/types"
import { ServicesFormBaseProps } from "@/types/components"
import { useUser } from "@clerk/nextjs"
import { ArrowLeft, ArrowRight, Edit, Plus } from "lucide-react"
import React, { useEffect, useState } from "react"
import SuccessModal from "../../../modals/SuccessModal"
import Step1General from "./Step1General"
import Step2Categories from "./Step2Categories"
import Step3Services from "./Step3Services"
import Step4Branding from "./Step4Branding"

function ServicesForm({ type, initialData, onSuccess, userData }: ServicesFormBaseProps) {
  const [formData, setFormData] = useState<ServicesFormData>(
    initialData || defaultServiceCatalogueData
  )
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [serviceCatalogueUrl, setServiceCatalogueUrl] = useState("")
  const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string }>({})
  const [isUploading, setIsUploading] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)
  const [expandedItem, setExpandedItem] = useState<{
    categoryIndex: number
    itemIndex: number
  } | null>(null)
  const { user } = useUser()

  useEffect(() => {
    if (initialData) {
      // Transform services from object format to array format for the form
      const services = initialData.services || {}
      let transformedServices: ServicesFormData["services"] = []

      // If services is an object (from database), convert to array format
      if (typeof services === "object" && !Array.isArray(services)) {
        transformedServices = Object.entries(services).map(([key, value]) => ({
          order: value.order || 0,
          name: key.replace(/-/g, " "),
          layout: value.layout,
          items: value.items,
        }))
      } else if (Array.isArray(services)) {
        // If it's already an array, use as is
        transformedServices = services
      }

      setFormData({ ...initialData, services: transformedServices })
    }
  }, [initialData])

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleReorderCategories = (newOrder: ServicesFormData["services"]) => {
    setFormData((prev) => ({
      ...prev,
      services: newOrder,
    }))
  }
  const handleAddCategory = () => {
    const newCategoryIndex = formData.services.length
    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        { order: prev.services.length, name: "", layout: "", items: [] },
      ],
    }))
    setExpandedCategory(newCategoryIndex)
  }

  const handleRemoveCategory = (categoryIndex: number) => {
    setFormData((prev) => {
      const newServices = prev.services.filter((_, index) => index !== categoryIndex)
      // Update order values for remaining categories
      const reorderedServices = newServices.map((category, index) => ({
        ...category,
        order: index,
      }))

      return {
        ...prev,
        services: reorderedServices,
      }
    })
    setExpandedCategory(null)
  }

  const handleCategoryChange = (index: number, field: "name" | "layout", value: string) => {
    const updatedServices = [...formData.services]
    updatedServices[index][field] = value
    if (field === "layout" && value === "variant_3") {
      updatedServices[index].items = updatedServices[index].items.map((item) => ({
        ...item,
        image: "",
      }))
      // Also clear any image previews for this category
      setImagePreviews((prev) => {
        const newPreviews = { ...prev }
        updatedServices[index].items.forEach((_, itemIndex) => {
          delete newPreviews[`${index}-${itemIndex}`]
        })
        return newPreviews
      })
    }
    setFormData((prev) => ({ ...prev, services: updatedServices }))
  }

  const handleAddItem = (categoryIndex: number) => {
    const updatedServices = [...formData.services]
    const newItemIndex = updatedServices[categoryIndex].items.length
    // Add new item at the end instead of beginning to maintain correct numbering
    updatedServices[categoryIndex].items = [
      ...updatedServices[categoryIndex].items,
      { name: "", description: "", price: 0, image: "" },
    ]
    setFormData((prev) => ({ ...prev, services: updatedServices }))
    setExpandedItem({ categoryIndex, itemIndex: newItemIndex })
    setExpandedCategory(categoryIndex)

    // No need to shift image previews since we're adding at the end
    // The new item will automatically get the correct index
  }

  const handleRemoveItem = (categoryIndex: number, itemIndex: number) => {
    const updatedServices = [...formData.services]
    updatedServices[categoryIndex].items = updatedServices[categoryIndex].items.filter(
      (_, index) => index !== itemIndex
    )
    setFormData((prev) => ({ ...prev, services: updatedServices }))
    setExpandedItem(null)

    // Clean up image previews for the removed item and shift remaining ones
    setImagePreviews((prev) => {
      const newPreviews = { ...prev }
      const itemsLength = updatedServices[categoryIndex].items.length

      // Remove the preview for the deleted item
      delete newPreviews[`${categoryIndex}-${itemIndex}`]

      // Shift previews for items that come after the deleted one
      for (let i = itemIndex; i < itemsLength; i++) {
        const currentKey = `${categoryIndex}-${i + 1}`
        const newKey = `${categoryIndex}-${i}`
        if (newPreviews[currentKey]) {
          newPreviews[newKey] = newPreviews[currentKey]
          delete newPreviews[currentKey]
        }
      }

      return newPreviews
    })
  }

  const handleItemChange = (
    categoryIndex: number,
    itemIndex: number,
    field: keyof ServicesItem,
    value: string | number
  ) => {
    setFormData((prev) => {
      const newServices = prev.services.map((category, cIndex) => {
        if (cIndex !== categoryIndex) {
          return category
        }
        return {
          ...category,
          items: category.items.map((item, iIndex) => {
            if (iIndex !== itemIndex) {
              return item
            }
            return {
              ...item,
              [field]: value,
            }
          }),
        }
      })
      return { ...prev, services: newServices }
    })
  }

  const handleAddContact = () => {
    setFormData((prev) => ({
      ...prev,
      contact: [...prev.contact, { type: "", value: "" }],
    }))
  }

  const handleRemoveContact = (contactIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      contact: prev.contact.filter((_, index) => index !== contactIndex),
    }))
  }

  const handleContactChange = (index: number, field: keyof ContactInfo, value: string) => {
    const updatedContact = [...formData.contact]
    updatedContact[index] = { ...updatedContact[index], [field]: value }
    setFormData((prev) => ({ ...prev, contact: updatedContact }))
  }

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
  const [step2Error, setStep2Error] = useState<string>("")
  const [step3Error, setStep3Error] = useState<string>("")

  const isStepValid = (step: number): boolean => {
    if (step === 1) {
      // Check if there are any errors AND all required fields are filled
      const hasErrors = Object.keys(errors).length > 0
      const requiredFieldsFilled =
        !!formData.name.trim() &&
        !!formData.title?.trim() &&
        !!formData.currency?.trim() &&
        !!formData.theme?.trim()
      return !hasErrors && requiredFieldsFilled
    }
    if (step === 2) {
      if (formData.services.length === 0) return false
      return formData.services.every((category) => !!category.name.trim())
    }
    if (step === 3) {
      return formData.services.every((category) => category.items.length > 0)
    }
    if (step === 4) {
      // Logo is not required based on your request
      return true
    }
    return true
  }
  const validateStep = (step: number): boolean => {
    let newErrors: { [key: string]: string } = {}
    let isValid = true

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Service catalogue name is required."
      if (!formData.title?.trim()) newErrors.title = "Title is required."
      if (!formData.currency?.trim()) newErrors.currency = "Currency is required."
      if (!formData.theme?.trim()) newErrors.theme = "Theme is required."

      setErrors(newErrors)
      setTouched({ name: true, title: true, currency: true, theme: true })
      isValid = Object.keys(newErrors).length === 0
    }

    if (step === 2) {
      if (formData.services.length === 0) {
        setStep2Error("Please add at least one service category.")
        isValid = false
      } else {
        for (const category of formData.services) {
          if (!category.name.trim()) {
            setStep2Error("All service categories must have a name.")
            isValid = false
            break
          }
        }
      }
      if (isValid) setStep2Error("")
    }

    if (step === 3) {
      for (const category of formData.services) {
        if (category.items.length === 0) {
          setStep3Error(`Category "${category.name}" must have at least one service item.`)
          isValid = false
          break
        }
        for (const item of category.items) {
          if (!item.name.trim()) {
            setStep3Error(`All items in category "${category.name}" must have a name.`)
            isValid = false
            break
          }
          if (!item.description.trim()) {
            setStep3Error(`All items in category "${category.name}" must have a description.`)
            isValid = false
            break
          }
          if (item.price <= 0) {
            setStep3Error(
              `Price for item "${item.name}" in category "${category.name}" must be greater than 0.`
            )
            isValid = false
            break
          }
          if (category.layout !== "variant_3" && !item.image?.trim()) {
            setStep3Error(
              `Image for item "${item.name}" in category "${category.name}" is required for this layout.`
            )
            isValid = false
            break
          }
        }
        if (!isValid) break
      }
      if (isValid) setStep3Error("")
    }

    if (step === 4) {
      // Logo is not required based on your request
      setErrors({})
      setTouched({})
      isValid = true
    }

    return isValid
  }

  const handleInputChangeWithValidation = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target
    handleInputChange(e)
    if (errors[name] && value.trim()) {
      const newErrors = { ...errors }
      delete newErrors[name]
      setErrors(newErrors)
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Submitting form data:", formData)

    if (!validateStep(4)) {
      toast({
        title: "Validation Error",
        description: `Please complete all steps and ensure all fields are valid.`,
        variant: "destructive",
      })
      return
    }

    if (!user || !user.id) {
      toast({
        title: "Authentication Error",
        description: "You must be signed in to create or edit a service catalogue.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(true)

    try {
      const transformedFormData = { ...formData }
      const serviceCatalogueSlug = transformedFormData.name.toLowerCase().replace(/\s+/g, "-")

      // Transform services array back to object format for database storage
      const servicesArray: ServicesCategory[] = []
      transformedFormData.services.forEach((category) => {
        const categoryKey = category.name.toLowerCase().replace(/\s+/g, "-")
        servicesArray.push({
          name: categoryKey,
          order: category.order,
          layout: category.layout,
          items: category.items,
        })
      })

      const submissionData = {
        name: serviceCatalogueSlug,
        status: "active",
        theme: transformedFormData.theme,
        logo: transformedFormData.logo,
        title: transformedFormData.title,
        currency: transformedFormData.currency,
        contact: transformedFormData.contact,
        subtitle: transformedFormData.subtitle,
        services: servicesArray,
        partners: transformedFormData.partners,
        legal: transformedFormData.legal,
        configuration: transformedFormData.configuration,
        created_by: user.id,
      }

      console.log("Transformed form data:", submissionData)

      const method = type === "edit" ? "PATCH" : "POST"
      const response = await fetch("/api/items", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      })

      console.log("Response status:", response.status)

      if (response.ok) {
        const result = await response.json()
        console.log("Success result:", result)
        setServiceCatalogueUrl(`/catalogues/${serviceCatalogueSlug}`)
        setShowSuccessModal(true)
        if (onSuccess) onSuccess(`/catalogues/${serviceCatalogueSlug}`)
        if (type === "create") {
          setFormData(defaultServiceCatalogueData)
          setCurrentStep(1)
        }
      } else {
        const errorData = await response.json()
        console.error("Error response:", errorData)
        toast({
          title: "Error",
          description: `Failed to ${type === "edit" ? "edit" : "create"} service catalogue: ${errorData.error || "Unknown error"}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Error",
        description: `An error occurred while submitting the form.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1General
            formData={formData}
            handleInputChange={handleInputChangeWithValidation}
            setFormData={setFormData}
            errors={errors}
            touched={touched}
            setTouched={setTouched}
            setErrors={setErrors}
          />
        )
      case 2:
        return (
          <Step2Categories
            formData={formData}
            handleAddCategory={handleAddCategory}
            handleRemoveCategory={handleRemoveCategory}
            handleCategoryChange={handleCategoryChange}
            handleReorderCategories={handleReorderCategories}
            expandedCategory={expandedCategory}
            setExpandedCategory={setExpandedCategory}
          />
        )
      case 3:
        return (
          <Step3Services
            formData={formData}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            handleItemChange={handleItemChange}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
            expandedCategory={expandedCategory}
            setExpandedCategory={setExpandedCategory}
            expandedItem={expandedItem}
            setExpandedItem={setExpandedItem}
          />
        )
      case 4:
        return (
          <Step4Branding
            formData={formData}
            userData={userData}
            handleInputChange={handleInputChangeWithValidation}
            handleAddContact={handleAddContact}
            handleRemoveContact={handleRemoveContact}
            handleContactChange={handleContactChange}
            setFormData={setFormData}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-product-background/95 border border-product-border shadow-md rounded-3xl">
      <Card
        className="w-full h-full bg-transparent border-0 shadow-none rounded-none backdrop-blur-none"
        type="form">
        <CardHeader className="p-6 sm:p-8">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-product-foreground font-heading">
            {type === "edit" ? "Edit Service Catalogue" : "Create Service Catalogue"}
          </CardTitle>
          <CardDescription className="text-center text-product-foreground-accent text-base sm:text-lg mt-2 font-body">
            Step {currentStep} of 4:{" "}
            {currentStep === 1
              ? "General Information"
              : currentStep === 2
                ? "Service Categories"
                : currentStep === 3
                  ? "Service Items"
                  : "Branding & Contact"}
          </CardDescription>
          <div className="flex justify-center space-x-3 mt-6">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-10 h-2 rounded-full transition-all duration-300 ${currentStep === step ? "bg-product-primary shadow-product-shadow" : "bg-product-border"} cursor-pointer hover:bg-product-primary/80 hover:shadow-product-hover-shadow`}
                onClick={async () => {
                  if (step === currentStep) return
                  if (step < currentStep) {
                    setCurrentStep(step)
                  } else {
                    let valid = true
                    for (let s = 1; s < step; s++) {
                      if (!validateStep(s)) {
                        valid = false
                        setCurrentStep(s)
                        break
                      }
                    }
                    if (valid) setCurrentStep(step)
                  }
                }}
                title={`Go to step ${step}`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-4 pt-0">
          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStep()}
            {currentStep === 2 && step2Error && (
              <div className="text-red-500 text-center mt-4 p-3 bg-red-50 border border-red-200 rounded-lg font-body">
                {step2Error}
              </div>
            )}
            {currentStep === 3 && step3Error && (
              <div className="text-red-500 text-center mt-4 p-3 bg-red-50 border border-red-200 rounded-lg font-body">
                {step3Error}
              </div>
            )}
            <div className="flex justify-between mt-8 pt-6 border-t border-product-border">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="px-6 py-3 text-base font-medium">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Previous
                </Button>
              )}
              {currentStep < 4 && (
                <Button
                  type="button"
                  onClick={handleNext}
                  className={`ml-auto px-6 py-3 text-base font-medium ${!isStepValid(currentStep) || isUploading ? "bg-product-border text-product-foreground-accent hover:bg-product-border cursor-not-allowed" : "bg-product-primary hover:bg-product-primary-accent hover:shadow-product-hover-shadow hover:scale-[1.02] hover:transform hover:-translate-y-1"}`}
                  disabled={!isStepValid(currentStep) || isUploading}>
                  Next <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              {currentStep === 4 && (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center px-8 py-3 text-base font-semibold bg-product-primary hover:bg-product-primary-accent hover:shadow-product-hover-shadow hover:scale-[1.02] hover:transform hover:-translate-y-1 transition-all duration-300">
                  {type === "edit" ? (
                    <Edit className="h-5 w-5 mr-2" />
                  ) : (
                    <Plus className="h-5 w-5 mr-2" />
                  )}
                  {isSubmitting
                    ? type === "edit"
                      ? "Saving..."
                      : "Creating..."
                    : type === "edit"
                      ? "Save Changes"
                      : "Create Service Catalogue"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          catalogueUrl={serviceCatalogueUrl}
        />
      </Card>
    </div>
  )
}
export default ServicesForm
