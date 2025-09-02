// Email configuration
export const EMAIL_CONFIG = {
  // EmailJS service configuration
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  
  // Email settings
  fromName: 'Sort It Out Contact Form',
  toEmail: 'sortitoutsf@gmail.com',
  
  // Form validation
  requiredFields: ['name', 'email', 'message'],
  
  // Success/error messages
  messages: {
    success: 'Thank you! Your message has been sent successfully.',
    error: 'Sorry, there was an error sending your message. Please try again or contact us directly.',
    sending: 'Sending...',
    sent: 'Message Sent!',
    tryAgain: 'Try Again'
  }
}
