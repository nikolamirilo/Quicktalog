"use client"
import { deleteServiceCatalogue, duplicateServiceCatalogue } from "@/actions/items"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { revalidateData } from "@/helpers/server"
import Link from "next/link"
import { useState } from "react"
import { BiScan } from "react-icons/bi"
import { FiCopy, FiEdit, FiMoreVertical, FiPlus, FiTrash2 } from "react-icons/fi"
import { LuSquareMenu } from "react-icons/lu"
import { RiSparkling2Line } from "react-icons/ri"
import { TbBrandGoogleAnalytics, TbFileAnalytics } from "react-icons/tb"
import InformModal from "../../modals/InformModal"

const Overview = ({ user, overallAnalytics, catalogues }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [menuToDelete, setMenuToDelete] = useState<string | null>(null)
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null)
  async function handleDeleteMenu(id: string) {
    setMenuToDelete(id)
    setIsModalOpen(true)
  }

  async function confirmDelete() {
    if (menuToDelete) {
      await deleteServiceCatalogue(menuToDelete)
      revalidateData()
      setMenuToDelete(null)
      setIsModalOpen(false)
    }
  }

  async function handleDuplicateMenu(id: string) {
    setDuplicatingId(id)
    try {
      await duplicateServiceCatalogue(id)
      await revalidateData()
    } catch (e) {
      alert("Failed to duplicate menu.")
    } finally {
      setDuplicatingId(null)
    }
  }
  function cancelDelete() {
    setMenuToDelete(null)
    setIsModalOpen(false)
  }
  return (
    <>
      <section className="mb-8 sm:mb-12 bg-product-background/80 rounded-3xl shadow-product-shadow border border-product-border flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 md:gap-8 items-center relative overflow-hidden animate-fade-in p-4 sm:p-6 md:p-8 lg:p-10 text-sm sm:text-base md:text-lg lg:text-xl">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-product-primary/20 to-product-primary-accent/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-product-primary/20 to-product-primary-accent/20 rounded-full blur-2xl"></div>
        <div className="flex flex-col items-center md:flex-row md:items-center w-full gap-4 sm:gap-6 md:gap-8 z-10">
          <div className="relative flex-shrink-0 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32">
            <img
              src={user.image}
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full ring-4 ring-product-primary/30 shadow-lg w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-cover"
            />
            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-green-500 rounded-full border-2 border-product-background"></div>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-product-foreground mb-1 font-heading">
              Welcome back, {`${user.name}` || "User"}!{" "}
            </div>
            <div className="text-product-foreground-accent flex items-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl break-words font-body">
              {user.email}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8 sm:mb-12 animate-fade-in">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 text-product-foreground flex items-center gap-2 sm:gap-3 font-heading">
          <TbFileAnalytics className="text-product-primary w-6 h-6 sm:w-8 sm:h-8" /> Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <Card className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-between bg-product-background border border-product-border shadow-product-shadow hover:shadow-product-hover-shadow transition-all duration-200 animate-fade-in">
            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-product-foreground mb-2 text-center">
              Total Page Views
            </div>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-product-primary">
              {overallAnalytics.totalPageViews}
            </div>
          </Card>
          <Card className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-between bg-product-background border border-product-border shadow-product-shadow hover:shadow-product-hover-shadow transition-all duration-200 animate-fade-in">
            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-product-foreground mb-2 text-center">
              Total Visitors
            </div>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-product-primary">
              {overallAnalytics.totalUniqueVisitors}
            </div>
          </Card>
          <Card className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-between bg-product-background border border-product-border shadow-product-shadow hover:shadow-product-hover-shadow transition-all duration-200 animate-fade-in">
            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-product-foreground mb-2 text-center">
              Total Items
            </div>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-product-primary">
              {overallAnalytics.totalServiceCatalogues}
            </div>
          </Card>
          <Card className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-between bg-product-background border border-product-border shadow-product-shadow hover:shadow-product-hover-shadow transition-all duration-200 animate-fade-in">
            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-product-foreground mb-2 text-center">
              Newsletter
            </div>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-product-primary">
              0
            </div>
          </Card>
        </div>
      </section>
      {/* Service Catalogues */}
      <section className="mb-8 sm:mb-12 animate-fade-in">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 text-product-foreground flex items-center gap-2 sm:gap-3 font-heading">
          <LuSquareMenu className="text-product-primary w-6 h-6 sm:w-8 sm:h-8" />
          Service Catalogues
        </h2>
        <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
          <Link href="/admin/create">
            <Button>
              <FiPlus size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" /> Create Catalogue
            </Button>
          </Link>
          <Link href="/admin/create/ai">
            <Button variant="outline">
              <RiSparkling2Line size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" /> Generate
              Catalogue with AI
            </Button>
          </Link>
          <Link href="/admin/create/ocr">
            <Button variant="outline">
              <BiScan size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              Scan & Import Catalogue
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {catalogues.length === 0 && (
            <div className="col-span-full text-product-foreground-accent text-base sm:text-lg">
              No catalogues created yet.
            </div>
          )}
          {catalogues.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3 lg:gap-4 relative bg-product-background border border-product-border shadow-product-shadow hover:shadow-product-hover-shadow hover:scale-[1.02] transition-all duration-200 animate-fade-in">
              {/* Three dots menu moved to top */}
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 p-0 text-product-foreground hover:text-product-primary hover:bg-product-background/50 transition-colors duration-200">
                      <FiMoreVertical size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-product-background border border-product-border rounded-xl shadow-lg">
                    <Link href={`/admin/items/${restaurant.name}/edit`} passHref>
                      <DropdownMenuItem
                        asChild
                        className="text-product-foreground hover:bg-product-hover-background cursor-pointer">
                        <div className="flex items-center gap-2">
                          <FiEdit size={18} /> Edit
                        </div>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() => handleDuplicateMenu(restaurant.id)}
                      disabled={duplicatingId === restaurant.id}
                      className="text-product-foreground hover:bg-product-hover-background cursor-pointer">
                      <span className="flex items-center gap-2">
                        <FiCopy size={18} />
                        {duplicatingId === restaurant.id ? "Loading..." : "Duplicate"}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteMenu(restaurant.id)}
                      disabled={isModalOpen}
                      className="text-red-400 hover:bg-red-50 cursor-pointer">
                      <span className="flex items-center gap-2">
                        <FiTrash2 size={18} />
                        Delete
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Card content */}
              <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-product-foreground pr-8 sm:pr-10 md:pr-12 break-words font-heading">
                {restaurant.name}
              </div>
              <div className="text-product-foreground-accent text-xs sm:text-sm break-words">
                Created: {new Date(restaurant.created_at).toLocaleString()}
              </div>
              <div className="text-product-foreground-accent text-xs sm:text-sm break-words">
                Updated: {new Date(restaurant.updated_at).toLocaleString()}
              </div>
              {/* Buttons */}
              <div className="flex flex-col gap-2 sm:gap-3 mt-auto pt-2 sm:pt-3 md:pt-4">
                <Link href={`/service-catalogues/${restaurant.name}`} className="w-full">
                  <Button className="w-full">
                    <LuSquareMenu size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                    <span className="ml-1">View Catalogue</span>
                  </Button>
                </Link>
                <Link href={`/admin/items/${restaurant.name}/analytics`} className="w-full">
                  <Button variant="outline" className="w-full">
                    <TbBrandGoogleAnalytics size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                    <span className="ml-1">Analytics</span>
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <InformModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        title="Delete Catalogue"
        message="Are you sure you want to delete this menu? This action cannot be undone."
      />
    </>
  )
}

export default Overview
