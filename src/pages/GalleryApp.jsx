import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import GalleryFull from './GalleryFull'

export default function GalleryApp() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <GalleryFull />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
