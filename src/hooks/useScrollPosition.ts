import { useState, useEffect, useCallback } from 'react'
import { throttle } from '../lib/utils'

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(false)

  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 50)
      
      // Determine scroll direction
      if (currentScrollY > scrollY) {
        setIsScrollingUp(false)
      } else {
        setIsScrollingUp(true)
      }
    }, 16), // ~60fps
    [scrollY]
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return {
    scrollY,
    isScrolled,
    isScrollingUp,
  }
}
