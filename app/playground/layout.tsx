import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quicktalog Playground — Try Catalog Themes & Layouts",
  description:
    "Preview digital catalog layouts and themes in real time. Switch designs, explore styles, and see how your catalog could look—no signup required.",
}

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return children
}


