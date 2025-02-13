"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const roadmapData = [
  {
    yaer: "Q1 2025",
    quarter: "Phase 1",
    milestone: "Foundation",
    description:
      "Define goals, publish a whitepaper, design tokenomics, develop secure smart contracts, and build a community through social media and airdrops.",
    img: "/images/roadmap/raodline.png",
    transalte: "-translate-x-[11%]",
    textColor: "text-[#E03347]",
  },
  {
    yaer: "Q2 2025",
    quarter: "Phase 2",
    milestone: "Launch & Adoption",
    description:
      "Launch the MDC Coin token, testnet, form partnerships, list on exchanges, and drive adoption through marketing, AMAs, and influencer collaborations.",
    img: "/images/roadmap/roadlineleft.png",
    transalte: "-translate-x-[96%]",
    textColor: "text-[#FFA700]",
  },
  {
    yaer: "Q3 2025",
    quarter: "Phase 3",
    milestone: "Ecosystem Development",
    description:
      "Expand use cases with payments, staking, and governance, integrate with dApps, launch a DAO, enhance security, and incentivize long-term holders.",
    img: "/images/roadmap/raodline.png",
    transalte: "-translate-x-[11%]",
    textColor: "text-[#1F84FF]",
  },
  {
    yaer: "Q4 2025",
    quarter: "Phase 4",
    milestone: "Foundation",
    description:
      "Expand use cases with payments, staking, and governance, integrate with dApps, launch a DAO, enhance security, and incentivize long-term holders.",
    img: "/images/roadmap/roadlineleft.png",
    transalte: "-translate-x-[96%]",
    textColor: "text-[#19A02D]",
  },
  {
    yaer: "Q5 2025",
    quarter: "Phase 5",
    milestone: "Launch & Adoption",
    description:
      "Expand use cases with payments, staking, and governance, integrate with dApps, launch a DAO, enhance security, and incentivize long-term holders.",
    img: "/images/roadmap/raodline.png",
    transalte: "-translate-x-[11%]",
    textColor: "text-[#8E73FB]",
  },
  {
    yaer: "Q6 2025",
    quarter: "Phase 6",
    milestone: "Ecosystem Development",
    description:
      "Expand use cases with payments, staking, and governance, integrate with dApps, launch a DAO, enhance security, and incentivize long-term holders.",
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

const RoadmapSection = () => {
  return (
    <div className="bg-transparent  text-white flex flex-col items-start container mx-auto py-[50px] ">
      <h2 className="text-[40px] sm:text-[64px] font-[700] mb-4">Roadmap</h2>
      <p className="text-left max-w-5xl mb-12 text-white text-[18px] sm:text-[24px] font-[500]">
        MDC Coin aims to revolutionize the crypto space with innovation,
        scalability, real-world utility, and a community-driven ecosystem.
      </p>

      <div className="w-full px-4">
        <Slider {...settings}>
          {roadmapData.map((item, index) => (
            <div key={index} className="flex justify-center px-2 relative h-[100%]">
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

              <div
                style={{
                  // border: "1px solid",
                  background:
                    "linear-gradient(231.41deg, #1AB3E5, rgba(3, 79, 137, 0) , #1AB3E5 )",
                }}
                className="min-h-[301px] mt-[74px] p-[1px] rounded-[30px]  overflow-hidden"
              >
                <div
                  style={{
                    // border: "1px solid #2D67FE",
                    background: "#101012",
                  }}
                  className=" p-4  shadow-lg rounded-[30px]  min-h-[301px]"
                >
                  <div className=" h-[40px] rounded-[6px] text-center flex justify-start items-center pt-10">
                    <img src="/images/roadmap/circle.png" />
                    <h3 className={`text-[30px] font-[700]  text-white pl-5`}>
                      {item.quarter}
                    </h3>
                  </div>
                  <p className="text-[24px] font-[400] text-white pt-10">
                    {item.milestone}
                  </p>
                  <p className="text-[18px] font-[400] text-[#999999] ">
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
