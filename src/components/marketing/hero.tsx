"use client";

import { useEffect, useState } from "react";
import CommonButton from "../ui/CommonButton";
import ButtonGradient from "../ui/ButtonGradient";

export default function Hero() {
  const [amount, setAmount] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState("tether");
  const [progress, setProgress] = useState(30);
  const max = 100;
  const progressWidth = (progress / max) * 100;

  return (
    <main className="min-h-screen  flex items-center justify-center sm:mt-0 mt-10 heroBg">
      <div className="contentbg"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8">
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
            <div className="  grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 w-full">
            {[
  { value: "60", label: "DAYS" },
  { value: "45", label: "HOUR" },
  { value: "24", label: "MINUTES" },
  { value: "59", label: "SECOND" },
].map((time) => (
  <div
    key={time.label} // Moved the key here
    style={{
      background:
        "linear-gradient(270deg, rgba(166, 166, 166, 0.7) 0%, rgba(166, 166, 166, 0) 50%, rgba(166, 166, 166, 0.7) 100%)",
      padding: "1px",
    }}
    className="rounded-[8px]"
  >
    <div className="bg-[#1A1A1A] px-6 py-3 rounded-[8px] text-center min-w-[100px]">
      <h2 className="text-[30px] md:text-[60px] font-[700] text-white leading-normal">
        {time.value}
      </h2>
      <div className="text-[16px] font-[400] text-white">
        {time.label}
      </div>
    </div>
  </div>
))}
            </div>

            <div className="text-center text-white text-[30px] font-[700] py-4">
              <h2>$65,156,332</h2>
              <h2>Contribution Receive</h2>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(90deg, #1AB3E5 0%, rgba(26, 179, 229, 0) 100%)",
                border: "1px solid #1AB3E5",
              }}
              className="w-auto h-[20px] rounded-full mb-6"
            >
              <div
                style={{
                  width: `${progressWidth}%`, // Dynamically set width
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
              <div className="flex items-center gap-2">
                <span className="text-white">USDT Raised</span>
              </div>
              <div className="text-white sm:mt-0 mt-[15px] text-[18px] font-[700]">
                <span className="text-white"> 0$/0$ = MDC</span>
              </div>
            </div>

            {/* Connect Wallet Button */}

            <CommonButton title="Connect Wallet" width="100%" />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center text-left ">
          <h1 className="w-full text-[40px] md:text-[60px] font-[700] uppercase">
            Join MDC Coin
          </h1>
          <h2 className="w-full text-[16px] md:text-[20px] font-[400] uppercase">
            Be a Part of the Decentralized Revolution
          </h2>
          <h3 className="w-full text-[14px] md:text-[17px] font-[400] py-5">
            Step into the future of innovation and empowerment with MDC Coin.
            Embrace the power of decentralization and redefine how you engage
            with digital ecosystems. With MDC Coin, you’re not just a
            user—you’re a key contributor to a secure, transparent, and
            reward-driven Web3 economy.
          </h3>
          <h2 className="w-full text-[14px] md:text-[17px] font-[400]">
            Join us today and lead the way in shaping the decentralized future.
          </h2>
          <div className="flex justify-start w-full mt-10">
            <ButtonGradient btnName="Buy Token" width="w-[195px]" />
            &nbsp;
            <ButtonGradient btnName="Read Whitepaper" width="w-[195px]" />
          </div>
        </div>
      </div>
    </main>
  );
}
