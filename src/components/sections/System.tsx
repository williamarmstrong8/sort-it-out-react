import React from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { cn } from '../../lib/utils'

export const System: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver()

  const systemSteps = [
    {
      number: 1,
      label: 'Sort',
      description: 'Everything is gathered, cleaned, and sorted into simple, clear categories.'
    },
    {
      number: 2,
      label: 'Select',
      description: 'Thoughtfully choose what stays, with the support to let go of what no longer serves you.'
    },
    {
      number: 3,
      label: 'Store',
      description: 'Items are returned and stored in a practical, contained and visually pleasing way, to suit your space.'
    }
  ]

  return (
    <section 
      id="system" 
      ref={ref}
      className="py-32 px-8 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className={cn(
          'bg-white rounded-2xl shadow-card p-16 flex flex-col items-start relative overflow-hidden transition-all duration-1000 ease-easing',
          isIntersecting 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        )}>
          <h2 className="text-4xl sm:text-5xl font-playfair font-medium text-primary mb-9 relative z-10">
            The Sort it Out 3 'S' System: <span className="text-accent">Sort. Select. Store.</span>
          </h2>
          
          <p className="text-lg text-gray-600 mb-11 leading-relaxed relative z-10 max-w-4xl">
            At Sort It Out, a simple and effective three-step approach transforms your space with clarity and purpose.
          </p>
          
          <div className="flex justify-between items-start w-full mb-4 relative z-10">
            {systemSteps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center flex-1 relative">
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-playfair font-bold mb-2 shadow-lg transition-transform duration-250 ease-easing hover:scale-105">
                  {step.number}
                </div>
                <div className="text-2xl font-playfair font-black text-primary mb-1 tracking-wider">
                  {step.label}
                </div>
                <div className="text-base text-gray-600 text-center max-w-56 mb-2">
                  {step.description}
                </div>
                
                {/* Connector line between steps */}
                {index < systemSteps.length - 1 && (
                  <div className="absolute top-6 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-accent/60 z-0 hidden lg:block"></div>
                )}
              </div>
            ))}
          </div>
          
          <blockquote className="font-playfair text-xl italic text-primary mt-9 pl-8 py-4 bg-gray-50 rounded-r-xl border-l-4 border-accent shadow-sm relative z-10">
            Simple. Supportive. Sorted.
          </blockquote>
        </div>
      </div>
    </section>
  )
}
