"use client"
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FiUpload, FiEdit3, FiShare2, FiCheck } from 'react-icons/fi';

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
            staggerChildren: 0.2,
        }
    }
};

const stepVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 50,
        scale: 0.9,
    },
    onscreen: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            bounce: 0.3,
            duration: 0.8,
        }
    },
};

const HowItWorks: React.FC = () => {
    const steps = [
        {
            step: "1",
            title: "Upload or Start from a Template",
            description: "Upload your existing content or choose a flexible template. Our platform works for any service business.",
            icon: <FiUpload className="w-8 h-8" />,
            details: [
                "Scan paper catalogues with OCR",
                "Upload images, descriptions, or spreadsheets",
                "Start from a universal template"
            ]
        },
        {
            step: "2",
            title: "Customize in Minutes",
            description: "Easily customize your catalogue—no design or tech skills needed. Add your branding, organize services, and set prices.",
            icon: <FiEdit3 className="w-8 h-8" />,
            details: [
                "Flexible layouts for any business",
                "Add your logo and colors",
                "Organize services and pricing"
            ]
        },
        {
            step: "3",
            title: "Share Instantly Anywhere",
            description: "Share your catalogue with a link or QR code. Your customers can access it 24/7 on any device.",
            icon: <FiShare2 className="w-8 h-8" />,
            details: [
                "Instant QR code and link generation",
                "Works on any device",
                "Update and share anytime"
            ]
        }
    ];

    return (
        <motion.div 
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <motion.div 
                        key={step.step} 
                        className="relative"
                        variants={stepVariants}
                        whileHover={{ 
                            scale: 1.02,
                            y: -2,
                            transition: { duration: 0.15, ease: 'easeOut' }
                        }}
                    >
                        {/* Step number */}
                        <div className="absolute -top-4 left-8 w-12 h-12 bg-product-primary rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                            {step.step}
                        </div>

                        {/* Card content */}
                        <div className="relative bg-product-background rounded-2xl p-8 shadow-lg hover:shadow-xl border border-product-border transition-all duration-300 h-full">
                            {/* Icon */}
                            <div className="flex items-center justify-center w-16 h-16 bg-product-primary/10 rounded-xl mb-6">
                                <div className="text-product-primary">
                                    {step.icon}
                                </div>
                            </div>

                            {/* Title and description */}
                            <h3 className="text-xl font-semibold text-product-foreground mb-4">
                                {step.title}
                            </h3>
                            <p className="text-product-foreground-accent mb-6 leading-relaxed">
                                {step.description}
                            </p>

                            {/* Details list */}
                            <ul className="space-y-3">
                                {step.details.map((detail, detailIndex) => (
                                    <li key={detailIndex} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 bg-product-primary/10 rounded-full flex items-center justify-center mt-0.5">
                                            <FiCheck className="w-3 h-3 text-product-primary" />
                                        </div>
                                        <span className="text-product-foreground-accent text-sm">
                                            {detail}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Connector line (except for last step) */}
                        {index < steps.length - 1 && (
                            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-product-primary/20 transform -translate-y-1/2 z-0">
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default HowItWorks; 