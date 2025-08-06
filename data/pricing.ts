import { IPricing } from "@/types";

export const tiers: IPricing[] = [
    {
        name: 'Starter',
        price: 0,
        features: [
            '1 digital catalogue',
            'Basic customization',
            'QR code sharing',
            'Email support',
            '1,000 monthly views',
        ],
    },
    {
        name: 'Pro',
        price: 10,
        features: [
            'Up to 5 catalogues',
            'AI catalogue generation (up to 5)',
            'Advanced customization',
            'Email support',
            '5,000 monthly views',
        ],
    },
    {
        name: 'Growth',
        price: 25,
        features: [
            'Up to 10 catalogues',
            'AI catalogue generation (up to 10)',
            'OCR import & AI (up to 5)',
            'Advanced analytics',
            '15,000 monthly views',
            'Newsletter features',
        ],
    },
    {
        name: 'Premium',
        price: 50,
        features: [
            'Unlimited catalogues',
            'AI catalogue generation (up to 20)',
            'OCR import & AI (up to 10)',
            'Advanced analytics',
            '50,000 monthly views',
            'Custom features',
            'Priority support',
        ],
    },
]