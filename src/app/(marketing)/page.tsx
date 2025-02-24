"use client";
import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";

import BuySection from "@/components/marketing/buysection";
import Hero from "@/components/marketing/hero";

import AboutSection from "@/components/marketing/aboutsection";

import RoadmapSection from "@/components/marketing/roadmap";
import TokenomicsPage from "@/components/marketing/tokenomics";
import FAQContactSection from "@/components/marketing/accordian";
import AOS from "aos";
import NewsLetter from "@/components/marketing/NewsLetter";
import MarqueeSlider from "@/components/marketing/MarqueeSlider";
import "aos/dist/aos.css";
import { useEffect } from "react";
// import Container from "../global/container";
const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Wrapper className="px-0 md:px-4">
      <div data-aos="fade-down" className="w-full">
        <Hero />
      </div>

      <MarqueeSlider />

      <div data-aos="fade-up" className="w-full">
        <AboutSection id="about" />
      </div>
      <div data-aos="fade-up" className="w-full">
      <BuySection id="buy" />
      </div>

    
      <div data-aos="fade-up" className="w-full">
      <TokenomicsPage id="tokenomics" />
      </div>

      <div data-aos="fade-up" className="w-full px-4">
      <RoadmapSection id="roadmap" />
      </div>

      <div data-aos="fade-up" className="w-full px-4">
      <FAQContactSection id="faq" />
      </div>
      <div data-aos="fade-up" className="w-full px-4">
      <NewsLetter id="newsletter" />
      </div>
     
     

      
    </Wrapper>
  );
};

export default HomePage;
