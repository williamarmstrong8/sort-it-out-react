import React, { useState, useEffect, useRef } from 'react'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { cn } from '../../lib/utils'

interface NavbarProps {
  className?: string
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const { isScrolled, isScrollingUp } = useScrollPosition()
  const servicesDropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsServicesDropdownOpen(false)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Close mobile menu when clicking on a link
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false)
    setIsServicesDropdownOpen(false)
  }

  const services = [
    { name: "Growing Spaces, Sorted", slide: 0 },
    { name: "Sorted & School Ready", slide: 1 },
    { name: "Senior Support & Sort", slide: 2 },
    { name: "Seasonal Sort & Store", slide: 3 },
    { name: "Tidy Pantries to Sorted Fridges", slide: 4 },
    { name: "Closet Sort & Store", slide: 5 },
    { name: "Move Smart, Sort First", slide: 6 },
  ]

  const scrollToSection = (sectionId: string, slideIndex?: number) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      
      // If it's a service slide, wait for scroll to complete then go to specific slide
      if (slideIndex !== undefined && sectionId === 'services') {
        // Wait for scroll to complete by checking scroll position
        const checkScrollComplete = () => {
          const servicesSection = document.getElementById('services')
          if (servicesSection) {
            const rect = servicesSection.getBoundingClientRect()
            // If services section is near the top of the viewport, scroll is complete
            if (rect.top <= 100) {
              // Small delay to ensure smooth transition
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('goToSlide', { detail: slideIndex }))
              }, 100)
            } else {
              // Check again in a short interval
              requestAnimationFrame(checkScrollComplete)
            }
          }
        }
        
        // Start checking after a short delay to allow scroll to begin
        setTimeout(checkScrollComplete, 100)
      }
    }
  }

  return (
          <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out',
          isScrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
            : 'bg-transparent',
          isScrollingUp && isScrolled ? 'translate-y-0' : isScrolled ? '-translate-y-full' : 'translate-y-0',
          className
        )}
      >
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="font-playfair text-3xl font-medium transition-colors duration-300">
          <img 
            src={isScrolled ? "/assets/logo-black.png" : "/assets/logo-white.png"} 
            alt="Sort It Out Logo" 
            className="h-24 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <a 
            href="#home" 
            className={cn(
              "text-lg font-inter font-normal transition-colors duration-300 hover:text-accent relative group",
              isScrolled ? "text-primary" : "text-white"
            )}
            onClick={() => scrollToSection('home')}
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </a>
          
          {/* Services Dropdown */}
          <div className="relative" ref={servicesDropdownRef}>
            <button
              className={cn(
                "text-lg font-inter font-normal transition-colors duration-300 hover:text-accent relative group flex items-center gap-3",
                isScrolled ? "text-primary" : "text-white"
              )}
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              aria-expanded={isServicesDropdownOpen}
            >
              Services
              <svg 
                className={cn(
                  "w-4 h-4 transition-transform duration-300 ease-in-out",
                  isServicesDropdownOpen ? "rotate-180" : "rotate-0"
                )}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </button>
            
            {isServicesDropdownOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-100 min-w-96 py-6 opacity-100 translate-y-0 transition-all duration-300 ease-in-out">
                <div className="px-2">
                  {services.map((service, index) => (
                    <a
                      key={index}
                      href="#services"
                      className="block px-6 py-4 text-gray-800 hover:bg-accent/5 hover:text-accent rounded-lg mx-2 transition-all duration-200 ease-out group"
                      onClick={() => {
                        scrollToSection('services', service.slide)
                        setIsServicesDropdownOpen(false)
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-inter font-medium text-base group-hover:font-semibold transition-all duration-200">
                          {service.name}
                        </span>
                        <span className="text-accent/0 group-hover:text-accent/60 text-sm transition-all duration-200">
                          →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <a 
            href="#about" 
            className={cn(
              "text-lg font-inter font-normal transition-colors duration-300 hover:text-accent relative group",
              isScrolled ? "text-primary" : "text-white"
            )}
            onClick={() => scrollToSection('about')}
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </a>
          
          <a 
            href="#contact" 
            className={cn(
              "text-lg font-inter font-normal transition-colors duration-300 hover:text-accent relative group",
              isScrolled ? "text-primary" : "text-white"
            )}
            onClick={() => scrollToSection('contact')}
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden bg-none border-none cursor-pointer z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span 
              className={cn(
                'block w-6 h-2 bg-current transition-all duration-300',
                isScrolled ? 'text-primary' : 'text-white',
                isMobileMenuOpen && 'rotate-45 translate-y-1'
              )}
            />
            <span 
              className={cn(
                'block w-6 h-2 bg-current mt-1 transition-all duration-300',
                isScrolled ? 'text-primary' : 'text-white',
                isMobileMenuOpen && 'opacity-0'
              )}
            />
            <span 
              className={cn(
                'block w-6 h-2 bg-current mt-1 transition-all duration-300',
                isScrolled ? 'text-primary' : 'text-white',
                isMobileMenuOpen && '-rotate-45 -translate-y-1'
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={cn(
          'md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out',
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        )}
      >
        <div className="px-8 py-6 space-y-4">
          <a
            href="#home"
            className="block text-lg font-inter font-normal text-primary py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            onClick={handleNavLinkClick}
          >
            Home
          </a>
          
          {/* Mobile Services Dropdown */}
          <div className="relative">
            <button
              className="w-full text-left text-lg font-inter font-normal text-primary py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex justify-between items-center"
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
            >
              Services
              <svg 
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isServicesDropdownOpen ? "rotate-180" : "rotate-0"
                )}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isServicesDropdownOpen && (
              <div className="pl-8 mt-3 space-y-1 max-h-96 overflow-y-auto">
                {services.map((service, index) => (
                  <a
                    key={index}
                    href="#services"
                    className="block text-base font-inter font-medium text-gray-700 py-3 px-4 hover:text-accent hover:bg-accent/5 rounded-lg transition-all duration-200"
                    onClick={() => {
                      scrollToSection('services', service.slide)
                      handleNavLinkClick()
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{service.name}</span>
                      <span className="text-accent/60 text-sm">→</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
          
          <a
            href="#about"
            className="block text-lg font-inter font-normal text-primary py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            onClick={handleNavLinkClick}
          >
            About
          </a>
          
          <a
            href="#contact"
            className="block text-lg font-inter font-normal text-primary py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            onClick={handleNavLinkClick}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
