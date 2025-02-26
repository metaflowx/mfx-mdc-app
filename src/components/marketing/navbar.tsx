"use client";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import MobileMenu from "./mobile-menu";
import { NAV_LINKS1 } from "@/constants/links";
import CommonButton from "../ui/CommonButton";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { open, close } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  return (
    <header className="sticky top-3 sm:top-0 w-full  bg-transparent backdrop-blur-[10px] z-50">
      <Wrapper className="h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center sm:mt-1 mt-0">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/home/logo.png"
                className="w-[90px] h-[50px] sm:w-[158px] sm:h-[70px]"
              />
            </Link>
          </div>

          <div className="hidden xl:flex items-center gap-4">
            <ul className="flex items-center gap-16">
              {NAV_LINKS.map((link, index) => (
                <li
                  style={{ fontFamily: "Prompt" }}
                  key={index}
                  className="text-[14px] text-white xl:text-[16px] object-contain  -1 link"
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
           
          </div>
          <div className="flex items-center">
          {address ? (
            <CommonButton
              onClick={() => router.push("/dashboard")}
              title="Dashboard"
              width="150px"
            />
          ) : (
            <CommonButton
              onClick={async () => open()}
              title="Connect Wallet"
              width="214px "
            />
          )}

          <MobileMenu />
          </div>
        
        </div>
      </Wrapper>
    </header>
  );
};

export default Navbar;
