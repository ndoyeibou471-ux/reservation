import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './app/routes'
import { BookingProvider } from './app/context/BookingContext'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BookingProvider>
      <RouterProvider router={router} />
    </BookingProvider>
  </React.StrictMode>,
)