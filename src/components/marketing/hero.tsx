"use client";

import { useEffect, useState } from "react";
import CommonButton from "../ui/CommonButton";

export default function Hero() {
  const [amount, setAmount] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState("tether");
  const [progress, setProgress] = useState(30);
  const max=100
  const progressWidth = (progress / max) * 100;


  return (
    <main className="min-h-screen  flex items-center justify-center sm:mt-0 mt-10">
      <div className="w-full max-w-[1140px] bg-[#0D0D0D] p-6 rounded-xl border border-[#1E3A8A]/30">
        {/* Header Stats */}
        <div className="flex justify-between text-white mb-10">
          <div>
            <p className="text-sm text-gray-400">USDT Raised</p>
            <p className="text-lg font-medium">$1,737,633</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Listing date</p>
            <p className="text-lg">March 4, 2025</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Holders</p>
            <p className="text-lg font-medium">2,561</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-white mb-10">BUY AIZU</h1>

        {/* Countdown Timer */}
        <div className="flex flex-wrap sm:flex justify-center gap-3 mb-8">
          {[
            { value: "60", label: "DAYS" },
            { value: "45", label: "HOUR" },
            { value: "24", label: "MINUTES" },
            { value: "59", label: "SECOND" }
          ].map((time) => (
            <div key={time.label} className="bg-[#1A1A1A] px-6 py-3 rounded-lg text-center min-w-[100px]">
              <div className="text-2xl font-bold text-white mb-1">{time.value}</div>
              <div className="text-xs text-gray-400">{time.label}</div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        {/* <div style={{background: "linear-gradient(90deg, #DD4242 0%, rgba(221, 66, 66, 0) 100%)",
        border: "1px solid #DD4242"
}} className="w-full h-[20px]  rounded-full mb-6">
          <div

          style={{
            background: "linear-gradient(90deg, #DD4242 0%, rgba(221, 66, 66, 0) 100%)",
            border: "1px solid #DD4242"
          }}
          
          className="w-3/4 h-full  rounded-full"></div>
        </div> */}

<div
      style={{
        background: "linear-gradient(90deg, #DD4242 0%, rgba(221, 66, 66, 0) 100%)",
        border: "1px solid #DD4242",
      }}
      className="w-full h-[20px] rounded-full mb-6"
    >
      <div
        style={{
          width: `${progressWidth}%`, // Dynamically set width
          background: "linear-gradient(90deg, #DD4242 0%, rgba(221, 66, 66, 0) 100%)",
          border: "1px solid #DD4242",
        }}
        className="h-full rounded-full transition-all duration-300 ease-in-out"
      ></div>
    </div>

        {/* Token Info */}
        <div className="block sm:flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <img src="/images/coin-icon/aizu.png" className="w-6 h-6 bg-[#FFD700] rounded-full" />
            <span className="text-white">1 AIZU</span>
            <span className="text-white mx-1">+</span>
            <img src="/images/coin-icon/usdt.png" className="w-6 h-6 bg-[#26A17B] rounded-full" />
            <span className="text-white">0.81 USDT</span>
          </div>
          <div className="text-white text-sm sm:mt-0 mt-[15px]">
            Final phase is LIVE. Listing price 2$
          </div>
        </div>

        {/* Step 1 */}
        <div className="mb-8">
          <h2 className="text-white text-lg mb-4 sm:text-center text-left">Step 1 - Select the Payment Method (BEP20)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: "tether", name: "USDT", color: "#26A17B",imgurl:"/images/coin-icon/usdt.png" },
              { id: "binance", name: "USDT", color: "#F3BA2F",imgurl:"/images/coin-icon/usdc.svg" },
              { id: "solana", name: "USDT", color: "#DC1FFF",imgurl:"/images/coin-icon/bnb.svg" },
              { id: "ethereum", name: "ETH", color: "#627EEA",imgurl:"/images/coin-icon/eth.svg" }
            ].map((token) => (
              <button
                key={token.id}
                onClick={() => setSelectedToken(token.id)}
                className={`flex flex-wrap sm:flex items-center justify-center gap-2 py-3 rounded-lg ${
                  selectedToken === token.id
                    ? "bg-[#1E3A8A]"
                    : "bg-[#1A1A1A] hover:bg-[#252525]"
                }`}
              >
                <img src={token.imgurl} className="w-5 h-5 rounded-full" style={{ backgroundColor: token.color }} />
                <span className="text-white">{token.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 */}
        <div className="mb-8">
          <h2 className="text-white text-lg mb-4 sm:text-center text-left">Step 2 - Enter the Amount of Token You Would Like to Purchase</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex bg-[#1A1A1A] rounded-lg p-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-white w-full outline-none"
                placeholder="0"
              />
              <div className="flex items-center gap-2">
                <img src="/images/coin-icon/usdt.png" className="w-5 h-5 bg-[#26A17B] rounded-full" />
                <span className="text-white">USDT</span>
              </div>
            </div>
            <div className="flex bg-[#1A1A1A] rounded-lg p-4">
              <input
                type="number"
                value={amount ? (parseFloat(amount) / 0.81).toFixed(2) : ""}
                className="bg-transparent text-white w-full outline-none"
                readOnly
                placeholder="0"
              />
              <div className="flex items-center gap-2">
                <img src="/images/coin-icon/aizu.png" className="w-5 h-5 bg-[#FFD700] rounded-full" />
                <span className="text-white">AIZU</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connect Wallet Button */}
        
        <CommonButton title="Connect Wallet"  width="100%" />

        <p className="text-center text-gray-400 text-sm hover:text-gray-300 cursor-pointer pt-5">
          Don't have a wallet?
        </p>
      </div>
    </main>
  );
}