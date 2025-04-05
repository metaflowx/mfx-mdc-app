"use client";

import { useEffect, useMemo, useState } from "react";
import CommonButton from "../ui/CommonButton";
import ButtonGradient from "../ui/ButtonGradient";
import Counter from "./counter/Counter";
import { iocConfig, tokenConfig } from "@/constants/contract";
import { useAccount, useReadContracts } from "wagmi";
import { useAppKit, useAppKitNetwork } from "@reown/appkit/react";
import {
  Address,
  erc20Abi,
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";
import { useRouter } from "next/navigation";
import "aos/dist/aos.css";
export default function Hero() {
    const { open, close } = useAppKit();
   const router = useRouter();
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork();
  const [amount, setAmount] = useState<string>("");
  const [coinType, setCoinType] = useState({
    tokenname: "BNB",
    address: zeroAddress,
  });

  // const progressWidth = (progress / max) * 100;

  const result = useReadContracts({
    contracts: [
      {
        ...iocConfig,
        functionName: "getSaleTokenPrice",
        args: [0],
        chainId: Number(chainId) ?? 97,
      },

      {
        ...iocConfig,
        functionName: "saleType2IcoDetail",
        args: [0],
        chainId: Number(chainId) ?? 97,
      },
      {
        ...tokenConfig,
        functionName: "totalSupply",
        chainId: Number(chainId) ?? 97,
      },
      {
        ...iocConfig,
        functionName: "user2SaleType2Contributor",
        args: [address as Address, 0],
        chainId: Number(chainId) ?? 97,
      },
      {
        ...iocConfig,
        functionName: "saleType2IcoDetail",
        args: [0],
        chainId: Number(chainId),
      },
    ],
  });

  const tokenAddress =
    coinType.tokenname === "BNB" ? zeroAddress : coinType.address;

  const calculationresult = useReadContracts({
    contracts: [
      {
        ...iocConfig,
        functionName: "calculateUSDAmount",
        args: [tokenAddress as Address, parseEther(amount)],
        chainId: Number(chainId),
      },
    ],
  });

  const calciulatedToken = useMemo(() => {
    if ((result && result?.data) || amount || calculationresult) {
      const tokenPrice = result?.data && result?.data[0]?.result;
      const dividedVa = calculationresult?.data
        ? (Number(
            formatEther(BigInt(calculationresult?.data[0]?.result ?? 0))
          ) > 0
            ? Number(
                formatEther(BigInt(calculationresult?.data[0]?.result ?? 0))
              )
            : Number(amount)) / Number(formatEther(BigInt(tokenPrice ?? 0)))
        : 0;
      const purchaseToken =
        result &&
        result?.data &&
        result?.data[3]?.result &&
        formatEther(BigInt(result?.data[3]?.result?.volume));
      const tokeninUSD =
        result && result?.data
          ? Number(formatEther(BigInt(result?.data[0]?.result ?? 0)))
          : 0;
      const totalTokenSupply =
        result &&
        result?.data &&
        result?.data[4]?.result &&
        formatEther(BigInt(result?.data[4]?.result?.saleTokenAmount));
      const totalTokenQty =
        result &&
        result?.data &&
        result?.data[4]?.result &&
        formatEther(BigInt(result?.data[4]?.result?.saleQuantity));


      const totalTokenSale =
        result &&
        result?.data &&
        result?.data[4]?.result &&
        formatEther(BigInt(result?.data[4]?.result?.saleTokenAmount));

      const purchaseTokenUSD = Number(purchaseToken) * Number(tokeninUSD);
      const totalTokenSupplyUSD = Number(totalTokenSupply) * Number(tokeninUSD);

      const totalSoldToken = Number(totalTokenSale) - Number(totalTokenQty);
      const totalSaleTokenUSD = Number(totalSoldToken) * Number(tokeninUSD);

      return {
        getToken: dividedVa?.toFixed(2),
        purchaseTokenUSD: purchaseTokenUSD.toFixed(2),
        totalTokenSupplyUSD: totalTokenSupplyUSD,
        totalSale: totalSaleTokenUSD.toFixed(2),
        purchaseToken: Number(purchaseToken).toFixed(2),
      };
    }
  }, [result, amount, calculationresult]);

  const progressWidth =
  (Number(calciulatedToken?.totalSale) /
    Number(calciulatedToken?.totalTokenSupplyUSD)) *
  100;

 
  


  return (
    <main className="min-h-screen  flex items-center justify-center sm:mt-10 mt-10 heroBg">
      <div className="contentbg"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-8">
        <div
          style={{
            background:
              "linear-gradient(180deg, #1AB3E5 0%, rgba(26, 179, 229, 0) 100%)",
            padding: "1px",
          }}
          className="rounded-[20px]"
        >
          <div className="w-auto bg-[#0D0D0D] p-10  rounded-[20px]">
            {/* Countdown Timer */}

            {Math.floor(Date.now() / 1000) <=
            Number(result?.data?.[1]?.result?.startAt) ? (
              <Counter
                label="Sale Starts In"
                targetTime={
                  result &&
                  result.data &&
                  result.data &&
                  result.data[1]?.result &&
                  result.data[1]?.result &&
                  result.data[1]?.result?.startAt
                }
              />
            ) : (
              <Counter
                label="Sale Ends In"
                targetTime={
                  result &&
                  result.data &&
                  result.data &&
                  result.data[1]?.result &&
                  result.data[1]?.result &&
                  result.data[1]?.result?.endAt
                }
              />
            )}

            <div data-aos="fade-right" className="text-center text-white text-[20px] sm:text-[30px] font-[700] py-4">
              <h2 >  ${Number(calciulatedToken?.totalSale) || 0} / ${" "}
              {calciulatedToken?.totalTokenSupplyUSD || 0}</h2>
              <h2>Contribution Receive</h2>
            </div>

            <div
              style={{
                background:
                  "#000",
                border: "1px solid #1AB3E5",
              }}
              className="w-auto h-[20px] rounded-full mb-6"
            >
              <div
                style={{
                  width: `${progressWidth || 0}%`, // Dynamically set width
                  background:
                    "linear-gradient(90deg, #1AB3E5 0%, rgba(26, 179, 229, 0) 100%)",
                  border: "1px solid #1AB3E5",
                }}
                className="h-full rounded-full transition-all duration-300 ease-in-out"
              ></div>
            </div>

            {/* Token Info */}
            <div className="block sm:flex items-center justify-between mb-4 text-[18px] font-[400]">
              <div className="flex items-center gap-2">
                <span className="text-white">Pre-sale</span>
              </div>
              <div className="text-white  sm:mt-0 mt-[15px] text-[18px] font-[400]">
                <span> Public sale</span>
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <img src="/images/home/line.svg" />
            </div>
            <div className="block sm:flex items-center justify-between mt-4 mb-8 text-[18px] font-[400]">
              <div data-aos="fade-right" className="flex items-center gap-2">
                <span className="text-white">USDT Raised</span>
              </div>
              <div data-aos="fade-right" className="text-white sm:mt-0 mt-[15px] text-[18px] font-[700]">
                <span className="text-white"> 0$/0$ = MDC</span>
              </div>
            </div>

            {/* Connect Wallet Button */}

            {address ? (
                        <CommonButton
                          onClick={() => router.push("/dashboard")}
                          title="Dashboard"
                          width="w-full"
                        />
                      ) : (
                        <CommonButton
                          onClick={async () => open()}
                          title="Connect Wallet"
                         width="w-full"
                        />
                      )}

           
          </div>
        </div>

        <div className="flex flex-col text-white justify-center items-center text-left ">
          <h1 data-aos="fade-right" className="w-full  text-[30px] md:text-[60px] font-[700] uppercase">
            Join MDC Coin
          </h1>
          <h2 data-aos="fade-right" className="w-full text-[16px] md:text-[20px] font-[400] uppercase">
            Be a Part of the Decentralized Revolution
          </h2>
          <h3 data-aos="fade-right" className="w-full text-[14px] md:text-[17px] font-[400] py-5">
            Step into the future of innovation and empowerment with MDC Coin.
            Embrace the power of decentralization and redefine how you engage
            with digital ecosystems. With MDC Coin, you’re not just a
            user—you’re a key contributor to a secure, transparent, and
            reward-driven Web3 economy.
          </h3>
          <h2 data-aos="fade-right" className="w-full text-[14px] md:text-[17px] font-[400]">
            Join us today and lead the way in shaping the decentralized future.
          </h2>
          <div data-aos="fade-right" className="flex justify-start w-full mt-10">
            <ButtonGradient btnName="Buy Token" width="w-[195px]" />
            &nbsp;
            <ButtonGradient btnName="Read Whitepaper" width="w-[195px]" />
          </div>
        </div>
      </div>
    </main>
  );
}
