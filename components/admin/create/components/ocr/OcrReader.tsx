"use client"
import { logOcrUsage } from "@/actions/usage"
import SuccessModal from "@/components/modals/SuccessModal"
import { Button } from "@/components/ui/button"
import { LANGUAGE_OPTIONS } from "@/constants/ocr"
import { toast } from "@/hooks/use-toast"
import { detectLanguage, getLanguageParameters, preprocessImage } from "@/utils/ocr"
import { revalidateData } from "@/utils/server"
import { useState } from "react"
import { createWorker, OEM } from "tesseract.js"
import { LanguageSelector } from "./LanguageSelector"

const OcrReader = ({ formData }) => {
  const [ocrResult, setOcrResult] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [processedImageUrl, setProcessedImageUrl] = useState<string>("")
  const [ocrStatus, setOcrStatus] = useState<string>("")
  const [confidence, setConfidence] = useState<number>(0)
  const [selectedLanguage, setSelectedLanguage] = useState<string>("auto")
  const [detectedLanguage, setDetectedLanguage] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serviceCatalogueUrl, setServiceCatalogueUrl] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0])
      setOcrResult("")
      setOcrStatus("")
      setProcessedImageUrl("")
      setConfidence(0)
      setDetectedLanguage("")
    }
  }

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value)
  }

  const handleSubmit = async (extractedText: string) => {
    if (!extractedText.trim()) return

    setIsSubmitting(true)
    setServiceCatalogueUrl("")

    console.log({ ocr_text: extractedText, formData: formData })

    try {
      const response = await fetch("/api/items/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ocr_text: extractedText, formData: formData }),
      })

      if (response.ok) {
        const { restaurantUrl } = await response.json()
        setServiceCatalogueUrl(restaurantUrl)
        setShowSuccessModal(true)
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
        description: "An error occurred while processing the extracted text.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      revalidateData()
    }
  }

  const readImageText = async () => {
    if (!selectedImage) return

    setOcrStatus("Preprocessing image with advanced filters...")
    try {
      const preprocessedBlob = await preprocessImage(selectedImage)

      if (!preprocessedBlob) {
        setOcrStatus("Image preprocessing failed. Please try another image.")
        return
      }

      const processedUrl = URL.createObjectURL(preprocessedBlob)
      setProcessedImageUrl(processedUrl)

      const imageToProcess = new File([preprocessedBlob], "processed-image.png", {
        type: "image/png",
      })

      // Determine which language to use
      let languageToUse = selectedLanguage

      // Handle Serbian Latin script mapping
      if (selectedLanguage === "srp_latn") {
        // Use Croatian model for Serbian Latin script (they're very similar)
        languageToUse = "hrv"
      }

      if (selectedLanguage === "auto") {
        setOcrStatus("Auto-detecting language...")
        // First pass with English to get some text for detection
        const quickWorker = await createWorker("eng")
        const quickResult = await quickWorker.recognize(imageToProcess)
        await quickWorker.terminate()

        const detectedLang = detectLanguage(quickResult.data.text)
        setDetectedLanguage(detectedLang)
        languageToUse = detectedLang
        setOcrStatus(
          `Detected language: ${LANGUAGE_OPTIONS.find((lang) => lang.code === detectedLang)?.name || "Unknown"}`
        )
      }

      setOcrStatus(
        `Initializing OCR worker for ${
          selectedLanguage === "auto"
            ? LANGUAGE_OPTIONS.find((lang) => lang.code === languageToUse)?.name || languageToUse
            : LANGUAGE_OPTIONS.find((lang) => lang.code === selectedLanguage)?.name ||
              selectedLanguage
        }...`
      )

      const worker = await createWorker(languageToUse, OEM.LSTM_ONLY, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setOcrStatus(`Analyzing text: ${(m.progress * 100).toFixed(0)}%`)
          } else {
            setOcrStatus(`OCR Status: ${m.status}`)
          }
        },
      })

      // Apply language-specific parameters
      const languageParams = getLanguageParameters(languageToUse)
      await worker.setParameters(languageParams)

      setOcrStatus("Performing advanced OCR analysis...")

      const {
        data: { text, confidence: ocrConfidence },
      } = await worker.recognize(imageToProcess)

      setOcrResult(text)
      setConfidence(ocrConfidence)

      // Show the language that was actually selected by the user, not the internal mapping
      const displayLanguage = selectedLanguage === "auto" ? languageToUse : selectedLanguage
      const langName =
        LANGUAGE_OPTIONS.find((lang) => lang.code === displayLanguage)?.name || displayLanguage
      setOcrStatus(`OCR Completed (${langName})! Confidence: ${ocrConfidence.toFixed(1)}%`)

      const res = await logOcrUsage()
      if (res) {
        console.log("Usage assigned successfully.")
        await worker.terminate()
      }

      // Automatically send extracted text to OCR API
      await handleSubmit(text)
    } catch (error) {
      console.error("Error during OCR recognition:", error)
      setOcrStatus("Error occurred during OCR processing. Please try again.")
    }
  }

  const handleCloseModal = () => setShowSuccessModal(false)

  return (
    <>
      <div className="flex flex-col items-center text-product-foreground min-h-screen">
        {/* Language Selection */}
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          detectedLanguage={detectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />

        <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8 items-center w-full max-w-lg">
          <label
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-product-primary text-product-secondary font-semibold text-center cursor-pointer
                          transition-all duration-300 ease-in-out hover:bg-product-primary-accent hover:shadow-md hover:scale-105
                          focus-within:outline-none focus-within:ring-2 focus-within:ring-product-primary-accent focus-within:ring-opacity-50">
            Upload from Gallery
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          <label
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-product-secondary text-product-primary font-semibold text-center cursor-pointer
                          transition-all duration-300 ease-in-out hover:bg-blue-800 hover:shadow-md hover:scale-105
                          focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-opacity-50">
            Open Camera App
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {selectedImage && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full max-w-4xl">
            <div className="p-4 rounded-xl border border-product-border bg-hero-product-background shadow-product">
              <h3 className="text-lg font-semibold mb-3 text-product-foreground">Original Image</h3>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Original content"
                className="max-w-full h-auto rounded-lg"
              />
            </div>

            {processedImageUrl && (
              <div className="p-4 rounded-xl border border-product-border bg-hero-product-background shadow-product">
                <h3 className="text-lg font-semibold mb-3 text-product-foreground">
                  Processed Image
                </h3>
                <img
                  src={processedImageUrl}
                  alt="Processed content"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}
          </div>
        )}

        <div className="mb-8">
          <Button
            onClick={readImageText}
            disabled={
              !selectedImage ||
              ocrStatus.includes("Processing") ||
              ocrStatus.includes("Initializing") ||
              ocrStatus.includes("Analyzing") ||
              isSubmitting
            }
            variant="file-action"
            className={
              selectedImage &&
              !ocrStatus.includes("Processing") &&
              !ocrStatus.includes("Initializing") &&
              !ocrStatus.includes("Analyzing") &&
              !isSubmitting
                ? "bg-product-primary text-product-secondary hover:bg-product-primary-accent hover:shadow-product-hover hover:scale-105 cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }>
            {isSubmitting ? "Creating Catalogue..." : "Extract Text & Create Catalogue"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <div className="p-6 rounded-xl border border-product-border bg-hero-product-background shadow-product">
            <h3 className="font-bold text-xl mb-4 text-product-foreground flex items-center gap-2">
              Analysis Status
              {confidence > 0 && (
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    confidence > 80
                      ? "bg-green-100 text-green-800"
                      : confidence > 60
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}>
                  {confidence.toFixed(1)}% confidence
                </span>
              )}
            </h3>
            <p className="text-product-foreground-accent">
              {isSubmitting
                ? "Creating service catalogue from extracted text..."
                : ocrStatus || "Ready to process image"}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-product-border bg-hero-product-background shadow-product">
            <h3 className="font-bold text-xl mb-4 text-product-secondary">Extracted Text</h3>
            <div className="border border-product-border bg-hero-product-background p-4 rounded-lg text-left text-product-foreground-accent break-words whitespace-pre-wrap min-h-[150px] max-h-[400px] overflow-auto">
              {ocrResult ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: ocrResult
                      .replace(/\n/g, "<br />")
                      .replace(/[=,—,+,_]{2,}/g, " ")
                      .replace(/\s+/g, " ")
                      .trim(),
                  }}
                />
              ) : (
                <span className="text-product-foreground-accent opacity-60 italic">
                  Extracted text will appear here...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        restaurantUrl={serviceCatalogueUrl}
        type="ai"
      />
    </>
  )
}

export default OcrReader
