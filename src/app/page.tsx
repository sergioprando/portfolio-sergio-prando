import { LanguageProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#ECEEE8]">
        <Navbar />
        <main>
          <Hero />
        <Work />
        </main>
        <WhatsAppFAB />
      </div>
    </LanguageProvider>
  );
}
