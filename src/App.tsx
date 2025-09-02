
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { useIOSOverscroll } from './hooks/useIOSOverscroll'

function App() {
  // Prevent iOS overscroll
  useIOSOverscroll()
  
  return <RouterProvider router={router} />
}

export default App
