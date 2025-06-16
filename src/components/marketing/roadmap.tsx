"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const roadmapData = [
  {
    yaer: "Q1 2025",
    quarter: "Phase 1",
    milestone: "Foundation(0 to 45 Days)",
    description:
      "Define clear project goals, publish a comprehensive whitepaper, design robust tokenomics, and develop secure, audited smart contracts to ensure transparency, sustainability, and trust within the blockchain ecosystem.",
    img: "/images/roadmap/raodline.png",
    transalte: "-translate-x-[11%]",
    textColor: "text-[#E03347]",
  },
  {
    yaer: "Q2 2025",
    quarter: "Phase 2",
    milestone: "Launch & Adoption(46 to 90 Days)",
    description:
      "Launch the MDC Coin token on testnet and mainnet, form strategic partnerships, build a strong community through social media and airdrops, and develop staking and Voting Right Community (VC) contracts.",
    img: "/images/roadmap/roadlineleft.png",
    transalte: "-translate-x-[96%]",
    textColor: "text-[#FFA700]",
  },
  {
    yaer: "Q3 2025",
    quarter: "Phase 3",
    milestone: "Ecosystem Development(91 to 180 Days)",
    description:
      "Launch the MDC Coin token, initiate the public sale and ICO, and drive adoption through targeted marketing campaigns, AMAs, and strategic collaborations with influencers and key industry figures.",
    img: "/images/roadmap/raodline.png",
    transalte: "-translate-x-[11%]",
    textColor: "text-[#1F84FF]",
  },
  {
    yaer: "Q4 2025",
    quarter: "Phase 4",
    milestone: "Foundation (6 to 12 months)",
    description:
      "Expand MDC Coin use cases through payments, staking, and governance; integrate with dApps; launch a decentralized autonomous organization (DAO); enhance security measures; and incentivize long-term holders for ecosystem growth.",
    img: "/images/roadmap/roadlineleft.png",
    transalte: "-translate-x-[96%]",
    textColor: "text-[#19A02D]",
  },
  {
    yaer: "Q5 2025",
    quarter: "Phase 5",
    milestone: "Launch & Adoption(12 to 18 months)",
    description:
      "List MDC Coin on major exchanges, launch Android and iOS applications, initiate live movie streaming, and introduce a watch-to-earn rewards system to boost user engagement and platform adoption",
    img: "/images/roadmap/raodline.png",
    transalte: "-translate-x-[11%]",
    textColor: "text-[#8E73FB]",
  },
  {
    yaer: "Q6 2025",
    quarter: "Phase 6",
    milestone: "Ecosystem Development(18 to 24 months)",
    description:
      "Sign a contract with a PR agency, collaborate with like-minded communities, and establish a complete ecosystem to strengthen brand presence, foster growth, and ensure long-term sustainability.",
    img: "/images/roadmap/roadlineleft.png",
    transalte: "-translate-x-[96%]",
    textColor: "text-[#CE133C]",
  },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  centerMode: true,
  centerPadding: "30px",
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        centerPadding: "20px",
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerPadding: "10px",
      },
    },
  ],
};

const RoadmapSection = ({ id }: { id: string }) => {
  return (
    <div
      id={id}
      className="bg-transparent  text-white flex flex-col items-start container mx-auto py-0 md:py-[50px] "
    >
      <h2
        data-aos="fade-right"
        className="text-[30px] sm:text-[64px] font-[700] mb-4"
      >
        Roadmap
      </h2>
      <p
        data-aos="fade-right"
        className="text-left max-w-5xl mb-12 text-white text-[18px] sm:text-[24px] font-[500]"
      >
        MDC Coin aims to revolutionize the crypto space with innovation,
        scalability, real-world utility, and a community-driven ecosystem.
      </p>

      <div className="w-full px-4">
        <Slider {...settings}>
          {roadmapData.map((item, index) => (
            <div
              key={index}
              className="flex justify-center px-2 relative h-[100%]"
            >
              <div className="absolute top-[0px] left-[10px] h-[100%]">
                <p className="text-[#999999] text-[20px] font-[400] ">
                  {item.yaer}
                </p>

                <div
                  style={{
                    border: "1px solid #1D1D20",
                    height: "80px",
                    width: "1px",
                  }}
                  className="mx-auto"
                ></div>
              </div>

              <div className="roadmapBg min-h-[301px] mt-[74px] p-[1px] rounded-[30px]  overflow-hidden  transition-all duration-300 ease-in-out hover:scale-95 ">
                <div className="bg-[#101012] p-4 hover:bg-[#1A1A1A]  shadow-lg rounded-[30px]  min-h-[301px]">
                  <div className=" h-[40px] rounded-[6px] text-center flex justify-start items-center pt-10">
                    <img src="/images/roadmap/circle.png" />
                    <h3 className={`text-[30px] font-[700]  text-white pl-5`}>
                      {item.quarter}
                    </h3>
                  </div>
                  <p
                    data-aos="fade-right"
                    className="text-[18px] md:text-[20px] font-[400] text-white pt-10"
                  >
                    {item.milestone}
                  </p>
                  <p
                    data-aos="fade-left"
                    className="text-[15px] md:text-[16px] font-[400] text-[#999999] "
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RoadmapSection;
