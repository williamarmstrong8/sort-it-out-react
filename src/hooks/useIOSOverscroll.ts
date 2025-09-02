import { useEffect } from 'react'

export const useIOSOverscroll = () => {
  useEffect(() => {
    // Check if we're on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    if (!isIOS) return

    // Prevent overscroll on iOS
    const preventOverscroll = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      const scrollTop = target.scrollTop
      const scrollHeight = target.scrollHeight
      const height = target.clientHeight
      const delta = e.touches[0].clientY - (e as any).initialTouchY

      // Prevent overscroll at the top
      if (scrollTop === 0 && delta > 0) {
        e.preventDefault()
      }
      
      // Prevent overscroll at the bottom
      if (scrollTop + height >= scrollHeight && delta < 0) {
        e.preventDefault()
      }
    }

    // Add touch event listeners
    document.addEventListener('touchstart', (e) => {
      ;(e as any).initialTouchY = e.touches[0].clientY
    }, { passive: false })

    document.addEventListener('touchmove', preventOverscroll, { passive: false })

    // Cleanup
    return () => {
      document.removeEventListener('touchmove', preventOverscroll)
    }
  }, [])
}
