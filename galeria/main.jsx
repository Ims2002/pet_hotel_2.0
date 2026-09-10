import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/index.css'
import GalleryApp from '../src/pages/GalleryApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GalleryApp />
  </StrictMode>,
)
