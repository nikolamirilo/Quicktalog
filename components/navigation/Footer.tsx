import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { FiMail, FiPhone, FiExternalLink } from 'react-icons/fi';
import { siteDetails } from '@/data/siteDetails';
import { footerDetails } from '@/data/footer';
import { getPlatformIconByName } from '@/utils/client';

const Footer: React.FC = () => {
    return (
        <footer className="bg-hero-product-background text-product-foreground py-16 border-t border-product-border">
            <div className="max-w-7xl w-full mx-auto px-6">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                    {/* Brand section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-3 group">
                            <Image 
                                width={40} 
                                height={40} 
                                src="/logo.svg" 
                                alt="Quicktalog Logo" 
                                className="w-auto h-8 rounded-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <h3 className="font-lora text-xl font-semibold cursor-pointer group-hover:text-product-primary transition-colors duration-200">
                                {siteDetails.siteName}
                            </h3>
                        </Link>
                        <p className="text-product-foreground-accent leading-relaxed max-w-sm">
                            {footerDetails.subheading}
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href={`mailto:${footerDetails.email}`} className="flex items-center gap-2 text-product-foreground-accent hover:text-product-primary transition-colors duration-200">
                                <FiMail className="w-4 h-4" />
                                <span className="text-sm">Email</span>
                            </a>
                            <a href={`tel:${footerDetails.telephone}`} className="flex items-center gap-2 text-product-foreground-accent hover:text-product-primary transition-colors duration-200">
                                <FiPhone className="w-4 h-4" />
                                <span className="text-sm">Phone</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-product-foreground">Quick Links</h4>
                        <ul className="space-y-3">
                            {footerDetails.quickLinks.map(link => (
                                <li key={link.text}>
                                    <Link 
                                        href={link.url} 
                                        className="text-product-foreground-accent hover:text-product-primary transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <span>{link.text}</span>
                                        <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-product-foreground">Connect With Us</h4>
                        <div className="space-y-3">
                            <a 
                                href={`mailto:${footerDetails.email}`} 
                                className="block text-product-foreground-accent hover:text-product-primary transition-colors duration-200"
                            >
                                {footerDetails.email}
                            </a>
                            <a 
                                href={`tel:${footerDetails.telephone}`} 
                                className="block text-product-foreground-accent hover:text-product-primary transition-colors duration-200"
                            >
                                {footerDetails.telephone}
                            </a>
                        </div>
                        
                        {/* Social Links */}
                        {footerDetails.socials && (
                            <div className="pt-4">
                                <div className="flex items-center gap-4">
                                    {Object.keys(footerDetails.socials).map(platformName => {
                                        if (platformName && footerDetails.socials[platformName]) {
                                            return (
                                                <Link
                                                    href={footerDetails.socials[platformName]}
                                                    key={platformName}
                                                    aria-label={platformName}
                                                    className="p-2 rounded-lg bg-white/50 hover:bg-product-primary/10 transition-colors duration-200 group"
                                                >
                                                    <div className="text-product-foreground-accent group-hover:text-product-primary transition-colors duration-200">
                                                        {getPlatformIconByName(platformName)}
                                                    </div>
                                                </Link>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-product-border">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-product-foreground-accent text-sm">
                            Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-product-foreground-accent">
                            <Link href="/privacy-policy" className="hover:text-product-primary transition-colors duration-200">
                                Privacy Policy
                            </Link>
                            <Link href="/terms-and-conditions" className="hover:text-product-primary transition-colors duration-200">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
