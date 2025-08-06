import { ITestimonial } from "@/types";
import { siteDetails } from "./siteDetails";

export const testimonials: ITestimonial[] = [
    {
        name: 'Maria Lopez',
        role: 'Owner, Bella Café',
        message: `${siteDetails.siteName} transformed our menu updates from a weekly headache to a 2-minute task. Our customers love the QR code feature - no more waiting for printed menus!`,
        avatar: '/images/testimonial-1.webp',
        industry: 'Hospitality',
        metric: 'Saved 8 hours/week'
    },
    {
        name: 'David Kim',
        role: 'Manager, TechMart Electronics',
        message: `We digitalized our entire product catalog in under 5 minutes. The OCR feature saved us hours of manual entry. Our sales team loves how easy it is to share products with clients.`,
        avatar: '/images/testimonial-2.webp',
        industry: 'Retail',
        metric: '40% faster product updates'
    },
    {
        name: 'Sophie Dubois',
        role: 'Marketing Lead, GreenLeaf Spa',
        message: `The ability to update our service list instantly and get real-time feedback from clients has helped us increase bookings by 40%. The analytics feature is a game-changer!`,
        avatar: '/images/testimonial-3.webp',
        industry: 'Wellness',
        metric: '40% increase in bookings'
    },
];