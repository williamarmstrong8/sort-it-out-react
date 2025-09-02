import React from 'react'
import { Button } from '../components/ui/Button'

export const ThankYou: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-[80vh] flex items-start justify-center pt-60">
      <div className="bg-white shadow-card rounded-2xl max-w-lg w-full p-12 text-center">
        <img 
          src="/assets/logo-black.png" 
          alt="Sort It Out Logo" 
          className="h-20 mx-auto mb-6"
        />
        <h1 className="font-playfair text-4xl font-medium text-primary mb-4">
          Thank You!
        </h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          Your message has been received.<br />
          We'll be in touch soon to help you get beautifully sorted.
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={scrollToTop}
          className="hover:scale-105 transition-transform duration-250 ease-easing"
        >
          Return Home
        </Button>
      </div>
    </div>
  )
}
