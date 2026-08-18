import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";
import MediaSection from "@/components/MediaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f8f8f8]">
      <Hero />
      <Story />
      <Services />
      <ContactForm />
      <MediaSection />
      <Footer />
    </main>
  );
}
