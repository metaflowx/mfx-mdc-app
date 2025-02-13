import { Box, Typography } from "@mui/material";
import CommonButton from "../ui/CommonButton";
import Image from "next/image";

const HowToBuySection: React.FC = () => {
  const steps = [
    {
      title: `Connect Your Wallet`,
      title1: "Exchange",
      description:
        "Download and set up a compatible wallet like MetaMask or Trust Wallet. These wallets ensure secure storage of your MDC Coins and allow seamless access to the blockchain network. Once installed, configure your wallet to connect to the appropriate blockchain supporting MDC Coin.",
      icon: "/images/buy/1.png",
    },
    {
      title: "Exchange for Token",
      title1: "& Swap",
      description:
        "To buy MDC Coin, you’ll need cryptocurrency like USDT, ETH, or BNB in your wallet. Purchase these from trusted exchanges such as Binance or Coinbase, then transfer them to your crypto wallet. Ensure you have a small amount of native blockchain tokens (e.g., ETH for Ethereum) to cover transaction fees.",
      icon: "/images/buy/2.png",
    },
    {
      title: "Start Buying and Selling",
      title1: "AizuCoin",
      description:
        "Visit the MDC Coin official platform or a supported Decentralized Exchange (DEX). Connect your wallet securely, search for MDC Coin, and swap your existing cryptocurrency for MDC Coin. Confirm the transaction, and your MDC Coins will appear in your wallet shortly.",
      icon: "/images/buy/3.png",
    },
  ];

  return (
    <Box component={'section'} className="py-1  container mx-auto mt-[0px] ">
      <Box>
        <Typography variant="h2" className="text-left md:text-center text-[40px] md:text-[60px] font-[700] mb-5">How to buy Token?</Typography>
      </Box>
      <Box  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-10 p-4">
        {steps.map((item, index) => {
          return (
            <>
              <Box
                style={{
                  boxShadow: "0px 4px 4px 0px #00000040",
                  border: " 1px solid",
                  borderImageSource:
                    "linear-gradient(180deg, #1AB3E5 0%, rgba(3, 79, 137, 0) 50%, #1AB3E5 100%)",
                    height:"100%"
                }}
                key={index}
              >
                <Box
                  style={{
                    background:
                      "linear-gradient(161.33deg, #1AB3E5 -8.77%, #034F89 75.94%)",
                      height:"100%"
                  }}
                  
                  className="flex flex-col  bg-transparent py-8 text-center text-black rounded-[16px]"
                >
                  <Box className="flex items-center space-x-3">
                    <Image
                      src={item.icon}
                      alt="Step Icon"
                      className="sm:w-auto sm:h-auto w-[40px] h-[40px] object-contain ml-10"
                      width={40} height={40}
                    />

                    <Box
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(3, 79, 137, 0) 0%, #034F89 100%)",
                        height: "50px",
                      }}
                      className="text-left pl-3 flex items-center justify-center w-full"
                    >
                      <Typography className="text-[19px]  font-[700] text-white leading-snug">
                        {item.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="p-8">
                    <Typography className="text-[1px] sm:text-[18px] font-[400] text-white text-left leading-[31px]">
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export default HowToBuySection;
