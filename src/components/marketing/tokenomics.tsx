import React from "react";
import Chart from "./tokennomics/Chart";

const data = {
  supply: "10,000,000,000",
  presalePrice: "$0.01",
  publicPrice: "$0.06",
  chartData: [
    {
      name: "Watch To Earn Reward(25%)",
      value: 25,
      color: "text-[#6E2CCB]",
      bg: "#F9BC01",
      width: "169px",
    },
    {
      name: "Management(10%)",
      value: 5,
      color: "text-[#FD9A01]",
      bg: "#FE2712",
      width: "37px",
    },
    {
      name: "Backup & Reverse(5%)",
      value: 5,
      color: "text-[#FFBB28]",
      bg: "#0247FC",
      width: "37px",
    },
    {
      name: "Pre-sale(10%)",
      value: 40,
      color: "text-[#5248EF]",
      bg: "#FD9A01",
      width: "247px",
    },
    {
      name: "Exchange Liquidity(10%)",
      value: 5,
      color: "text-[#CD3939]",
      bg: "#A7184D",
      width: "37px",
    },
    {
      name: "Legal & Compliances(5%)",
      value: 10,
      color: "text-[#C156D0]",
      bg: "#0392CE",
      width: "71px",
    },
    {
      name: "Marketing(10%)",
      value: 10,
      color: "text-[#EF45A1]",
      bg: "#FD5306",
      width: "71px",
    },
    {
      name: "Development(10%)",
      value: 10,
      color: "text-[#EF45A1]",
      bg: "#8601B0",
      width: "71px",
    },
    {
      name: "VC Contact(4%)",
      value: 10,
      color: "text-[#EF45A1]",
      bg: "#68B033",
      width: "71px",
    },
    {
      name: "Airdrop(1%)",
      value: 10,
      color: "text-[#EF45A1]",
      bg: "#FEFF35",
      width: "71px",
    },
    {
      name: "Content Creator(5%)",
      value: 10,
      color: "text-[#EF45A1]",
      bg: "#3C02A6",
      width: "71px",
    },
    {
      name: "Staking Reward(4%)",
      value: 10,
      color: "text-[#EF45A1]",
      bg: "#D1EA2C",
      width: "71px",
    },
    {
      name: "Referral Reward1%",
      value: 10,
      color: "text-[#EF45A1]",
      bg: "#C1C212",
      width: "71px",
    },
  ],
  prices: [
    { label: "100x Price", value: "$0.0056" },
    { label: "Presale Price", value: "$0.01" },
    { label: "Public Launch", value: "$0.06" },
  ],
};

const TokenomicsPage = () => {
  return (
    <div
      style={{
        background: "url(/images/tokenomics/tokenomicabg.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto mt-[50px] pb-[50px] ">
        <div className="text-white  flex flex-col items-center justify-center space-y-6">
          <div className="text-left sm:text-center">
            <h2 className="text-white text-[40px] md:text-[60px] font-bold">
              Tokenomics
            </h2>
            <h3 className="text-white text-[30px] md:text-[40px] font-[700]">
              Total Supply
            </h3>
            <h3 className="text-white text-[30px] md:text-[50px] font-[400]">
              {data.supply}
            </h3>
          </div>

          <div className="flex  items-center overflow-hidden">
            <img src="/images/tokenomics/chartimg.png" />
          </div>
        </div>
        <div
          style={{
            background:
              "linear-gradient(1deg, #1AB3E5 0%, rgba(26, 179, 229, 0) 100%)",
              padding:"1px"
          }}
          className="rounded-[20px] mt-20 "
        >
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 1%, rgba(0, 0, 0, 1) 96.72%)",
            }}
            className="relative grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 rounded-[20px] p-6"
          >
            {data?.chartData.map((item) => {
              return (
                <div className="rounded-[12px]  py-1 px-5 mt-[10px]">
                  <div className="flex items-center">
                    <div
                      style={{
                        background: item.bg,
                      }}
                      className=" h-[36px] w-[36px] rounded-full"
                    ></div>
                    <p className={`${item?.color} text-[24px] font-[500]`}>
                      <p className="text-[24px] font-[400] text-white pl-2">
                        {item.name}
                      </p>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsPage;
