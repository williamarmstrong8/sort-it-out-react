import React from 'react'
import { Navbar } from '../components/ui/Navbar'

interface SimpleLayoutProps {
  children: React.ReactNode
}

export const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white/85 to-white/85 bg-cover bg-center bg-no-repeat bg-fixed"
         style={{
           backgroundImage: `url('https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1500&q=80')`
         }}>
      <Navbar />
      <main className="pt-32">
        {children}
      </main>
    </div>
  )
}
