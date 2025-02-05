import React from "react";
import Chart from "./tokennomics/Chart";

const data = {
  supply: "10,000,000,000",
  presalePrice: "$0.01",
  publicPrice: "$0.06",
  chartData: [
    { name: "100x", value: 25, color: "text-[#6E2CCB]",bg:"linear-gradient(90deg, #6E2CCB 0%, rgba(110, 44, 203, 0) 102.47%)",width:"169px" },
    { name: "Presale", value: 5, color: "text-[#FD9A01]",bg:"linear-gradient(90deg, #FD9A01 0%, rgba(253, 154, 1, 0) 102.47%)",width:"37px" },
    { name: "Public Launch", value: 5, color: "text-[#FFBB28]",bg:"linear-gradient(90deg, #01FD48 0%, rgba(1, 253, 72, 0) 102.47%)",width:"37px" },
    { name: "Reserves", value: 40, color: "text-[#5248EF]" ,bg:"linear-gradient(90deg, #5248EF 0%, rgba(82, 72, 239, 0) 102.47%)",width:"247px"},
    { name: "Team", value: 5, color: "text-[#CD3939]" ,bg:"linear-gradient(90deg, #CD3939 0%, rgba(205, 57, 57, 0) 102.47%)",width:"37px"},
    { name: "Marketing", value: 10, color: "text-[#C156D0]",bg:"linear-gradient(90deg, #C156D0 0%, rgba(193, 86, 208, 0) 102.47%)" ,width:"71px"},
    { name: "Exchange Pool", value: 10, color: "text-[#EF45A1]",bg:"linear-gradient(90deg, #EF45A1 0%, rgba(239, 69, 161, 0) 102.47%)",width:"71px" },
  ],
  prices: [
    { label: "100x Price", value: "$0.0056" },
    { label: "Presale Price", value: "$0.01" },
    { label: "Public Launch", value: "$0.06" },
  ],
};

const TokenomicsPage = () => {
  return (
    <div className="container mx-auto ">
      <div className="text-white  flex flex-col items-center justify-center space-y-6">
        <div className="text-left sm:text-center">
          <h2 className="text-white text-[40px] md:text-[64px] font-bold">Tokenomics</h2>
          <h3 className="text-[#2865FF] text-[30px] md:text-[40px] font-bold">
            Supply: {data.supply}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
          {data.prices.map((item, index) => (
            <div
              key={index}
              style={{
                background:
                  "linear-gradient(90deg, rgba(40, 101, 255, 0) 0%, rgba(221, 66, 66, 0.7) 50%, rgba(40, 101, 255, 0) 100%)",
                border: "1px solid",
                borderImageSource:
                  "linear-gradient(90deg, rgba(40, 101, 255, 0) 0%, #2865FF 50%, rgba(40, 101, 255, 0) 100%)",
              }}
              className="w-[305px] h-[65px] flex items-center justify-center text-white text-lg font-semibold"
            >
              <p>
                {item.label}: {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-20">
        <div className="flex  items-center overflow-hidden">
          <img src="/images/tokenomics/chart.png" className="rotate-image" />
        </div>
        <div >
          {data?.chartData.map((item)=>{
            return(
              <div style={{ border: "1px solid #fff" }} className="rounded-[12px]  py-3 px-5 mt-[20px]">
              <div className="flex items-center">
              <div
                style={{
                  background:item.bg,
                   
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  width:item.width
                }}
                className=" h-[20px]"
              ></div>
              <p className={`${item?.color} text-[24px] font-[500]`}>{item?.value}%</p>
              </div>
              <p className="text-[30px] font-[500] text-white">{item.name}</p>
            </div>
            )
          })}
         
        </div>
      </div>
    </div>
  );
};

export default TokenomicsPage;
