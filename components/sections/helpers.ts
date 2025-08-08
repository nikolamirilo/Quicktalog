// Helper function to get grid styles based on variant
export const getGridStyle = (variant: string): string => {
  switch (variant) {
    case "variant_1":
      return "grid grid-cols-1 md:grid-cols-2 gap-3 px-2 my-4"
    case "variant_2":
      return "flex flex-wrap justify-start gap-3 mx-auto sm:gap-4 md:gap-6 my-4"
    case "variant_3":
      return "grid grid-cols-1 md:grid-cols-2 gap-3 my-4"
    case "variant_4":
      return ""
    default:
      return "flex flex-row flex-wrap gap-3 my-4"
  }
}

// Animation variants
export const contentVariants = {
  hidden: { height: 0, opacity: 0, marginTop: 0 },
  visible: { height: "auto", opacity: 1, marginTop: 16 },
}
