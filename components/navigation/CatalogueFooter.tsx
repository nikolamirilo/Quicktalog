"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FiMail, FiPhone, FiMapPin, FiClock, FiExternalLink, FiShield, FiZap, FiUsers, FiStar, FiCheckCircle, FiHome, FiPlus } from 'react-icons/fi';
import { getPlatformIconByName } from '@/utils/client';

interface CatalogueFooterProps {
  type?: 'default' | 'custom';
  customLogo?: string;
  customCompanyName?: string;
  customEmail?: string;
  customPhone?: string;
  customAddress?: string;
  customLocation?: string;
  customLegalName?: string;
  customSocialLinks?: Record<string, string>;
  customPartnerBadges?: Array<{ name: string; icon: string; description: string; rating: number }>;
}

const CatalogueFooter: React.FC<CatalogueFooterProps> = ({ 
  type = 'default',
  customLogo,
  customCompanyName = 'Your Company',
  customEmail = 'hello@example.com',
  customPhone = '+1 (555) 123-4567',
  customAddress = '123 Business St',
  customLocation = 'City, State 12345',
  customLegalName = 'Your Company LLC',
  customSocialLinks = {
    facebook: 'https://facebook.com/yourcompany',
    twitter: 'https://twitter.com/yourcompany',
    linkedin: 'https://linkedin.com/company/yourcompany',
    instagram: 'https://instagram.com/yourcompany'
  },
  customPartnerBadges = [
    { name: 'Partner 1', icon: '🏢', description: 'Business Partner', rating: 4.8 },
    { name: 'Partner 2', icon: '🏢', description: 'Business Partner', rating: 4.9 },
    { name: 'Partner 3', icon: '🏢', description: 'Business Partner', rating: 4.7 }
  ]
}) => {
  const [logoPath, setLogoPath] = useState('/logo.svg');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const socialLinks = {
    facebook: 'https://facebook.com/quicktalog',
    twitter: 'https://twitter.com/quicktalog',
    linkedin: 'https://linkedin.com/company/quicktalog',
    instagram: 'https://instagram.com/quicktalog'
  };

  const partnerBadges = [
    { name: 'Glovo', icon: '🚚', description: 'Delivery Partner', rating: 4.8 },
    { name: 'Wolt', icon: '🛵', description: 'Delivery Partner', rating: 4.9 },
    { name: 'Uber Eats', icon: '🍕', description: 'Delivery Partner', rating: 4.7 }
  ];

  const features = [
    { icon: <FiZap className="w-4 h-4" />, title: 'OCR Import Technology', description: 'Scan existing catalogs' },
    { icon: <FiShield className="w-4 h-4" />, title: 'Secure & Reliable', description: 'Enterprise-grade security' },
    { icon: <FiUsers className="w-4 h-4" />, title: 'Multi-device Access', description: 'Works on all devices' },
    { icon: <FiExternalLink className="w-4 h-4" />, title: 'QR Code Sharing', description: 'One-click sharing' }
  ];

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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log('Newsletter signup:', newsletterEmail);
    setNewsletterEmail('');
  };

  return (
    <footer className="border-t mt-16" style={{
      fontFamily: 'var(--font-family-body, inherit)',
      fontWeight: 'var(--font-weight-body, 400)',
      letterSpacing: 'var(--letter-spacing-body, 0)',
      backgroundColor: 'var(--footer-bg, var(--section-bg))',
      color: 'var(--section-heading)',
      borderTop: '1px solid var(--section-border)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Company branding */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-4 group transition-all duration-200 hover:scale-105">
              <Image
                src={logoPath}
                alt={type === 'default' ? "Quicktalog" : customCompanyName}
                width={type === 'default' ? 48 : 32}
                height={type === 'default' ? 48 : 32}
                className={type === 'default' ? "w-12 h-12" : "w-8 h-8"}
              />
              <div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200" style={{
                  fontFamily: 'var(--font-family-heading, inherit)',
                  fontWeight: 'var(--font-weight-heading, 600)',
                  letterSpacing: 'var(--letter-spacing-heading, -0.02em)',
                  color: 'var(--section-heading)'
                }}>
                  {type === 'default' ? 'Quicktalog' : customCompanyName}
                </h3>
                <p className="text-sm opacity-75" style={{ color: 'var(--card-description)' }}>
                  {type === 'default' ? 'Digital Catalog Platform' : 'Professional Services'}
                </p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--card-description)' }}>
              {type === 'default' 
                ? 'Create beautiful, shareable digital catalogs in minutes. No tech skills required.'
                : 'Professional services delivered with excellence and attention to detail.'
              }
            </p>
            <div className="flex items-center space-x-3">
              {Object.keys(type === 'default' ? socialLinks : customSocialLinks).map(platform => (
                <Link
                  key={platform}
                  href={(type === 'default' ? socialLinks : customSocialLinks)[platform as keyof typeof socialLinks]}
                  className="p-2 rounded-lg transition-all duration-200 group hover:scale-110 hover:bg-primary/10"
                  aria-label={`Follow us on ${platform}`}
                  style={{ 
                    backgroundColor: 'var(--card-bg)', 
                    color: 'var(--card-description)',
                    border: '1px solid var(--card-border)'
                  }}
                >
                  <div className="group-hover:text-primary transition-colors duration-200">
                    {getPlatformIconByName(platform)}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center space-x-2" style={{
              fontFamily: 'var(--font-family-heading, inherit)',
              fontWeight: 'var(--font-weight-heading, 600)',
              letterSpacing: 'var(--letter-spacing-heading, -0.02em)',
              color: 'var(--section-heading)'
            }}>
              <div className="w-1 h-5 bg-primary rounded-full"></div>
              <span>Contact & Support</span>
            </h4>
            <div className="space-y-3">
              <a 
                href={`mailto:${type === 'default' ? 'hello@quicktalog.com' : customEmail}`}
                className="flex items-center space-x-3 text-sm hover:text-primary transition-colors duration-200 group"
                aria-label="Email"
                style={{ color: 'var(--card-description)' }}
              >
                <FiMail className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span>{type === 'default' ? 'hello@quicktalog.com' : customEmail}</span>
              </a>
              <a 
                href={`tel:${type === 'default' ? '+1234567890' : customPhone}`}
                className="flex items-center space-x-3 text-sm hover:text-primary transition-colors duration-200 group"
                aria-label="Phone"
                style={{ color: 'var(--card-description)' }}
              >
                <FiPhone className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span>{type === 'default' ? '+1 (234) 567-890' : customPhone}</span>
              </a>
              <div className="flex items-center space-x-3 text-sm" style={{ color: 'var(--card-description)' }}>
                <FiMapPin className="w-4 h-4" />
                <span>{type === 'default' ? 'San Francisco, CA' : customAddress}</span>
              </div>
            </div>
          </div>

          {/* Platform Features (Default only) */}
          {type === 'default' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center space-x-2" style={{
                fontFamily: 'var(--font-family-heading, inherit)',
                fontWeight: 'var(--font-weight-heading, 600)',
                letterSpacing: 'var(--letter-spacing-heading, -0.02em)',
                color: 'var(--section-heading)'
              }}>
                <div className="w-1 h-5 bg-primary rounded-full"></div>
                <span>Platform Features</span>
              </h4>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 text-sm group" style={{ color: 'var(--card-description)' }}>
                    <div className="mt-0.5 group-hover:scale-110 transition-transform duration-200 text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="font-medium" style={{
                        fontFamily: 'var(--font-family-heading, inherit)',
                        fontWeight: 'var(--font-weight-heading, 600)',
                        letterSpacing: 'var(--letter-spacing-heading, -0.02em)',
                        color: 'var(--card-heading)'
                      }}>{feature.title}</div>
                      <div className="text-xs opacity-75">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Company Information (Custom only) */}
          {type === 'custom' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center space-x-2" style={{
                fontFamily: 'var(--font-family-heading, inherit)',
                fontWeight: 'var(--font-weight-heading, 600)',
                letterSpacing: 'var(--letter-spacing-heading, -0.02em)',
                color: 'var(--section-heading)'
              }}>
                <div className="w-1 h-5 bg-primary rounded-full"></div>
                <span>Company Information</span>
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm" style={{ color: 'var(--card-description)' }}>
                  <FiMapPin className="w-4 h-4" />
                  <span>{customAddress}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm" style={{ color: 'var(--card-description)' }}>
                  <FiMapPin className="w-4 h-4" />
                  <span>{customLocation}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm" style={{ color: 'var(--card-description)' }}>
                  <FiHome className="w-4 h-4" />
                  <span>{customLegalName}</span>
                </div>
              </div>
            </div>
          )}

          {/* Partner Badges (Custom only) */}
          {type === 'custom' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center space-x-2" style={{
                fontFamily: 'var(--font-family-heading, inherit)',
                fontWeight: 'var(--font-weight-heading, 600)',
                letterSpacing: 'var(--letter-spacing-heading, -0.02em)',
                color: 'var(--section-heading)'
              }}>
                <div className="w-1 h-5 bg-primary rounded-full"></div>
                <span>Trusted Partners</span>
              </h4>
              <div className="space-y-3">
                {customPartnerBadges.map((partner, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 hover:scale-105" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-description)' }}>
                    <span className="text-base">{partner.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm" style={{
                        fontFamily: 'var(--font-family-heading, inherit)',
                        fontWeight: 'var(--font-weight-heading, 600)',
                        letterSpacing: 'var(--letter-spacing-heading, -0.02em)',
                        color: 'var(--card-heading)'
                      }}>{partner.name}</div>
                      <div className="text-xs opacity-75">{partner.description}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FiStar className="w-3 h-3 text-primary" />
                      <span className="text-xs font-medium">{partner.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty column for default version to maintain alignment */}
          {type === 'default' && (
            <div className="space-y-4">
              {/* Empty column for alignment */}
            </div>
          )}
        </div>

        {/* Bottom section */}
        <div className="pt-4 border-t" style={{ borderTop: '1px solid var(--section-border)' }}>
          {type === 'default' ? (
            // Default - Full layout with CTA button
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright & Legal */}
              <div className="flex flex-col md:flex-row items-center gap-4 text-sm" style={{ color: 'var(--card-description)' }}>
                <span>© 2025 Quicktalog. All rights reserved.</span>
                <div className="flex items-center space-x-4">
                  <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-200">
                    Privacy Policy
                  </Link>
                  <Link href="/terms-and-conditions" className="hover:text-primary transition-colors duration-200">
                    Terms of Service
                  </Link>
                  <Link href="/refund-policy" className="hover:text-primary transition-colors duration-200">
                    Refund Policy
                  </Link>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                asChild
                variant="secondary"
                size="sm"
                className="transition-all duration-200 hover:scale-105 flex items-center gap-2 border hover:bg-primary/10 hover:text-primary text-base"
                style={{
                  fontFamily: 'var(--font-family-heading, inherit)',
                  fontWeight: 'var(--font-weight-heading, 600)',
                  letterSpacing: 'var(--letter-spacing-heading, -0.02em)',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--card-text)',
                  border: '1px solid var(--primary)'
                }}
              >
                <Link href="/auth?mode=signup" aria-label="Create your own digital catalog">
                  <FiPlus className="w-4 h-4" />
                  Create Your Digital Catalog
                </Link>
              </Button>
            </div>
          ) : (
            // Custom - Newsletter signup instead of CTA button
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright & Legal */}
              <div className="flex flex-col md:flex-row items-center gap-4 text-sm" style={{ color: 'var(--card-description)' }}>
                <span>© 2025 {customLegalName}. All rights reserved.</span>
                <div className="flex items-center space-x-4">
                  <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-200">
                    Privacy Policy
                  </Link>
                  <Link href="/terms-and-conditions" className="hover:text-primary transition-colors duration-200">
                    Terms of Service
                  </Link>
                  <Link href="/refund-policy" className="hover:text-primary transition-colors duration-200">
                    Refund Policy
                  </Link>
                </div>
              </div>

              {/* Newsletter Signup */}
              <form onSubmit={handleNewsletterSubmit} className="flex items-center space-x-2">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="newsletter-email" className="text-xs font-medium" style={{ color: 'var(--card-description)' }}>
                    Subscribe to our newsletter
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-48 text-sm rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      color: 'var(--card-text)',
                      border: '1px solid var(--card-border)'
                    }}
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  variant="secondary"
                  size="sm"
                  className="transition-all duration-200 hover:scale-105 text-sm mt-6 border hover:bg-primary/10 hover:text-primary"
                  style={{
                    fontFamily: 'var(--font-family-heading, inherit)',
                    fontWeight: 'var(--font-weight-heading, 600)',
                    letterSpacing: 'var(--letter-spacing-heading, -0.02em)',
                    backgroundColor: 'var(--card-bg)',
                    color: 'var(--card-text)',
                    border: '1px solid var(--primary)'
                  }}
                >
                  Subscribe
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default CatalogueFooter;