import Link from "next/link";
import React from "react";

interface Step {
  point: string;
  title: string;
  des: string;
}

const stepPoint: Step[] = [
  {
    point: "⦿",
    title: "Step 1: Submit Your ERC20 Wallet Address",
    des: "Provide your ERC20 Wallet address to qualify for the giveaway."
  },
  {
    point: "⦿",
    title: "Step 2: Complete All the Quests",
    des: "Follow all the steps carefully to maximize your chance of winning. Don't miss any!"
  },
  {
    point: "⦿",
    title: "Step 3: Refer Friends and Boost Your Entries",
    des: "+50 entries for every friend you refer. More referrals, more chances to win."
  }
];

const footerLink=[
  {
    logo:"/footer/twittericon.png",
    url:""
  },
  {
    logo:"/footer/instagramicon.png",
    url:""
  },
  {
    logo:"/footer/linkedingicon.png",
    url:""
  },
  {
    logo:"/footer/facebookicon.png",
    url:""
  },
  {
    logo:"/footer/telegramicon.png",
    url:""
  },
  {
    logo:"/footer/discordicon.png",
    url:""
  },
]



export default function MillinareGiveway() {

 


  return (
    <div className="py-5 md:py-20 text-left sm:text-center">
      <h2 data-aos="fade-right" className="text-[20px] md:text-[60px] font-[700]">
        Millionaire Giveaway
      </h2>

      <h2 data-aos="fade-right" className="text-[16px] md:text-[24px] font-[700] pb-1 pt-1">
      MDC Coin $1,000,000 Giveaway 
      </h2>
      <p  data-aos="fade-right" className="text-[16px] md:text-[20px] font-[400] max-w-[1200px] mx-auto">
      We're excited to announce the launch of MDC Coin with an amazing chance for 20 lucky winners to win $50,000 USDT each! 
      </p>
      <h2 data-aos="fade-right" className="text-[16px] md:text-[24px] font-[700] pb-1 pt-2">
      Join now and share with your friends for a chance to win!
      </h2>
      <h3 data-aos="fade-right" className="text-[16px] md:text-[24px] font-[400] pb-10 pt-2">
      Note: A minimum $100 participation in the MDC Coin Presale is required to be eligible.
      </h3>

      <div
        style={{
          background:
            " linear-gradient(180deg, #1AB3E5 0%, rgba(26, 179, 229, 0) 100%)",
        }}
        className="p-[1px] rounded-[20px] pb-[40px]"
      >
        <div style={{ background: "#000000" }} className=" rounded-[20px] px-6 pb-[40px]">
          <h3 data-aos="fade-right" className="text-[30px] pt-10 md:text-[60px] font-[700] md:leading-[60px] leading-[30px] text-[#1AB3E5]">
          Join now and secure your spot 
          </h3>
          <h3 data-aos="fade-right" className="pt-1 text-[30px] md:text-[60px] font-[700] md:leading-[60px] leading-[30px] text-[#1AB3E5]">
            among the winners!
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 mt-10 pb-5 gap-8 ">
            <div
              style={{
                background: "linear-gradient(180deg, #1AB3E5 0%, rgba(26, 179, 229, 0) 100%)"

              }}
              className="h-[100%] rounded-[8px] p-[1px] "
            >
              <div className="h-[100%] px-4 flex flex-col justify-end items-end border border-[#2D67FE] rounded-[8px]">
                <h3 data-aos="fade-right" className="text-20px sm:text-[37px] font-[700] pt-5 text-center">
                  Follow these steps for your shot at winning $50,000. Good
                  luck!
                </h3>
                <div
                  style={{
                    border: "1px solid #2D67FE80",
                    boxShadow: "0px 0px 8px 0px #2D67FE80",
                  }}
                  className="rounded-[8px] flex justify-center items-center w-full  
      transition-all duration-300 ease-in-out transform  
      hover:shadow-[0px_0px_16px_4px_#2D67FE80] mt-10  mb-5"
                >
                  <h6 data-aos="fade-right" className="text-[16px] md:text-[24px] font-[500] py-3">
                    Website:{" "}
                    <span className="underline"> https://mdccoin.com</span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="h-[100%]">
              {stepPoint.map((item,index)=>{
                return(
                  <div key={index} className="text-left pb-5 pt-2" >
                    <p className="text-[#2D67FE] text-[24px] " >{item?.point} <span className="text-white text-[24px] font-[700] ">{item?.title}</span> </p>
                    <h4 className="text-white text-[24px] font-[400] ">{item?.des}</h4>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            style={{
              background:
                "linear-gradient(180deg, #1AB3E5 0%, rgba(26, 179, 229, 0) 50%, #1AB3E5 100%)",
            }}
            className="p-[1px] rounded-[20px] overflow-hidden "
          >
            <div style={{ background: "#000000" }} className=" rounded-[20px] relative ">
              <img src="/images/giveway/giveway.jpg" className="w-full rounded-[20px] " />

              <div className="flex justify-center items-center mt-[-50px] pb-[20px]">
                {footerLink.map((item,index)=>{
                  return(
                    <div className=" rounded-full mr-3" >
                      <Link href={item.url} >
                      <img src={item.logo} />
                      </Link>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
