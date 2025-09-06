"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { layouts } from "@/constants"
import type { Step2ServicesSectionsProps } from "@/types/components"
import { ChevronDown, GripVertical, Plus, Trash2 } from "lucide-react"
import * as React from "react"
import { TbCategory } from "react-icons/tb"

const Step2ServicesSections: React.FC<Step2ServicesSectionsProps> = ({
  formData,
  handleAddCategory,
  handleRemoveCategory,
  handleCategoryChange,
  handleReorderCategories,
  expandedCategory,
  setExpandedCategory,
}) => {
  const [draggedItem, setDraggedItem] = React.useState<number | null>(null)
  const [dragOverItem, setDragOverItem] = React.useState<number | null>(null)

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItem(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    setDragOverItem(index)
  }

  const handleDragLeave = () => {
    setDragOverItem(null)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault()

    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null)
      setDragOverItem(null)
      return
    }

    const newServices = [...formData.services]
    const draggedCategory = newServices[draggedItem]

    // Remove the dragged item
    newServices.splice(draggedItem, 1)

    // Insert it at the new position
    newServices.splice(dropIndex, 0, draggedCategory)

    // Update order values
    const reorderedServices = newServices.map((category, index) => ({
      ...category,
      order: index,
    }))

    // Call the reorder handler if provided
    if (handleReorderCategories) {
      handleReorderCategories(reorderedServices)
    }

    setDraggedItem(null)
    setDragOverItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverItem(null)
  }

  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index)
  }

  return (
    <Card
      className="space-y-8 p-4 sm:p-8 bg-product-background/95 border-0 sm:border border-product-border shadow-product-shadow rounded-2xl"
      type="form">
      <h2 className="text-2xl sm:text-3xl font-bold text-product-foreground flex items-center gap-3 font-heading">
        <TbCategory className="text-product-primary" size={32} />
        Add Categories
      </h2>

      {formData.services.length > 0 && (
        <div className="text-sm text-product-foreground-accent font-body mb-4">
          💡 Tip: Drag and drop categories using the grip handle to reorder them
        </div>
      )}

      {formData.services.map((category, categoryIndex) => (
        <div
          key={`category-${categoryIndex}-${category.order || categoryIndex}`}
          draggable
          onDragStart={(e) => handleDragStart(e, categoryIndex)}
          onDragOver={(e) => handleDragOver(e, categoryIndex)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, categoryIndex)}
          onDragEnd={handleDragEnd}
          className={`transition-all duration-200 ${
            draggedItem === categoryIndex ? "opacity-50 scale-95" : "opacity-100 scale-100"
          } ${
            dragOverItem === categoryIndex && draggedItem !== categoryIndex
              ? "transform scale-105 shadow-lg"
              : ""
          }`}>
          <Card
            className={`bg-product-background/50 bg-product-background border border-product-border shadow-product-shadow rounded-xl cursor-move ${
              dragOverItem === categoryIndex && draggedItem !== categoryIndex
                ? "border-product-primary border-2 bg-product-primary/5"
                : ""
            }`}
            type="form">
            <div
              className="flex justify-between items-center p-6 cursor-pointer"
              onClick={() => toggleCategory(categoryIndex)}>
              <div className="flex items-center gap-3">
                <div
                  className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-product-border/50 transition-colors"
                  onMouseDown={(e) => e.stopPropagation()}>
                  <GripVertical className="h-5 w-5 text-product-foreground-accent" />
                </div>
                <h3 className="text-xl font-bold text-product-foreground font-heading">
                  Category: {category.name || `Category ${categoryIndex + 1}`}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveCategory(categoryIndex)
                  }}
                  className="h-10 w-10 hover:bg-red-600 hover:shadow-product-hover-shadow">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <ChevronDown
                  className={`h-6 w-6 text-product-foreground-accent transition-transform duration-300 ${
                    expandedCategory === categoryIndex ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            {expandedCategory === categoryIndex && (
              <div className="p-6 pt-0 space-y-6">
                <div className="space-y-3">
                  <Label
                    htmlFor={`category-name-${categoryIndex}`}
                    className="text-product-foreground font-medium font-body">
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
                    className="text-product-foreground font-medium text-lg font-body">
                    Layout:{" "}
                    {layouts.find((l) => l.key === category.layout)?.label || "Not Selected"}
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
                        onClick={() =>
                          handleCategoryChange(categoryIndex, "layout", layoutOption.key)
                        }>
                        <img
                          src={layoutOption.image}
                          alt={layoutOption.label}
                          className="w-full h-fit object-cover object-top rounded-lg"
                        />
                        <p className="text-center text-sm mt-2 font-medium text-product-foreground font-body">
                          {layoutOption.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      ))}

      <Button
        type="button"
        onClick={handleAddCategory}
        className="px-6 py-3 text-base font-medium bg-product-primary hover:bg-product-primary-accent hover:shadow-product-hover-shadow hover:scale-[1.02] hover:transform hover:-translate-y-1 transition-all duration-300">
        <Plus className="h-5 w-5 mr-2" /> Add New Category
      </Button>
    </Card>
  )
}

export default Step2ServicesSections
