import React from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

export const Hero: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver()

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section 
      id="home" 
      ref={ref}
      className="h-screen bg-gradient-to-br from-black/30 to-black/30 bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-center text-white relative px-4 sm:px-8"
      style={{
        backgroundImage: `url('/assets/hero2.jpg')`
      }}
    >
      <div className="max-w-4xl px-4 sm:px-8">
        <h1 
          className={cn(
            'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-medium mb-4 sm:mb-6 text-shadow transition-all duration-1200 ease-easing',
            isIntersecting 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          )}
        >
          Sort It Out
        </h1>
        
        <p 
          className={cn(
            'text-lg sm:text-xl md:text-2xl lg:text-3xl font-inter font-light mb-8 sm:mb-12 text-shadow transition-all duration-1200 ease-easing delay-300',
            isIntersecting 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          )}
        >
          The art of organizing perfected.
        </p>
        
        <Button
          variant="primary"
          size="lg"
          onClick={scrollToContact}
          className={cn(
            'transition-all duration-1200 ease-easing delay-600',
            isIntersecting 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          )}
        >
          Schedule Consultation
        </Button>
      </div>
    </section>
  )
}


