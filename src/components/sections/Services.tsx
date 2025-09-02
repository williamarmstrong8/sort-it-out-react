import React, { useState, useEffect, useRef } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

interface Service {
  title: string
  description: string
  beforeImage: string
  afterImage: string
}

export const Services: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(25) // Start at 25%
  const sliderRef = useRef<HTMLDivElement>(null)

  const services: Service[] = [
    {
      title: "Growing Spaces, Sorted",
      description: "As kids grow, so do their needs. Whether transitioning from a nursery to a toddler's room, upgrading for a grade schooler, or adapting a space for a tween or teen, we help redesign and reorganize their environment to reflect evolving personalities, interests, and routines. From creating age-appropriate storage to refreshing layouts, Sort it Out brings function and personality together in spaces that grow with your child.",
      beforeImage: "/assets/kids-after.png",
      afterImage: "/assets/kids-before.png"
    },
    {
      title: "Sorted & School Ready",
      description: "Ease the shift from summer break to school days by giving your child's space a fresh start for the semester. Whether it's refreshing a bedroom that's become cluttered over the summer or setting up a distraction-free homework zone, Sort It Out can help create a calm, organized environment that supports learning, productivity, and daily routines. Dorm room prep is also available for college-bound students, helping your grad start their next chapter feeling settled, confident, and ready to thrive.",
      beforeImage: "/assets/school-after.png",
      afterImage: "/assets/school-before.png"
    },
    {
      title: "Senior Support & Sort",
      description: "Supporting older adults through life changes requires both care and clarity. Whether downsizing, relocating to be closer to family, or transitioning to assisted living, Sort It Out offers respectful, compassionate help in sorting through years of belongings. We assist in identifying what to keep, donate, or pass on—helping preserve cherished memories while making the transition smoother and less stressful.",
      beforeImage: "/assets/senior-after.png",
      afterImage: "/assets/senior-before.png"
    },
    {
      title: "Seasonal Sort & Store",
      description: "Whether it's ornaments, garlands, or other festive touches around your home, your decorations will be carefully sorted, organized, and packed away using either existing containers or introducing new, efficient labeled storage to keep everything neat, protected, and ready for the next season.",
      beforeImage: "/assets/seasonal-after.png",
      afterImage: "/assets/seasonal-before.png"
    },
    {
      title: "Tidy Pantries to Sorted Fridges",
      description: "Struggling to put away the weekly shop? Tired of finding forgotten, wasted food? We'll help you transform your kitchen storage into a space that works for you and your family. By reorganizing pantry shelves and fridge storage, we create a kitchen that's fresh, functional, and effortlessly organized.",
      beforeImage: "/assets/fridge-after.png",
      afterImage: "/assets/fridge-before.png"
    },
    {
      title: "Closet Sort & Store",
      description: "Closets of all kinds tend to accumulate more than they should, from daily necessities to forgotten items and sentimental keepsakes. Whether you're organizing a chaotic hallway closet, updating a medicine cabinet, or sorting out an entire wardrobe, Sort It Out can help edit, sort, and provide solutions that are practical, aesthetically pleasing, and easy to maintain for all your closet needs, making everyday essentials easy to access whilst keeping treasured memories and keepsakes thoughtfully stored.",
      beforeImage: "/assets/closets-after.png",
      afterImage: "/assets/closets-before.png"
    },
    {
      title: "Move Smart, Sort First",
      description: "Preparing for a home move can feel like a huge task, but our pre-packing service is designed to ease the process. We help you sort and pack only what you truly need or use. From decluttering areas and closets to organizing what goes with you, we'll help lighten the load and bring order to your move. As moving day approaches, you'll be decluttered, organized, and truly ready to pack.",
      beforeImage: "/assets/moving-after.png",
      afterImage: "/assets/moving-before.png"
    }
  ]

  // Listen for navigation events from navbar
  useEffect(() => {
    const handleGoToSlide = (event: CustomEvent) => {
      setCurrentSlide(event.detail)
    }

    window.addEventListener('goToSlide', handleGoToSlide as EventListener)
    return () => window.removeEventListener('goToSlide', handleGoToSlide as EventListener)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setSliderPosition(25) // Reset slider position
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
    setSliderPosition(25)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
    setSliderPosition(25)
  }

  const handleSliderMouseDown = () => {
    setIsDragging(true)
  }

  const handleSliderMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return
    
    const rect = sliderRef.current.getBoundingClientRect()
    const position = ((e.clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, position)))
  }

  const handleSliderMouseUp = () => {
    setIsDragging(false)
  }

  const handleSliderTouchStart = () => {
    setIsDragging(true)
  }

  const handleSliderTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return
    
    const rect = sliderRef.current.getBoundingClientRect()
    const position = ((e.touches[0].clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, position)))
  }

  const handleSliderTouchEnd = () => {
    setIsDragging(false)
  }

  const currentService = services[currentSlide]

  return (
    <section 
      id="services" 
      ref={ref}
      className="py-32 px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className={cn(
          'text-5xl font-playfair font-medium text-primary text-center mb-16 transition-all duration-1000 ease-easing',
          isIntersecting 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        )}>
          Our Services
        </h2>
        
        <div className="relative">
          {/* Service Slide */}
          <div className={cn(
            'bg-white rounded-lg shadow-card overflow-hidden transition-all duration-1000 ease-easing',
            isIntersecting 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          )}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 p-6 sm:p-8 lg:p-16">
              {/* Before/After Images */}
              <div className="relative overflow-hidden rounded-lg order-1 lg:order-1">
                <div 
                  ref={sliderRef}
                  className="relative w-full h-64 sm:h-80 lg:h-[500px] overflow-hidden select-none"
                  onMouseDown={handleSliderMouseDown}
                  onMouseMove={handleSliderMouseMove}
                  onMouseUp={handleSliderMouseUp}
                  onMouseLeave={handleSliderMouseUp}
                  onTouchStart={handleSliderTouchStart}
                  onTouchMove={handleSliderTouchMove}
                  onTouchEnd={handleSliderTouchEnd}
                >
                  {/* After Image (Background) */}
                  <img 
                    src={currentService.afterImage} 
                    alt="After" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Before Image (Clipped) */}
                  <img 
                    src={currentService.beforeImage} 
                    alt="Before" 
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                    }}
                  />
                  
                  {/* Slider Handle */}
                  <div 
                    className="absolute top-0 w-0.5 h-full bg-white cursor-ew-resize z-10"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div className="flex flex-col justify-center order-2 lg:order-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-medium text-primary mb-4 sm:mb-6 text-center lg:text-left">
                  {currentService.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                  {currentService.description}
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById('contact')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  className="self-center lg:self-start"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex justify-center items-center mt-8 gap-8">
            <button
              onClick={prevSlide}
              className="text-2xl text-primary hover:text-accent transition-colors duration-200 p-2"
              aria-label="Previous service"
            >
              ←
            </button>
            
            {/* Slide Indicators */}
            <div className="flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-200',
                    index === currentSlide 
                      ? 'bg-accent' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="text-2xl text-primary hover:text-accent transition-colors duration-200 p-2"
              aria-label="Next service"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
