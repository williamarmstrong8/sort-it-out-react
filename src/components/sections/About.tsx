import React from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

export const About: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver()

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Image Frame */}
          <div className={cn(
            'transition-all duration-1000 ease-easing order-1 lg:order-1',
            isIntersecting 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-8'
          )}>
            <div 
              className="w-full h-64 sm:h-80 lg:h-[600px] bg-cover bg-center rounded-lg shadow-card"
              style={{
                backgroundImage: `url('/assets/about2.jpg')`
              }}
            />
          </div>

          {/* Text Content */}
          <div className={cn(
            'transition-all duration-1000 ease-easing delay-300 order-2 lg:order-2 text-center lg:text-left',
            isIntersecting 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-8'
          )}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-medium text-primary mb-4">
              About Sort It Out
            </h2>
            
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Sort It Out is a San Francisco-based professional organizing service dedicated to transforming homes and workspaces into beautifully functional environments. We believe that organization is not about perfection, but about creating space for what matters most to you.
              </p>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Our team brings a thoughtful, practical approach to every project, using our proven 3 'S' System, Sort, Select, Store, to help you conquer clutter and reclaim your peace of mind. Whether you need a single closet refreshed or a whole-home decluttered, we tailor our services to your unique needs, routines, and style.
              </p>
            </div>
            
            <blockquote className="font-playfair text-lg sm:text-xl lg:text-2xl italic text-primary mb-6 sm:mb-8 pl-4 sm:pl-8 py-4 border-l-4 border-accent bg-white rounded-r-lg shadow-sm w-full overflow-hidden break-words">
              "Organization is not about perfection—it's about creating space for what matters most."
            </blockquote>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={scrollToContact}
              className="hover:scale-105 transition-transform duration-250 ease-easing"
            >
              Get Organized
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
