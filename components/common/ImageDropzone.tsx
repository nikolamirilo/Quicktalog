import React from "react";
import { UploadDropzone } from "@/utils/uploadthing";

interface ImageDropzoneProps {
  onUploadComplete: (url: string) => void;
  onError?: (error: Error) => void;
  maxDim?: number;
  maxSizeMB?: number;
  className?: string;
  disabled?: boolean;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onUploadComplete,
  onError,
  maxDim = 512,
  maxSizeMB = 1,
  className = "",
  disabled = false,
}) => {
  return (
    <UploadDropzone
      endpoint="imageUploader"
      config={{ mode: "auto" }}
      className={className}
      disabled={disabled}
      appearance={{
        button: "hidden",
        label: disabled ? "text-gray-400" : "text-gray-600",
        allowedContent: "",
        container: `h-48 w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
      }}
      onBeforeUploadBegin={async (files) => {
        if (disabled) return [];
        const file = files[0];
        if (!file.type.startsWith("image/")) return [];
        // Read image
        const img = new window.Image();
        const url = URL.createObjectURL(file);
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });
        // Resize logic
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        // Draw to canvas
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(url);
          alert("Failed to process image. Please try another file.");
          return [];
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Convert to webp, try to keep under maxSizeMB
        let quality = 0.92;
        let blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => {
              if (b) resolve(b);
              else reject(new Error("Failed to convert image to webp."));
            },
            "image/webp",
            quality
          );
        });
        while (blob.size > maxSizeMB * 1024 * 1024 && quality > 0.5) {
          quality -= 0.1;
          blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
              (b) => {
                if (b) resolve(b);
                else reject(new Error("Failed to convert image to webp."));
              },
              "image/webp",
              quality
            );
          });
        }
        const webpFile = new File(
          [blob],
          file.name.replace(/\.[^.]+$/, ".webp"),
          { type: "image/webp" }
        );
        URL.revokeObjectURL(url);
        return [webpFile];
      }}
      onClientUploadComplete={(res) => {
        if (res && res.length > 0 && res[0].url) {
          onUploadComplete(res[0].url);
        }
      }}
      onUploadError={onError}
    />
  );
};

export default ImageDropzone; 