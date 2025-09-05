import { generatePageMetadata } from "@/constants/metadata"
import type { Metadata } from "next"

export const metadata: Metadata = generatePageMetadata("playground")

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return children
}


