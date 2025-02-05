import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import MobileMenu from "./mobile-menu";
import { NAV_LINKS1 } from "@/constants/links";
import CommonButton from "../ui/CommonButton";

const Navbar = () => {
    return (
        <header className="sticky top-0 w-full  bg-transparent backdrop-blur-[10px] z-50">
            <Wrapper className="h-full">
                <div className="flex items-center justify-between h-full">
                   

                    <div className="hidden lg:flex items-center gap-4">
                        <ul className="flex items-center gap-16">
                            {NAV_LINKS.map((link, index) => (
                                <li style={{fontFamily:"Prompt"}} key={index} className="text-[14px] xl:text-[16px] object-contain  -1 link">
                                    <Link href={link.href}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center sm:mt-1 mt-0">
                        <Link href="/" className="flex items-center gap-2">
                           <img src="/images/home/logo.png"  className="w-[90px] h-[50px] sm:w-[114px] sm:h-[88px]" />
                        </Link>
                    </div>
                    <div className="hidden lg:flex items-center gap-4">
                        <ul className="flex items-center gap-16">
                            {NAV_LINKS1.map((link, index) => (
                                <li style={{fontFamily:"Prompt"}} key={index} className="text-[14px] xl:text-[16px] -1 link">
                                    <Link href={link.href}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                             <CommonButton title="Connect Wallet" width="214px" />
                             
                        </ul>
                       
                    </div>
                    <MobileMenu />

                   
                </div>
            </Wrapper>
        </header>
    )
};

export default Navbar
