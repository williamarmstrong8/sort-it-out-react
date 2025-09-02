
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { SiteLayout } from './layouts/SiteLayout'
import { SimpleLayout } from './layouts/SimpleLayout'
import { Home } from './pages/Home'
import { ThankYou } from './pages/ThankYou'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout><Home /></SiteLayout>,
    
  },
  {
    path: '/thank-you',
    element: <SimpleLayout><ThankYou /></SimpleLayout>,
    
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
])
