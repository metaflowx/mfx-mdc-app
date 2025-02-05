"use client";

import { Button } from "@/components/ui/button";
import { Bitcoin, Gem, Box, Triangle } from "lucide-react";
import Image from "next/image";
import CommonButton from "../ui/CommonButton";
import ButtonGradient from "../ui/ButtonGradient";

export default function AboutSection() {
  return (
    <main className="  text-white relative overflow-hidden">
      {/* Background dots pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff15_1px,_transparent_1px)] bg-[length:24px_24px]"></div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative">
        {/* Header Section */}
        <div className="text-left sm:text-center space-y-6 mb-20">
          <h1 className="text-6xl font-bold tracking-wider bg-clip-text">
            Why MDC Coin?
          </h1>
          <h2 className="text-[20px] font-[400] text-white">
            The $MDC token powers the MDC ecosystem with a total supply of
            1,000,000,000 tokens. It is strategically allocated for team growth,
            community rewards, marketing, and staking. Offering governance,
            rewards, and deflationary mechanisms, $MDC ensures long-term value
            and sustainability.
          </h2>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <ButtonGradient btnName="0x578e...ea4" width="w-[209px]" />

            <ButtonGradient btnName="MDC Whitepaper" width="w-[209px]" />
          </div>
        </div>
      </div>
    </main>
  );
}
