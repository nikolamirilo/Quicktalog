import { FiBarChart2, FiBriefcase, FiDollarSign, FiLock, FiPieChart, FiShield, FiTarget, FiTrendingUp, FiUser, FiZap, FiSmartphone, FiCode, FiEdit3, FiShare2, FiClock, FiCheck } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Create Professional Catalogs in Minutes",
        description: "No design skills needed. Our intuitive platform lets anyone create beautiful, mobile-ready catalogs that impress customers and drive sales.",
        bullets: [
            {
                title: "Universal Templates",
                description: "Choose from flexible templates that work for any industry or service type.",
                icon: <FiEdit3 size={26} />
            },
            {
                title: "Instant Setup",
                description: "Create and publish your first catalogue in under 5 minutes.",
                icon: <FiClock size={26} />
            },
            {
                title: "No Design/Tech Skills Needed",
                description: "Our intuitive interface makes it easy for anyone to create a professional catalogue.",
                icon: <FiCheck size={26} />
            }
        ],
        imageSrc: "/images/mockup-1.png"
    },
    {
        title: "Reach Customers 24/7, Anywhere",
        description: "Your catalog works when you don't. Share via QR codes, links, or embed on your website. Never miss a potential customer again.",
        bullets: [
            {
                title: "QR Code Generation",
                description: "Generate QR codes for your entire catalog or individual items instantly. Perfect for table cards, business cards, and marketing materials.",
                icon: <FiCode size={26} />
            },
            {
                title: "Mobile-First Design",
                description: "Optimized for smartphones, tablets, and desktops - looks great everywhere. Your customers get the best experience on any device.",
                icon: <FiSmartphone size={26} />
            },
            {
                title: "Easy Sharing",
                description: "Share your catalog with a single link or QR code - no app downloads required. Your customers can access your services instantly.",
                icon: <FiShare2 size={26} />
            }
        ],
        imageSrc: "/images/mockup-3.png"
    },
    {
        title: "Track Performance & Grow Your Business",
        description: "Get insights into customer behavior and optimize your offerings. See which items are most viewed and understand what drives sales.",
        bullets: [
            {
                title: "Real-Time Analytics",
                description: "Track views, shares, and engagement with detailed analytics dashboard. Understand what your customers want and optimize accordingly.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Customer Feedback",
                description: "Collect reviews and ratings directly from your digital catalog. Build trust and improve your services based on real customer feedback.",
                icon: <FiUser size={26} />
            },
            {
                title: "Secure & Reliable",
                description: "Enterprise-grade security keeps your data safe and your catalog always available. Your business information is protected and accessible 24/7.",
                icon: <FiShield size={26} />
            }
        ],
        imageSrc: "/images/mockup-2.png"
    },
]