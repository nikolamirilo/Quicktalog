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
import { QRCodeSVG } from "qrcode.react"
import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { FaCode } from "react-icons/fa6"
import { ImEmbed2 } from "react-icons/im"
import { IoMdCheckmark, IoMdOpen } from "react-icons/io"
import { IoClose, IoQrCode, IoShareSocialOutline } from "react-icons/io5"
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
  const [copied, setCopied] = useState(false)

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(iframeCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000) // reset after 3s
  }
  const codeRef = useRef<HTMLDivElement>(null)
  const iframeCode = `<iframe src="${fullURL}" style="width:100vw;height:100vh;border:none;position:fixed;top:0;left:0;z-index:9999;background:#fff;"></iframe>`

  const handleDownloadPng = () => {
    const svg = document.querySelector("#success-modal-qr svg")
    if (!svg) {
      console.error("QR SVG not found!")
      return
    }
    const clone = svg.cloneNode(true) as SVGSVGElement
    clone.setAttribute("width", "512")
    clone.setAttribute("height", "512")
    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(clone)
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

  const handleDownloadHTML = () => {
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
  }

  useEffect(() => {
    setFullURL(`${window.location.origin}${restaurantUrl}`)
  }, [restaurantUrl])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-screen overflow-y-auto w-full !p-7 bg-white/95 border border-product-border shadow-product-shadow rounded-3xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <DialogTitle className="text-2xl font-bold text-product-foreground font-heading">
              🎉 Congratulations!
            </DialogTitle>
          </div>
          <DialogDescription className="text-center text-product-foreground-accent text-base font-body">
            {type === "ai"
              ? "Your AI-generated Service Catalogue is now live and ready to share with your customers."
              : "Your Service Catalogue is now live and ready to share with your customers."}
          </DialogDescription>
        </DialogHeader>

        {/* Two-column layout for better space usage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* QR Code Section */}
          <div className="flex flex-col items-center gap-4 p-5 bg-product-background/50 rounded-xl border border-product-border">
            <div className="flex items-center gap-2">
              <IoShareSocialOutline size={22} className="text-product-primary" />
              <h4 className="text-base font-semibold text-product-foreground font-body">
                Share instantly
              </h4>
            </div>
            <p className="text-sm text-product-foreground-accent text-center font-body">
              Use the QR code below for quick access
            </p>
            <div
              id="success-modal-qr"
              className="p-3 bg-white rounded-xl shadow-sm border border-product-border">
              <QRCodeSVG value={fullURL} size={150} bgColor="#fff" fgColor="#000" />
            </div>
            <Button onClick={handleDownloadPng} variant="outline">
              <IoQrCode size={18} /> Download QR code
            </Button>
          </div>

          {/* Embed Section */}
          <div className="flex flex-col items-center gap-4 p-5 bg-product-background/50 rounded-xl border border-product-border">
            <div className="flex items-center gap-2">
              <ImEmbed2 size={22} className="text-product-primary" />
              <h4 className="text-base font-semibold text-product-foreground font-body">
                Embed Anywhere
              </h4>
            </div>
            <p className="text-sm text-product-foreground-accent text-center font-body">
              Copy the code to add to your website
            </p>
            <div
              ref={codeRef}
              className="bg-[#1e1e1e] rounded-xl p-4 text-xs overflow-x-auto font-mono border border-[#333] transition-all duration-200"
              style={{ color: "#d4d4d4", lineHeight: "1.5", maxHeight: "180px" }}>
              <pre className="whitespace-pre-wrap break-all relative m-0">
                {iframeCode}
                <button
                  onClick={handleCopyCode}
                  className={`absolute -top-2 -right-2 p-1 rounded-lg transition-colors duration-300 ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}>
                  {copied ? <IoMdCheckmark size={18} /> : <MdContentCopy size={18} />}
                </button>
              </pre>
            </div>
            <Button onClick={handleDownloadHTML} variant="outline">
              <FaCode size={18} /> Download HTML code
            </Button>
          </div>
        </div>

        <DialogFooter className="flex gap-3 pt-5 border-t border-product-border">
          <Button onClick={onClose} variant="destructive" className="flex-1">
            <IoClose size={18} />
            Close
          </Button>
          <Button onClick={() => window.open(fullURL, "_blank")} className="flex-1">
            <IoMdOpen size={18} /> Visit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessModal
