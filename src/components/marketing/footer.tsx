
// import BackToTopButton from "../ui/BackToTopButton";
// import SocialLinks from "../ui/SocialLinks";

// const Footer = () => {
//     return (
//         <footer className="flex flex-col relative items-center justify-center  pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-20">
//             <section className="text-center mb-24">
//           <h2 className="text-[30px] font-[700] mb-8">Social Media</h2>
//           <SocialLinks />
//         </section>
//              <footer className="flex items-center text-gray-400 text-sm border-t border-gray-800 pt-8 w-full">
//           <p className="text-white text-[17px] font-[400] text-left sm:text-center w-full">Copyright © 2025 mdccoin.com. All rights reserved.</p>
//           {/* <BackToTopButton /> */}
//         </footer>
//         </footer>
//     )
// };

// export default Footer

'use client';

import Link from 'next/link';
import { FaXTwitter, FaInstagram, FaLinkedin, FaFacebook, FaTelegram, FaDiscord } from 'react-icons/fa6';
import SocialLinks from '../ui/SocialLinks';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8  sm:px-6 md:px-12  pt-[90px] pb-8 px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {/* Logo and Description */}
        <div className="mb-6 md:mb-0 w-full flex flex-col items-start">
          <img src="/images/home/logo.png" />
          <p className="text-[20px] font-[400] mt-2 max-w-md">
            MDC Coin combines the power of blockchain with the entertainment industry, revolutionizing digital content and community-driven innovation.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 md:mb-0 w-full flex flex-col items-start">
          <h3 className=" text-[24px] font-[600]">Quick Links</h3>
          <div className='flex justify-between items-center mt-5'>
          <ul className="mt-2 space-y-2 text-sm w-[200px] ">
            <li><Link href="#" className="hover:text-blue-500 text-[20px] font-[400]">About</Link></li>
            <li><Link href="#" className="hover:text-blue-500 text-[20px] font-[400]">How to Buy</Link></li>
            <li><Link href="#" className="hover:text-blue-500 text-[20px] font-[400]">Features</Link></li>
           
          </ul>
          <ul className="mt-2 space-y-2 text-sm w-[200px]">
         
            <li><Link href="#" className="hover:text-blue-500 text-[20px] font-[400]">Tokenomics</Link></li>
            <li><Link href="#" className="hover:text-blue-500 text-[20px] font-[400]" >Roadmap</Link></li>
            <li><Link href="#" className="hover:text-blue-500 text-[20px] font-[400]">FAQs</Link></li>
          </ul>
          </div>
         
        </div>

        {/* Social Media */}
        <div className="w-fullflex flex-col items-start">
          <h3 className=" text-[24px] font-[600]">Socials Media</h3>
          <div className="mt-5 flex space-x-4">
          <SocialLinks />
            {/* <Link href="#" className="text-gray-400 hover:text-white"><FaXTwitter size={20} /></Link>
            <Link href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></Link>
            <Link href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></Link>
            <Link href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></Link>
            <Link href="#" className="text-gray-400 hover:text-white"><FaTelegram size={20} /></Link>
            <Link href="#" className="text-gray-400 hover:text-white"><FaDiscord size={20} /></Link> */}
          </div>
        </div>
      </div>
      <footer className="flex items-center text-gray-400 text-sm border-t border-gray-800 pt-8 w-full mt-5">
           <p className="text-white text-[17px] font-[400] text-left sm:text-center w-full">Copyright © 2025 mdccoin.com. All rights reserved.</p>
           {/* <BackToTopButton /> */}
         </footer>
    </footer>
  );
};

export default Footer;
