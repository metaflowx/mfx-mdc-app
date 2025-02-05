import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";


import BuySection from "@/components/marketing/buysection";
import Hero from "@/components/marketing/hero";



import AboutSection from "@/components/marketing/aboutsection";

import RoadmapSection from "@/components/marketing/roadmap";
import TokenomicsPage from "@/components/marketing/tokenomics";
import FAQContactSection from "@/components/marketing/accordian";
import FeaturedIn from "@/components/marketing/Featured";
import NewsLetter from "@/components/marketing/NewsLetter";
// import Container from "../global/container";
const HomePage = () => {
    return (
        <Wrapper >
            <Hero />
            <AboutSection />
            <FeaturedIn />
            <BuySection />
            
            <TokenomicsPage />
            <RoadmapSection />
            <FAQContactSection />

            <NewsLetter />
           
        </Wrapper>
    )
};

export default HomePage
