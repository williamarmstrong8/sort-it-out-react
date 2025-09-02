import React from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  as?: React.ElementType
  href?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', as: Component = 'button', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-400 ease-easing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
    
    const variants = {
      primary: 'text-white border-2 border-accent bg-accent hover:bg-accent/90 hover:scale-105 focus-visible:ring-accent',
      secondary: 'text-accent border-2 border-accent bg-transparent hover:bg-accent hover:text-white focus-visible:ring-accent',
      outline: 'text-primary border-2 border-primary bg-transparent hover:bg-primary hover:text-white focus-visible:ring-primary',
      success: 'text-white border-2 border-green-600 bg-green-600 hover:bg-green-700 hover:scale-105 focus-visible:ring-green-600',
      danger: 'text-white border-2 border-red-600 bg-red-600 hover:bg-red-700 hover:scale-105 focus-visible:ring-red-600'
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }
    
    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      className
    )
    
    if (Component === 'a' && props.href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          href={props.href}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      )
    }
    
    return (
      <Component
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Button.displayName = 'Button'
