import React, { useState, useRef } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'
import { sendEmail } from '../../lib/emailjs'
import { EMAIL_CONFIG } from '../../config/email'

export const Contact: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver()
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('sending')
    setStatusMessage('')

    try {
      const { success } = await sendEmail(formRef.current!)
      if (success) {
        setSubmitStatus('success')
        setStatusMessage(EMAIL_CONFIG.messages.success)
        setFormData({ name: '', email: '', phone: '', message: '' })
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
          setStatusMessage('')
        }, 5000)
      } else {
        throw new Error('Email send failed')
      }
    } catch (error) {
      console.error('Email send error:', error)
      setSubmitStatus('error')
      setStatusMessage(EMAIL_CONFIG.messages.error)
    } finally {
      // No need to set isSubmitted(true) here, as the status message handles the UI
    }
  }

  const getButtonText = () => {
    if (submitStatus === 'sending') return EMAIL_CONFIG.messages.sending
    if (submitStatus === 'success') return EMAIL_CONFIG.messages.sent
    if (submitStatus === 'error') return EMAIL_CONFIG.messages.tryAgain
    return 'Send Message'
  }

  const getButtonVariant = () => {
    if (submitStatus === 'success') return 'success' as const
    if (submitStatus === 'error') return 'danger' as const
    return 'primary' as const
  }

  return (
    <section 
      id="contact" 
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className={cn(
            'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-medium text-primary mb-4 sm:mb-6 transition-all duration-1000 ease-easing',
            isIntersecting 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          )}>
            Begin Your Transformation
          </h2>
          <p className={cn(
            'text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ease-easing delay-200 px-4',
            isIntersecting 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          )}>
            Ready to reclaim your space and peace of mind? Let's start the conversation about your organizing needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12 xl:gap-16">
          {/* Contact Form */}
          <div className={cn(
            'bg-white p-6 sm:p-8 xl:p-12 rounded-2xl shadow-lg border border-gray-100 transition-all duration-1000 ease-easing delay-300',
            isIntersecting 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          )}>
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-playfair font-medium text-primary mb-3">
                Get Started Today
              </h3>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" ref={formRef}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone number (optional)"
              />
              
              <Input
                label="Tell us about your project"
                name="message"
                multiline
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Describe your organizing needs, timeline, and any specific areas you'd like to focus on..."
              />
              
              <Button
                type="submit"
                variant={getButtonVariant()}
                size="lg"
                className="w-full py-3 sm:py-4 text-base sm:text-lg font-semibold"
                disabled={submitStatus === 'sending'}
              >
                {getButtonText()}
              </Button>
              {statusMessage && (
                <p className={cn(
                  'text-center mt-4',
                  submitStatus === 'success' ? 'text-green-600' : 'text-red-600'
                )}>
                  {statusMessage}
                </p>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className={cn(
            'space-y-6 sm:space-y-8 transition-all duration-1000 ease-easing delay-500',
            isIntersecting 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          )}>
            {/* Contact Details Card */}
            <div className="bg-white p-6 sm:p-8 xl:p-12 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl sm:text-3xl font-playfair font-medium text-primary mb-6 sm:mb-8">
                Let's Connect
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-semibold text-primary">Emma Brown</p>
                    <p className="text-base sm:text-lg text-gray-600">Owner & Professional Organizer</p>
                    <p className="text-base sm:text-lg text-gray-600">Sort It Out</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg text-gray-600">Phone</p>
                    <a href="tel:415-596-3938" className="text-lg sm:text-xl font-semibold text-primary hover:text-accent transition-colors duration-200">
                      415-596-3938
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg text-gray-600">Email</p>
                    <a href="mailto:sortitoutsf@gmail.com" className="text-lg sm:text-xl font-semibold text-primary hover:text-accent transition-colors duration-200">
                      sortitoutsf@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Card */}
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-6 sm:p-8 xl:p-12 rounded-2xl border border-accent/20">
              <h3 className="text-xl sm:text-2xl font-playfair font-medium text-primary mb-4 sm:mb-6">
                Free Consultation
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Start with a complimentary 30-minute consultation where we'll discuss your organizing goals, timeline, and create a personalized plan tailored to your needs.
              </p>
              <div className="bg-white/60 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  ✨ No obligation • No pressure • Just helpful advice
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
