import React from "react";
import HeroSection from "../../components/HeroSection";
import VisiMisiSection from "../../components/VisiMisiSection";
import CardCarousel from "../../components/CardCarousel";
import Footer from "@/components/Footer";
import PengumumanDialog from "@/components/Pengumuman";
export default function App() {
  return (
    <div className="">
      <PengumumanDialog />
      <div className="">
        <section className="">
          <HeroSection />
        </section>
        <section className="">
          <VisiMisiSection />
        </section>
        <section className="">
          <CardCarousel />
        </section>
        <section className="">
          <Footer />
        </section>
      </div>
    </div>
  );
}
