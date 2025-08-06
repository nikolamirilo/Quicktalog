"use client"
import { motion, Variants } from 'framer-motion';
import PricingColumn from "./PricingColumn";
import { tiers } from "@/data/pricing";

const containerVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 100
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            bounce: 0.2,
            duration: 0.9,
            delayChildren: 0.2,
            staggerChildren: 0.1,
        }
    }
};

const childVariants = {
    offscreen: {
        opacity: 0,
        y: 50,
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            bounce: 0.2,
            duration: 0.8,
        }
    },
};

const Pricing: React.FC = () => {
    return (
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
        >
            {tiers.map((tier, index) => (
                <motion.div 
                    key={tier.name} 
                    variants={childVariants}
                >
                    <PricingColumn tier={tier} highlight={index === 2} />
                </motion.div>
            ))}
        </motion.div>
    )
}

export default Pricing