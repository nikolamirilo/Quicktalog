"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FiMail, FiPhone, FiShield, FiZap, FiExternalLink, FiPlus } from 'react-icons/fi';

interface CatalogueHeaderProps {
  type?: 'default' | 'custom';
  customLogo?: string;
  customEmail?: string;
  customPhone?: string;
  customCtaText?: string;
  customCtaLink?: string;
}

const CatalogueHeader: React.FC<CatalogueHeaderProps> = ({ 
  type = 'default',
  customLogo,
  customEmail = 'hello@example.com',
  customPhone = '+1 (555) 123-4567',
  customCtaText = 'Contact Us',
  customCtaLink = '#'
}) => {
  const [logoPath, setLogoPath] = useState('/logo.svg');

  // Determine logo based on theme
  useEffect(() => {
    const getLogoPath = () => {
      if (type === 'custom' && customLogo) {
        return customLogo;
      }
      
      // Check if we're in a dark theme by looking for theme classes on parent elements
      const mainElement = document.querySelector('main');
      const isDarkTheme = mainElement?.classList.contains('theme-elegant') || 
                         mainElement?.classList.contains('theme-modern') ||
                         mainElement?.classList.contains('theme-creative') ||
                         document.querySelector('.theme-elegant') ||
                         document.querySelector('.theme-modern') ||
                         document.querySelector('.theme-creative');
      
      return type === 'default' 
        ? (isDarkTheme ? '/logo-light.svg' : '/logo.svg')
        : (customLogo || '/logo.svg');
    };

    setLogoPath(getLogoPath());
  }, [type, customLogo]);

  return (
    <header className="border-b shadow-sm z-50" style={{
      fontFamily: 'var(--font-family-body, inherit)',
      fontWeight: 'var(--font-weight-body, 400)',
      letterSpacing: 'var(--letter-spacing-body, 0)',
      backgroundColor: 'var(--header-bg, var(--card-bg))',
      color: 'var(--card-text)',
      borderBottom: '1px solid var(--card-border)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link href="/" className="flex items-center space-x-2 group transition-all duration-200 hover:scale-105">
              {type === 'default' ? (
                // Default - Our logo (much bigger and wider)
                <Image
                  src={logoPath}
                  alt="Quicktalog"
                  width={80}
                  height={48}
                  className="w-20 h-12 sm:w-24 sm:h-14"
                />
              ) : (
                // Custom - Their logo (same size as default)
                <Image
                  src={logoPath}
                  alt="Company Logo"
                  width={80}
                  height={48}
                  className="w-20 h-12 sm:w-24 sm:h-14"
                />
              )}
            </Link>
          </div>

          {/* Right side - Contact CTA */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Contact Icons */}
            <div className="flex items-center space-x-3">
              <a 
                href={`mailto:${type === 'default' ? 'hello@quicktalog.com' : customEmail}`}
                className="p-2 rounded-lg hover:bg-primary/10 transition-all duration-200 group"
                aria-label="Email"
                style={{ 
                  color: 'var(--card-description)',
                  border: '1px solid var(--card-border)'
                }}
              >
                <FiMail className="w-4 h-4 group-hover:text-primary group-hover:scale-110 transition-all duration-200" />
              </a>
              {type === 'custom' && (
                <a 
                  href={`tel:${customPhone}`}
                  className="p-2 rounded-lg hover:bg-primary/10 transition-all duration-200 group"
                  aria-label="Phone"
                  style={{ 
                    color: 'var(--card-description)',
                    border: '1px solid var(--card-border)'
                  }}
                >
                  <FiPhone className="w-4 h-4 group-hover:text-primary group-hover:scale-110 transition-all duration-200" />
                </a>
              )}
            </div>
            
            {/* CTA Button */}
            <Button 
              asChild
              variant="secondary"
              size="sm"
              className="text-sm font-medium transition-all duration-200 hover:scale-105 border hover:bg-primary/10 hover:text-primary"
              style={{
                fontFamily: 'var(--font-family-heading, inherit)',
                fontWeight: 'var(--font-weight-heading, 600)',
                letterSpacing: 'var(--letter-spacing-heading, -0.02em)',
                backgroundColor: 'var(--card-bg)',
                color: 'var(--card-text)',
                border: '1px solid var(--primary)'
              }}
            >
              <Link href={type === 'default' ? "/auth?mode=signup" : customCtaLink} aria-label={type === 'default' ? "Create your own digital catalog" : customCtaText}>
                {type === 'default' ? (
                  <>
                    <FiPlus className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Create Your Catalog</span>
                    <span className="sm:hidden">Get Started</span>
                  </>
                ) : (
                  <span>Placeholder</span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CatalogueHeader;