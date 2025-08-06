import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FiArrowDown, FiPlay, FiCheck, FiZap, FiDollarSign, FiClock, FiSmartphone } from 'react-icons/fi';

import { heroDetails } from '@/data/hero';

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="relative flex items-center justify-center pb-0 pt-32 md:pt-40 px-5"
        >
            <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
                <div className="absolute inset-0 h-full w-full bg-hero-product-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
                </div>
            </div>

            <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)]">
            </div>

            <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-product-foreground max-w-lg md:max-w-3xl mx-auto">
                    {heroDetails.heading}
                </h1>
                <p className="mt-4 text-product-foreground-accent text-lg md:text-xl max-w-2xl mx-auto">
                    {heroDetails.subheading}
                </p>

                {/* Value propositions */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-product-foreground-accent">
                    <div className="flex items-center gap-2">
                        <FiDollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Save 90% on printing costs</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiSmartphone className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Capture sales 24/7</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-orange-600" />
                        <span className="font-medium">Update in minutes, not hours</span>
                    </div>
                </div>
                
                {/* CTA buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/auth?mode=signup">
                        <Button variant="cta" className="text-lg px-8 py-4 h-14">
                            Get Started For Free
                        </Button>
                    </Link>
                    <Link href="/playground">
                        <Button variant="outline" className="text-lg px-8 py-4 h-14 border-2 border-product-primary">
                            <FiPlay className="w-5 h-5 mr-2" />
                            See Demo
                        </Button>
                    </Link>
                </div>

                {/* Trust indicators */}
                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-product-foreground-accent">
                    <div className="flex items-center gap-2">
                        <FiCheck className="w-4 h-4 text-product-primary" />
                        <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiCheck className="w-4 h-4 text-product-primary" />
                        <span>Free plan forever</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiCheck className="w-4 h-4 text-product-primary" />
                        <span>Cancel anytime</span>
                    </div>
                </div>

                {/* Directional cue */}
                <div className="mt-8 flex justify-center">
                    <div className="animate-bounce">
                        <FiArrowDown className="w-6 h-6 text-product-primary" />
                    </div>
                </div>

                <Image
                    src={heroDetails.centerImageSrc}
                    width={384}
                    height={340}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 384px"
                    priority={true}
                    unoptimized={true}
                    alt="app mockup"
                    className='relative mt-12 md:mt-16 mx-auto z-10'
                />
            </div>
        </section>
    );
};

export default Hero;
