"use client"
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FiCheck, FiClock, FiDollarSign, FiUsers, FiSmartphone, FiEye, FiTrendingUp, FiX } from 'react-icons/fi';

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
            staggerChildren: 0.15,
        }
    }
};

const cardVariants: Variants = {
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

const ProblemSection: React.FC = () => {
    const problems = [
        {
            problem: "Losing Money on Printed Catalogs",
            description: "Spending hundreds on printing and reprinting every time prices change.",
            impact: "$500+ monthly waste",
            solution: "Update digitally in minutes, save 90% on costs",
            icon: <FiDollarSign className="w-8 h-8" />,
        },
        {
            problem: "Missing Sales When Closed",
            description: "Customers can't see your services outside business hours.",
            impact: "40% of potential sales lost",
            solution: "Your catalog works 24/7 on any device",
            icon: <FiSmartphone className="w-8 h-8" />,
        },
        {
            problem: "Wasting Hours on Updates",
            description: "Spending hours updating printed catalogs manually.",
            impact: "10+ hours weekly wasted",
            solution: "Changes go live instantly, no printing needed",
            icon: <FiClock className="w-7 h-7" />,
        },
        {
            problem: "Poor Customer Sharing",
            description: "Customers can't easily share your services with others.",
            impact: "Missing word-of-mouth marketing",
            solution: "One-click sharing via QR codes and links",
            icon: <FiEye className="w-7 h-7" />,
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {problems.map((item, index) => (
                    <motion.div 
                        key={index} 
                        className="group relative"
                        variants={cardVariants}
                        whileHover={{
                            scale: 1.02,
                            y: -2,
                            transition: { duration: 0.15, ease: 'easeOut' }
                        }}
                    >
                        <div className="relative bg-product-background text-product-foreground rounded-xl border border-product-border shadow-lg hover:shadow-xl transition-all duration-300 ease-out h-full flex flex-col">
                            {/* Problem Header */}
                            <div className="p-6 pb-4 flex gap-4 items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                                    <FiX className="w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-product-foreground leading-tight mb-2">
                                        {item.problem}
                                    </h4>
                                    <p className="text-product-foreground-accent text-sm leading-relaxed mb-3">
                                        {item.description}
                                    </p>
                                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold border border-red-200">
                                        <FiX className="w-4 h-4" />
                                        <span>{item.impact}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Solution Section */}
                            <div className="bg-product-hover-background rounded-b-xl p-6 pt-4 flex gap-3 items-start border-t border-product-border mt-auto">
                                <div className="flex-shrink-0 w-12 h-12 bg-product-primary/10 rounded-xl flex items-center justify-center text-product-primary">
                                    <FiCheck className="w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-product-primary font-semibold text-xs mb-2 uppercase tracking-wider">Our Solution</p>
                                    <p className="text-product-foreground text-base leading-relaxed font-semibold">
                                        {item.solution}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ProblemSection; 