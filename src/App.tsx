import { LanguageProvider } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Work from '@/components/Work'
import Career from '@/components/Career'
import WhatsAppFAB from '@/components/WhatsAppFAB'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#ECEEE8]">
        <Navbar />
        <main>
          <Hero />
          <Work />
          <Career />
        </main>
        <Footer />
        <WhatsAppFAB />
      </div>
    </LanguageProvider>
  )
}
