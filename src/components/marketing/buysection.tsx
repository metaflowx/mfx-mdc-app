import CommonButton from "../ui/CommonButton";

const HowToBuySection: React.FC = () => {
  const steps = [
    // {
    //   title: "How to Buy ",
    //   title1:"AizuCoin",
    //   icon: "/images/buy/aizucoin.png",
    // },
    {
      title: `Choose a Crypto `,
      title1: "Exchange",
      description:
        "Find a reliable cryptocurrency exchange that lists AizuCoin. Popular platforms may include centralized exchanges (CEX) or decentralized exchanges (DEX). Create an account and complete the necessary verification if required.",
      icon: "/images/buy/1.png",
    },
    {
      title: "Deposit Funds ",
      title1: "& Swap",
      description:
        "Deposit funds into your exchange wallet using fiat currency (USD, EUR) or another cryptocurrency (like USDT, ETH, or BNB). Once funded, search for AizuCoin and place an order to buy it.",
      icon: "/images/buy/2.png",
    },
    {
      title: "Secure Your ",
      title1: "AizuCoin",
      description:
        "After purchasing, store your AizuCoin securely in a personal crypto wallet, such as a hardware wallet or a secure software wallet. Avoid keeping large amounts on exchanges to reduce security risks.",
      icon: "/images/buy/3.png",
    },
  ];

  return (
    <section className="py-1 sm:py-16 max-w-7xl mx-auto mt-[0px] sm:mt-[50px]">
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-10 p-4">
        <div
          style={{
            background: "url(/images/buy/token.png)",
            backgroundPosition: "center",
           
          }}
          className="hidden sm:flex items-center justify-center  bg-transparent p-8 text-center text-black rounded-[40px] relative mt-[0] sm:mt-[-160px]"
        >
          <div className="mt-[20px] md:mt-[238px] flex justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center">
              <p className="text-[40px] md:text-[64px] font-[700] text-[#fff] leading-snug">
                How to Buy
              </p>
              <p className="text-[40px] md:text-[64px] font-[700] text-[#fff] leading-snug">
                AizuCoin
              </p>
              <CommonButton title="Buy" width="165px" />
            </div>
           
          </div>
        </div>
        <div
          
          className="block sm:hidden items-center justify-center  bg-transparent  text-center text-black rounded-[40px] relative "
        >
          <img src="/images/buy/token.png"  />
          <div className="flex justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center">
              <p className="text-[40px] md:text-[64px] font-[700] text-[#fff] leading-snug">
                How to Buy
              </p>
              <p className="text-[40px] md:text-[64px] font-[700] text-[#fff] leading-snug">
                AizuCoin
              </p>
              <CommonButton title="Buy" width="165px" />
            </div>
           
          </div>
        </div>
        {steps.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className="flex items-center justify-center border border-[#2865FF] bg-transparent p-8 text-center text-black rounded-[40px]"
              >
                <div>
                  <div className="flex items-center space-x-3">
                    <img src={item.icon} alt="Step Icon" className="sm:w-auto sm:h-auto w-[40px] h-[40px] object-contain" />

                    <div className="text-left pl-3">
                      <p
                        style={{
                          background:
                            "linear-gradient(90deg, #2865FF 0%, #DD4242 100%)",
                          backgroundClip: "text",
                        }}
                        className="text-[20px] sm:text-[35px] font-[700] text-[#2865FF] leading-snug bg-clip-text text-transparent"
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          background:
                            "linear-gradient(90deg, #2865FF 0%, #DD4242 100%)",
                          backgroundClip: "text",
                        }}
                        className="text-[20px] sm:text-[35px] font-[700] text-[#2865FF] leading-snug bg-clip-text text-transparent"
                      >
                        {item.title1}
                      </p>
                    </div>
                  </div>
                  <p className="text-[16px] sm:text-[20px] font-[500] text-white text-left leading-[31px]">
                    {item.description}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default HowToBuySection;
