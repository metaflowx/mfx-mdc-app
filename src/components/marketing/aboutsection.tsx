"use client";

import { Button } from "@/components/ui/button";
import { Bitcoin, Gem, Box, Triangle } from "lucide-react";
import Image from "next/image";
import CommonButton from "../ui/CommonButton";

export default function AboutSection() {
  return (
    <main className="min-h-screen  text-white relative overflow-hidden">
      {/* Background dots pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff15_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
      
      <div className="max-w-6xl mx-auto px-4 py-16 relative">
        {/* Header Section */}
        <div className="text-left sm:text-center space-y-6 mb-20">
          <h1 className="text-6xl font-bold tracking-wider bg-clip-text">
            JOIN AIZU
          </h1>
          <h2 className="text-3xl font-semibold text-blue-400">
            Be a Part of the Decentralized Revolution!
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock a world of financial freedom where you own your assets, control your data, and trade with confidence.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mt-8">
           <CommonButton title="White Paper" width="176px" />
            <Button
              variant="outline"
              className="bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-900/20 px-8 py-6 text-lg rounded-full"
            >
              Light Paper
            </Button>
          </div>
        </div>
      </div>

      {/* Central Coin Section */}
      <div className="relative">
  {/* Center AIZU coin */}
  <div className="relative w-[full] flex justify-center items-center  ">
    <img src="/images/join/aboutbg.png" className="w-full h-full object-contain" />

   
  </div>

  {/* Floating Crypto Icons */}
  <div className="absolute inset-0 -z-10 animate-spin-slow">
    <div className="relative w-full h-full">
      {/* Bitcoin */}
      <div className="absolute top-0 left-1/2 -translate-x-40 -translate-y-20 animate-spin-slow">
        <div className="bg-orange-500 p-4 rounded-full">
          <Bitcoin className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Ethereum */}
      <div className="absolute top-1/2 right-0 translate-x-20 animate-spin-slow">
        <div className="bg-blue-600 p-4 rounded-full">
          <Gem className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Polygon */}
      <div className="absolute bottom-0 left-1/2 -translate-x-20 translate-y-20 animate-spin-slow">
        <div className="bg-purple-600 p-4 rounded-full">
          <Box className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Avalanche */}
      <div className="absolute top-1/2 left-0 -translate-x-20 animate-spin-slow">
        <div className="bg-red-500 p-4 rounded-full">
          <Triangle className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Additional Coins */}
      {/* Litecoin */}
      <div className="absolute top-1/4 left-1/4 -translate-x-20 -translate-y-20 animate-spin-slow">
        <div className="bg-gray-500 p-4 rounded-full">
          {/* Add your Litecoin icon here */}
        </div>
      </div>

      {/* Cardano */}
      <div className="absolute bottom-1/4 right-1/4 translate-x-20 translate-y-20 animate-spin-slow">
        <div className="bg-blue-800 p-4 rounded-full">
          {/* Add your Cardano icon here */}
        </div>
      </div>

      {/* Ripple */}
      <div className="absolute top-1/3 right-1/3 translate-x-20 -translate-y-10 animate-spin-slow">
        <div className="bg-blue-500 p-4 rounded-full">
          {/* Add your Ripple icon here */}
        </div>
      </div>
    </div>
  </div>
</div>

    </main>
  );
}
