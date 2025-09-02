import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string
  error?: string
  multiline?: boolean
  rows?: number
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, label, error, multiline = false, rows = 4, ...props }, ref) => {
    const baseClasses = 'w-full px-4 py-3 text-lg border border-gray-300 rounded-lg bg-white outline-none transition-all duration-200 resize-none placeholder:text-gray-400'
    const focusClasses = 'focus:border-accent focus:ring-2 focus:ring-accent/20'
    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
    
    const inputClasses = cn(
      baseClasses,
      focusClasses,
      errorClasses,
      className
    )
    
    if (multiline) {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={inputClasses}
            rows={rows}
            {...props}
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
      )
    }
    
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          className={inputClasses}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
