import React from "react";

const roadmapData = [
  { quarter: "Q1-2024", milestone: "Milestone #01", description: "3 AIZU B2B AI Tools Launch", color: "radial-gradient(94.42% 94.42% at 85.5% 9%, #FF6E27 0%, #E03347 99.8%)",img:"/images/roadmap/raodline.png",transalte:"-translate-x-[11%]",textColor:"text-[#E03347]" },
  { quarter: "Q2-2024", milestone: "Milestone #02", description: "100X Program", color: "radial-gradient(94.42% 94.42% at 85.49% 9%, #FFD328 0%, #FFA700 100%)",img:"/images/roadmap/roadlineleft.png", transalte:"-translate-x-[96%]",textColor:"text-[#FFA700]"},
  { quarter: "Q1-2025", milestone: "Milestone #03", description: "$AIZU Coin Presale", color: "radial-gradient(94.42% 94.42% at 85.47% 9%, #00E0FF 0%, #1F84FF 99.44%)" ,img:"/images/roadmap/raodline.png",transalte:"-translate-x-[11%]",textColor:"text-[#1F84FF]"},
  { quarter: "Q2-2025", milestone: "Milestone #04", description: "$AIZU Coin Public Launch", color: "radial-gradient(94.42% 94.42% at 85.46% 9%, #56FF27 0%, #19A02D 99.8%)",img:"/images/roadmap/roadlineleft.png",transalte:"-translate-x-[96%]",textColor:"text-[#19A02D]" },
  { quarter: "Q3-2025", milestone: "Milestone #05", description: "Exchange Listing", color: "radial-gradient(94.42% 94.42% at 85.46% 9%, #605ACE 0%, #8E73FB 99.8%)",img:"/images/roadmap/raodline.png",transalte:"-translate-x-[11%]",textColor:"text-[#8E73FB]" },
  { quarter: "Q4-2025", milestone: "Milestone #06", description: "AIZU NFT", color: "radial-gradient(94.42% 94.42% at 85.44% 9%, #FF2897 0%, #CE133C 100%)",img:"/images/roadmap/roadlineleft.png",transalte:"-translate-x-[96%]", textColor:"text-[#CE133C]" }
];

const RoadmapSection = () => {
  return (
    <div className="bg-transparent min-h-screen text-white flex flex-col items-start sm:items-center py-[50px] md:py-[150px] ">
      <h2 className="text-[40px] sm:text-[64px] font-[700] mb-4">Roadmap</h2>
      <p className="text-left sm:text-center max-w-5xl mb-12 text-white text-[18px] sm:text-[24px] font-[500]">
        AizuCoin is committed to revolutionizing the crypto space with a structured and strategic development plan. 
        Our roadmap outlines key milestones to ensure steady growth, innovation, and community engagement.
      </p>
      
      <div className="relative flex flex-col items-start sm:items-center w-full">
      <div 
  className="absolute top-0 bottom-0 w-1 border-l-2 border-white border-dashed"
  style={{ background: "transparent" }} 
/>
        {roadmapData.map((item, index) => (
          <div key={index} className="flex items-center w-full max-w-2xl mb-8 relative">
            <div style={{background:item.color}} className={`w-6 h-6 rounded-full  absolute left-0 sm:left-1/2 transform -translate-x-1/2 z-10 `} />
            <img src={item?.img} className={`hidden sm:block absolute left-0 sm:left-1/2 transform -translate-x-[11%] z-1  ${item?.transalte}`} />
            <img src="/images/roadmap/raodline.png" className={`block sm:hidden absolute left-0 sm:left-1/2 transform -translate-x-[11%] z-1`} />

            

            <div 
            style={{border: "1px solid #2D67FE",background: "linear-gradient(180deg, #2865FF 0%, rgba(40, 101, 255, 0) 100%)"
            }}
            className={`hidden sm:block w-[285px] p-4 rounded-lg shadow-lg  
              ${index % 2 === 0 ? "ml-auto" : "mr-auto"}`}
            
            >
              <div className="bg-[#112453] h-[40px] rounded-[6px] text-center flex justify-center items-center">
              <h3 className={`text-lg font-semibold ${item?.textColor}`}>{item.quarter}</h3>
              </div>
             
              <p className="text-[20px] font-[700] text-white text-center pt-2">{item.milestone}</p>
              <p className="text-[18px] font-[400] text-gray-300 text-center">{item.description}</p>
            </div>
            <div 
            style={{border: "1px solid #2D67FE",background: "linear-gradient(180deg, #2865FF 0%, rgba(40, 101, 255, 0) 100%)"
            }}
            className={`block sm:hidden w-[285px] p-4 rounded-lg shadow-lg  
              ${index % 2 === 0 ? "ml-auto" : "ml-auto"}`}
            
            >
              <div className="bg-[#112453] h-[40px] rounded-[6px] text-center flex justify-center items-center">
              <h3 className={`text-lg font-semibold ${item?.textColor}`}>{item.quarter}</h3>
              </div>
             
              <p className="text-[20px] font-[700] text-white text-center pt-2">{item.milestone}</p>
              <p className="text-[18px] font-[400] text-gray-300 text-center">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapSection;