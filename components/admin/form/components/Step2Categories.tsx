"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { layouts } from "@/constants/client"
import { ServicesCategory } from "@/types"
import { Plus, Trash2 } from "lucide-react"
import * as React from "react"
import { TbCategory } from "react-icons/tb"

interface Step2ServicesSectionsProps {
  formData: {
    services: ServicesCategory[]
  }
  handleAddCategory: () => void
  handleRemoveCategory: (index: number) => void
  handleCategoryChange: (index: number, field: "name" | "layout", value: string) => void
}

const Step2ServicesSections: React.FC<Step2ServicesSectionsProps> = ({
  formData,
  handleAddCategory,
  handleRemoveCategory,
  handleCategoryChange,
}) => {
  return (
    <Card
      className="space-y-8 p-6 sm:p-8 bg-white/95 border border-product-border shadow-product-shadow rounded-2xl"
      type="form">
      <h2
        className="text-2xl sm:text-3xl font-bold text-product-foreground flex items-center gap-3"
        style={{ fontFamily: "var(--font-playfair-display), var(--font-inter), serif" }}>
        <TbCategory className="text-product-primary" size={32} />
        Add Categories
      </h2>
      <Button
        type="button"
        onClick={handleAddCategory}
        className="px-6 py-3 text-base font-medium bg-product-primary hover:bg-product-primary-accent hover:shadow-product-hover-shadow hover:scale-[1.02] hover:transform hover:-translate-y-1 transition-all duration-300">
        <Plus className="h-5 w-5 mr-2" /> Add New Category
      </Button>

      {formData.services.map((category, categoryIndex) => (
        <Card
          key={categoryIndex}
          className="space-y-6 p-6 sm:p-8 bg-product-background/50 border border-product-border shadow-product-shadow rounded-xl"
          type="form">
          <div className="flex justify-between items-center mb-6">
            <h3
              className="text-xl font-bold text-product-foreground"
              style={{ fontFamily: "var(--font-playfair-display), var(--font-inter), serif" }}>
              Category {categoryIndex + 1}
            </h3>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveCategory(categoryIndex)}
              className="h-10 w-10 hover:bg-red-600 hover:shadow-product-hover-shadow">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <Label
              htmlFor={`category-name-${categoryIndex}`}
              className="text-product-foreground font-medium"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Category Name
            </Label>
            <Input
              id={`category-name-${categoryIndex}`}
              type="text"
              placeholder="e.g., Breakfast, Main Courses"
              value={category.name}
              onChange={(e) => handleCategoryChange(categoryIndex, "name", e.target.value)}
              className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
              required
            />
          </div>
          {/* Layout Selection for this category */}
          <div className="space-y-4">
            <Label
              htmlFor={`category-layout-${categoryIndex}`}
              className="text-product-foreground font-medium text-lg"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Layout: {layouts.find((l) => l.key === category.layout)?.label || "Not Selected"}
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {layouts.map((layoutOption) => (
                <div
                  key={layoutOption.key}
                  className={`relative cursor-pointer rounded-xl border-2 p-2 transition-all duration-200 hover:shadow-product-hover-shadow ${
                    category.layout === layoutOption.key
                      ? "border-product-primary shadow-product-shadow bg-product-primary/5"
                      : "border-product-border hover:border-product-primary/50"
                  }`}
                  onClick={() => handleCategoryChange(categoryIndex, "layout", layoutOption.key)}>
                  <img
                    src={layoutOption.image}
                    alt={layoutOption.label}
                    className="w-full h-fit object-cover object-top rounded-lg"
                  />
                  <p
                    className="text-center text-sm mt-2 font-medium text-product-foreground"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    {layoutOption.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </Card>
  )
}

export default Step2ServicesSections
