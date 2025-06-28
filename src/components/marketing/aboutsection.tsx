"use client";

import Link from "next/link";
import ButtonGradient from "../ui/ButtonGradient";

export default function AboutSection({ id }: { id: string }) {
  return (
    <main id={id} className="  text-white relative overflow-hidden">
      {/* Background dots pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff15_1px,_transparent_1px)] bg-[length:24px_24px]"></div>

      <div className="max-w-6xl mx-auto px-4 py-4 md:py-16 relative">
        {/* Header Section */}
        <div className="text-left sm:text-center space-y-6 mb-20">
          <h1
            data-aos="fade-left"
            className="text-[25px] md:text-6xl font-bold tracking-wider bg-clip-text"
          >
            Why MDC Coin?
          </h1>
          <h2
            data-aos="fade-right"
            className="text-[20px] font-[400] text-white"
          >
            The $MDC token powers the MDC ecosystem with a total supply of
            1,000,000,000 tokens. It is strategically allocated for team growth,
            community rewards, marketing, and staking. Offering governance,
            rewards, and deflationary mechanisms, $MDC ensures long-term value
            and sustainability.
          </h2>

          {/* CTA Buttons */}
          <div
            data-aos="fade-up"
            className="block sm:flex justify-center gap-4 mt-8"
          >
            <Link href={""}>
              <ButtonGradient
                btnName="0x578e...ea4"
                width="w-full sm:w-[209px]"
              />
            </Link>
            <Link href={"/WHITEPAPER.pdf"} target="_blank">
              <ButtonGradient
                btnName="MDC Whitepaper"
                width="w-full sm:w-[209px]  sm:mt-0 "
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
