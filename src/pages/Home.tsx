import React from 'react'
import { Hero } from '../components/sections/Hero'
import { System } from '../components/sections/System'
import { Services } from '../components/sections/Services'
import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <System />
      <Services />
      <About />
      <Contact />
    </>
  )
}
