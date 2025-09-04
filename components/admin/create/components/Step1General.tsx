"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { currencies, themes } from "@/constants"
import type { Step1GeneralProps } from "@/types/components"
import { FileText } from "lucide-react"
import * as React from "react"

const Step1General: React.FC<Step1GeneralProps> = ({
  formData,
  handleInputChange,
  setFormData,
  errors = {},
  touched = {},
}) => {
  const handleThemeChange = (value: string) => {
    setFormData((prev: any) => ({ ...prev, theme: value }))
  }

  const handleCurrencyChange = (value: string) => {
    setFormData((prev: any) => ({ ...prev, currency: value }))
  }

  return (
    <Card
      className="space-y-8 p-4 sm:p-8 bg-product-background/95 border-0 sm:border border-product-border shadow-md rounded-2xl"
      type="form">
      <h2 className="text-2xl sm:text-3xl font-bold text-product-foreground flex items-center gap-3 font-heading">
        <FileText className="text-product-primary" size={28} />
        General Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-product-foreground font-medium font-body">
            Name<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Five Guys"
            className="border-product-border focus:border-product-primary focus:ring-product-primary/20 text-sm sm:text-base"
            required
          />
          {touched?.name && errors?.name && (
            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded-lg font-body">
              {errors.name}
            </div>
          )}
        </div>
        <div className="space-y-3">
          <Label htmlFor="title" className="text-product-foreground font-medium font-body">
            Title<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="title"
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleInputChange}
            placeholder="e.g., Our Delicious Offerings"
            className="border-product-border focus:border-product-primary focus:ring-product-primary/20 text-sm sm:text-base"
          />
          {touched?.title && errors?.title && (
            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded-lg font-body">
              {errors.title}
            </div>
          )}
        </div>
        <div className="space-y-3">
          <Label htmlFor="subtitle" className="text-product-foreground font-medium font-body">
            Subtitle
          </Label>
          <Textarea
            id="subtitle"
            name="subtitle"
            value={formData.subtitle || ""}
            onChange={handleInputChange}
            placeholder="A short tagline or description"
            className="h-32 border-product-border focus:border-product-primary focus:ring-product-primary/20 text-sm sm:text-base"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="currency" className="text-product-foreground font-medium font-body">
            Currency (e.g., USD, EUR)<span className="text-red-500 ml-1">*</span>
          </Label>
          <Select value={formData.currency || ""} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="border-product-border focus:border-product-primary focus:ring-product-primary/20">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {touched?.currency && errors?.currency && (
            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded-lg font-body">
              {errors.currency}
            </div>
          )}
        </div>
        {/* Theme Selection */}
        <div className="space-y-4 col-span-full">
          <Label htmlFor="theme" className="text-product-foreground font-medium text-lg font-body">
            Theme<span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-4">
            {themes.map((themeOption) => (
              <div
                key={themeOption.key}
                className={`relative cursor-pointer rounded-xl border-2 p-2 transition-all duration-200 hover:shadow-product-hover-shadow ${
                  formData.theme === themeOption.key
                    ? "border-product-primary shadow-product-shadow bg-product-primary/5"
                    : "border-product-border hover:border-product-primary/50"
                }`}
                onClick={() => handleThemeChange(themeOption.key)}>
                <img
                  src={themeOption.image}
                  alt={themeOption.label}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <p className="text-center text-sm mt-2 font-medium text-product-foreground font-body">
                  {themeOption.label}
                </p>
              </div>
            ))}
          </div>
          {touched?.theme && errors?.theme && (
            <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded-lg font-body">
              {errors.theme}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default Step1General
