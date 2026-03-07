import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "ServicePulse — Stop Losing Jobs to Missed Calls",
  description:
    "ServicePulse automatically texts back missed calls, requests Google reviews, and books new customers — built for HVAC, plumbing, and roofing businesses. Start free.",
};

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-16">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Footer />
      </div>
    </main>
  );
}
