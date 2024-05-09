import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

export function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <HelmetProvider>
        <Helmet titleTemplate="%s | pizza.shop" />
        <RouterProvider router={router} />
      </HelmetProvider>
    </div>
  )
}
