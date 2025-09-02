import React from 'react'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'

interface SiteLayoutProps {
  children: React.ReactNode
}

export const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-0">
        {children}
      </main>
      <Footer />
    </div>
  )
}
