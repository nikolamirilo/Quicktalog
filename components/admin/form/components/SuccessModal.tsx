"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { QRCodeSVG } from "qrcode.react"
import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import { FaCode } from "react-icons/fa6"
import { ImEmbed2 } from "react-icons/im"
import { IoMdOpen } from "react-icons/io"
import { IoQrCode, IoShareSocialOutline } from "react-icons/io5"
import { MdContentCopy } from "react-icons/md"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  restaurantUrl: string
  type?: "regular" | "ai"
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  restaurantUrl,
  type = "regular",
}) => {
  const [fullURL, setFullURL] = useState("")
  const router = useRouter()
  const codeRef = useRef<HTMLDivElement>(null)
  const iframeCode = `<iframe src="${fullURL}" style="width:100vw;height:100vh;border:none;position:fixed;top:0;left:0;z-index:9999;background:#fff;"></iframe>`

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(iframeCode)
    if (codeRef.current) {
      codeRef.current.classList.add("ring-2", "ring-product-primary")
      setTimeout(() => codeRef.current?.classList.remove("ring-2", "ring-product-primary"), 1000)
    }
  }

  const handleDownloadPng = () => {
    const svg = document.querySelector("#success-modal-qr svg")
    if (!svg) {
      console.error("QR SVG not found!")
      return
    }
    // Clone the SVG node to avoid React/DOM issues
    const clone = svg.cloneNode(true) as SVGSVGElement
    // Set width/height attributes for clarity
    clone.setAttribute("width", "512")
    clone.setAttribute("height", "512")
    // Serialize the SVG
    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(clone)
    // Create a Blob from the SVG
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const img = new window.Image()
    img.onload = function () {
      const canvas = document.createElement("canvas")
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext("2d")
      ctx!.fillStyle = "#fff"
      ctx!.fillRect(0, 0, canvas.width, canvas.height)
      ctx!.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Failed to create PNG blob from canvas!")
          return
        }
        const url2 = URL.createObjectURL(blob)
        const a = document.createElement("a")
        const restaurantName = restaurantUrl.split("/")[2]
        a.download = `${restaurantName}.png`
        a.href = url2
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url2)
        URL.revokeObjectURL(url)
      }, "image/png")
    }
    img.onerror = function () {
      console.error("Failed to load SVG as image!")
      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  useEffect(() => {
    setFullURL(`${window.location.origin}${restaurantUrl}`)
  }, [restaurantUrl])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-x-auto w-full !p-8 bg-white/95 border border-product-border shadow-product-shadow rounded-3xl">
        <DialogHeader className="flex flex-col space-y-4">
          <div className="flex flex-row gap-3 items-center justify-center">
            <FaCheckCircle size={32} className="text-green-500" />
            <DialogTitle
              className="text-2xl sm:text-3xl font-bold text-product-foreground font-heading">
              🎉 Congratulations!
            </DialogTitle>
          </div>
          <DialogDescription
            className="text-center text-product-foreground-accent text-lg font-body">
            {type == "ai"
              ? "Your AI-generated Service Catalogue is now live and ready to share with your customers."
              : "Your Service Catalogue is now live and ready to share with your customers."}
          </DialogDescription>
        </DialogHeader>

        {/* QR Code Section */}
        <div className="flex flex-col items-center gap-4 w-full p-6 bg-product-background/50 rounded-2xl border border-product-border">
          <h4
            className="flex flex-row gap-2 items-center text-lg font-semibold text-product-foreground font-body">
            <IoShareSocialOutline size={28} className="text-product-primary" />
            Share instantly
          </h4>
          <p
            className="text-product-foreground-accent text-center font-body">
            Use the QR code below for quick access
          </p>
          <div
            id="success-modal-qr"
            className="p-4 bg-product-background rounded-xl shadow-product-shadow border border-product-border">
            <QRCodeSVG value={fullURL} size={180} bgColor="#fff" fgColor="#000" />
          </div>
          <div className="flex flex-row mt-2 w-full justify-center">
            <Button
              className="px-6 py-3 text-base font-medium bg-product-primary hover:bg-product-primary-accent hover:shadow-product-hover-shadow hover:scale-[1.02] hover:transform hover:-translate-y-1 transition-all duration-300"
              onClick={handleDownloadPng}>
              <IoQrCode size={22} /> Download QR code
            </Button>
          </div>
        </div>

        {/* Embeddable Iframe Section */}
        <div className="text-product-foreground w-full space-y-4">
          <h4
            className="flex flex-row gap-2 items-center text-lg font-semibold text-product-foreground font-body">
            <ImEmbed2 size={28} className="text-product-primary" />
            Embed Anywhere
          </h4>
          <p
            className="text-product-foreground-accent font-body">
            Copy the code to add to your website
          </p>
          <div
            ref={codeRef}
            className="bg-[#1e1e1e] rounded-xl p-4 text-xs overflow-x-auto font-[Fira_Mono,JetBrains_Mono,Source_Code_Pro,monospace] border border-[#333] shadow-product-shadow mb-4 transition-all duration-200"
            style={{
              fontFamily: "Fira Mono, JetBrains Mono, Source Code Pro, monospace",
              color: "#d4d4d4",
              lineHeight: "1.6",
              minWidth: 0,
            }}>
            <pre
              className="whitespace-pre-wrap break-all m-0"
              style={{ background: "none", padding: 0, margin: 0 }}>
              {iframeCode}
            </pre>
          </div>
          <div className="flex flex-row gap-3 w-full justify-center">
            <Button
              onClick={handleCopyCode}
              className="px-6 py-3 text-base font-medium bg-product-primary hover:bg-product-primary-accent hover:shadow-product-hover-shadow hover:scale-[1.02] hover:transform hover:-translate-y-1 transition-all duration-300">
              <MdContentCopy size={22} /> Copy code
            </Button>
            <Button
              onClick={() => {
                const html = `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>Embedded Catalogue</title>\n  <style>\n    html, body { margin: 0; padding: 0; height: 100%; width: 100%; background: #fff; }\n    iframe { width: 100vw; height: 100vh; border: none; position: fixed; top: 0; left: 0; z-index: 9999; background: #fff; }\n  </style>\n</head>\n<body>\n  <iframe src=\"${fullURL}\"></iframe>\n</body>\n</html>`
                const blob = new Blob([html], { type: "text/html" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                const restaurantName = restaurantUrl.split("/")[2]
                a.download = `${restaurantName}.html`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
              }}
              variant="outline"
              className="px-6 py-3 text-base font-medium border-product-border text-product-foreground hover:bg-product-background hover:border-product-primary transition-all duration-300">
              <FaCode size={22} /> Download full HTML code
            </Button>
          </div>
        </div>

        <DialogFooter className="flex flex-row gap-3 pt-6 border-t border-product-border">
          <Button
            className="px-6 py-3 text-base font-medium border-product-border text-product-foreground hover:bg-product-background hover:border-product-primary transition-all duration-300"
            variant="outline"
            onClick={() => {
              window.open(fullURL, "_blank")
            }}>
            <IoMdOpen size={22} /> Visit
          </Button>
          <Button
            onClick={onClose}
            variant="destructive"
            className="px-6 py-3 text-base font-medium hover:bg-red-600 transition-all duration-300">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessModal
