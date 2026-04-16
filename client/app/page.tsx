import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Fleet from "@/components/Fleet";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Fleet />
      <Services />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
