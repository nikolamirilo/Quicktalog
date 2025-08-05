import { MainContextProvider } from "@/context/MainContext"

export const PageWrapperClient = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <MainContextProvider>{children}</MainContextProvider>
}
