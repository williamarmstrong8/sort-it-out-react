import React from 'react'
import { cn } from '../../lib/utils'

interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className={cn(
      'bg-white text-primary py-6 sm:py-12 font-inter shadow-lg mt-8 sm:mt-16',
      className
    )}>
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start gap-8 sm:gap-10">
          {/* Brand */}
          <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto justify-center sm:justify-start">
            <img 
              src="/assets/logo-black.png" 
              alt="Sort it Out Logo" 
              className="h-20 sm:h-28 w-auto rounded-lg bg-transparent p-1"
            />
          </div>

          {/* Navigation and Contact Info - Side by side on mobile */}
          <div className="flex flex-row justify-between sm:justify-end gap-8 sm:gap-10 w-full sm:w-auto">
            {/* Navigation */}
            <nav className="flex flex-col gap-2 sm:gap-3 text-left">
              <a
                href="#home"
                className="text-base sm:text-lg font-medium text-primary transition-colors duration-200 hover:text-accent-dark"
                onClick={() => scrollToSection('home')}
              >
                Home
              </a>
              <a
                href="#services"
                className="text-base sm:text-lg font-medium text-primary transition-colors duration-200 hover:text-accent-dark"
                onClick={() => scrollToSection('services')}
              >
                Services
              </a>
              <a
                href="#about"
                className="text-base sm:text-lg font-medium text-primary transition-colors duration-200 hover:text-accent-dark"
                onClick={() => scrollToSection('about')}
              >
                About
              </a>
              <a
                href="#contact"
                className="text-base sm:text-lg font-medium text-primary transition-colors duration-200 hover:text-accent-dark"
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </a>
            </nav>

            {/* Contact Info */}
            <div className="flex flex-col gap-1 text-base sm:text-lg text-right">
              <div><strong>Contact:</strong></div>
              <div>Emma Brown</div>
              <div>
                <a 
                  href="tel:4155963938" 
                  className="text-primary underline transition-colors duration-200 hover:text-accent-dark"
                >
                  415-596-3938
                </a>
              </div>
              <div>
                <a 
                  href="mailto:sortitoutsf@gmail.com" 
                  className="text-primary underline transition-colors duration-200 hover:text-accent-dark"
                >
                  sortitoutsf@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
