import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="p-10 bg-gray-100 min-h-screen">
      HOLA
    </div>
  </StrictMode>,
)
