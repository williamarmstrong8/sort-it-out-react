import emailjs from '@emailjs/browser'
import { EMAIL_CONFIG } from '../config/email'

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAIL_CONFIG.publicKey)
}

// Send email function
export const sendEmail = async (formElement: HTMLFormElement) => {
  try {
    const result = await emailjs.sendForm(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      formElement,
      EMAIL_CONFIG.publicKey
    )
    return { success: true, result }
  } catch (error) {
    console.error('EmailJS error:', error)
    return { success: false, error }
  }
}
