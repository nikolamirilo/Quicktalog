//@ts-nocheck
"use client"
import ImageDropzone from "@/components/common/ImageDropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Step3ServicesProps } from "@/types/components"
import { ChevronDown, Plus, Trash2 } from "lucide-react"
import React from "react"
import { IoClose } from "react-icons/io5"
import { MdOutlineLocalOffer } from "react-icons/md"

const Step3Services: React.FC<Step3ServicesProps> = ({
  formData,
  handleAddItem,
  handleRemoveItem,
  handleItemChange,
  imagePreviews,
  setImagePreviews,
  isUploading,
  setIsUploading,
  expandedCategory,
  setExpandedCategory,
  expandedItem,
  setExpandedItem,
}) => {
  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index)
    setExpandedItem(null) // Collapse items when category changes
  }

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const currentExpanded = expandedItem
    if (
      currentExpanded?.categoryIndex === categoryIndex &&
      currentExpanded?.itemIndex === itemIndex
    ) {
      setExpandedItem(null)
    } else {
      setExpandedItem({ categoryIndex, itemIndex })
    }
  }

  return (
    <Card
      className="space-y-8 p-4 sm:p-8 bg-product-background/95 border-0 sm:border border-product-border shadow-product-shadow rounded-2xl"
      type="form">
      <h2 className="text-2xl sm:text-3xl font-bold text-product-foreground flex items-center gap-3 font-heading">
        <MdOutlineLocalOffer className="text-product-primary" size={32} />
        Add Services
      </h2>
      {formData.services.length === 0 ? (
        <div className="text-center p-8 bg-product-background/50 rounded-xl border border-product-border">
          <p className="text-product-foreground-accent text-lg font-body">
            Please add categories in Step 2 first.
          </p>
        </div>
      ) : (
        formData.services.map((category, categoryIndex) => (
          <Card
            key={categoryIndex}
            className="shadow-product-shadow bg-product-background/50 border border-product-border rounded-xl"
            type="form">
            <div
              className="flex justify-between items-center p-6 cursor-pointer"
              onClick={() => toggleCategory(categoryIndex)}>
              <h3 className="text-xl font-bold text-product-foreground font-heading">
                Category: {category.name || "Unnamed Category"}
              </h3>
              <ChevronDown
                className={`h-6 w-6 text-product-foreground-accent transition-transform duration-300 ${
                  expandedCategory === categoryIndex ? "rotate-180" : ""
                }`}
              />
            </div>

            {expandedCategory === categoryIndex && (
              <div className="p-6 pt-0 space-y-6">
                {category.items.map((item, itemIndex) => {
                  const isExpanded =
                    expandedItem?.categoryIndex === categoryIndex &&
                    expandedItem?.itemIndex === itemIndex
                  return (
                    <Card
                      key={itemIndex}
                      className="border border-product-border shadow-product-shadow bg-product-background rounded-xl">
                      <div
                        className="flex justify-between items-center p-6 cursor-pointer"
                        onClick={() => toggleItem(categoryIndex, itemIndex)}>
                        <h5 className="text-lg font-bold text-product-foreground font-body">
                          {item.name || `Item ${itemIndex + 1}`}
                        </h5>
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemoveItem(categoryIndex, itemIndex)
                            }}
                            className="h-10 w-10 hover:bg-red-600 hover:shadow-product-hover-shadow">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <ChevronDown
                            className={`h-6 w-6 text-product-foreground-accent transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label
                              htmlFor={`item-name-${categoryIndex}-${itemIndex}`}
                              className="text-product-foreground font-medium font-body">
                              Item Name
                            </Label>
                            <Input
                              id={`item-name-${categoryIndex}-${itemIndex}`}
                              type="text"
                              placeholder="e.g., Pancakes"
                              value={item.name}
                              onChange={(e) =>
                                handleItemChange(categoryIndex, itemIndex, "name", e.target.value)
                              }
                              className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
                              required
                            />
                          </div>
                          <div className="space-y-3">
                            <Label
                              htmlFor={`item-price-${categoryIndex}-${itemIndex}`}
                              className="text-product-foreground font-medium font-body">
                              Price
                            </Label>
                            <Input
                              id={`item-price-${categoryIndex}-${itemIndex}`}
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              value={item.price || ""}
                              onChange={(e) =>
                                handleItemChange(
                                  categoryIndex,
                                  itemIndex,
                                  "price",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
                              required
                            />
                          </div>
                          <div className="space-y-3 col-span-full">
                            <Label
                              htmlFor={`item-description-${categoryIndex}-${itemIndex}`}
                              className="text-product-foreground font-medium font-body">
                              Description
                            </Label>
                            <Textarea
                              id={`item-description-${categoryIndex}-${itemIndex}`}
                              placeholder="Describe the dish, ingredients, etc."
                              value={item.description}
                              onChange={(e) =>
                                handleItemChange(
                                  categoryIndex,
                                  itemIndex,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={3}
                              className="border-product-border focus:border-product-primary focus:ring-product-primary/20"
                              required
                            />
                          </div>
                          {category.layout !== "variant_3" && (
                            <div className="space-y-3 col-span-full">
                              <Label
                                htmlFor={`item-image-${categoryIndex}-${itemIndex}`}
                                className="text-product-foreground font-medium font-body">
                                Image
                              </Label>
                              {imagePreviews[`${categoryIndex}-${itemIndex}`] || item.image ? (
                                <div className="relative mt-2 w-48 h-48 rounded-lg border-2 border-product-border overflow-hidden flex items-center justify-center bg-product-background shadow-product-shadow">
                                  <div
                                    className="absolute inset-0 bg-center bg-cover bg-no-repeat w-full h-full"
                                    style={{
                                      backgroundImage: `url('${imagePreviews[`${categoryIndex}-${itemIndex}`] || item.image}')`,
                                      objectFit: "cover",
                                    }}
                                  />
                                  <IoClose
                                    size={25}
                                    className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600 transition-colors duration-200 shadow-lg"
                                    onClick={() => {
                                      setImagePreviews((prev) => {
                                        const newPreviews = { ...prev }
                                        delete newPreviews[`${categoryIndex}-${itemIndex}`]
                                        return newPreviews
                                      })
                                      handleItemChange(categoryIndex, itemIndex, "image", "")
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="cursor-pointer h-48">
                                  <ImageDropzone
                                    onUploadStart={() => setIsUploading(true)}
                                    onUploadComplete={(url) => {
                                      handleItemChange(categoryIndex, itemIndex, "image", url)
                                      setImagePreviews((prev) => ({
                                        ...prev,
                                        [`${categoryIndex}-${itemIndex}`]: url,
                                      }))
                                      setIsUploading(false)
                                    }}
                                    onError={(error) => {
                                      alert(`ERROR! ${error.message}`)
                                      setIsUploading(false)
                                    }}
                                    maxDim={512}
                                    maxSizeMB={1}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  )
                })}

                <Button
                  type="button"
                  onClick={() => handleAddItem(categoryIndex)}
                  disabled={isUploading}
                  className="px-6 py-3 text-base font-medium bg-product-primary hover:bg-product-primary-accent hover:shadow-product-hover-shadow hover:scale-[1.02] hover:transform hover:-translate-y-1 transition-all duration-300">
                  <Plus className="h-5 w-5 mr-2" /> Add New Item to{" "}
                  {category.name || "this Category"}
                </Button>
              </div>
            )}
          </Card>
        ))
      )}
    </Card>
  )
}

export default Step3Services
