"use client";
import Navbar from "../components/Navbar";
import Redirect from "@/components/Redirect";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  Redirect();
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <Navbar />
      <Hero />
      <Features />
      <Cta />
      <Footer />
    </main>
  );
}
