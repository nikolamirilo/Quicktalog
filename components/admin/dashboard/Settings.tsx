import { Button } from "@/components/ui/button"
import { SignOutButton, UserProfile } from "@clerk/nextjs"
import { FiSettings } from "react-icons/fi"
import { MdLogout } from "react-icons/md"

const Settings = () => {
    return (
        <div className="w-full relative">
            <SignOutButton redirectUrl="/" component="div" >
                <Button variant="destructive" className="absolute right-0 top-0">
                    <MdLogout />  Sign Out
                </Button>
            </SignOutButton>
            <h2
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 text-product-foreground flex items-center gap-2 sm:gap-3"
                style={{ fontFamily: "var(--font-playfair-display), var(--font-inter), serif" }}>
                <FiSettings className="text-product-primary w-6 h-6 sm:w-8 sm:h-8" /> Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
            <UserProfile />

        </div>
    )
}

export default Settings