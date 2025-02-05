"use client";

import { Twitter, Instagram, Linkedin, Disc as Discord } from "lucide-react";

const socialLinks = [
  {
    name: "Twitter",
    icon: "/images/footer/twitter.svg",
    href: "#",
    bgColor: "bg-[#1A1D28]",
    hoverColor: "hover:text-[#1DA1F2]",
  },
  {
    name: "Instagram",
    icon: "/images/footer/instagram.svg",
    href: "#",
    bgColor: "bg-[#1A1D28]",
    hoverColor: "hover:text-[#E4405F]",
  },
  {
    name: "LinkedIn",
    icon: "/images/footer/linkedin.svg",
    href: "#",
    bgColor: "bg-[#1A1D28]",
    hoverColor: "hover:text-[#0A66C2]",
  },
  {
    name: "Discord",
    icon: "/images/footer/discord.svg",
    href: "#",
    bgColor: "bg-[#1A1D28]",
    hoverColor: "hover:text-[#5865F2]",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap sm:flex justify-center gap-6">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          style={{border: "1.5px solid #FFFFFF1A"}}
          className={`p-4 rounded-[34px]  transition-all hover:scale-105 ${social.hoverColor} flex items-center`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={social.icon} />
          <span className="text-white text-[17px] font-[400] pl-3">{social.name}</span>
        </a>
      ))}
    </div>
  );
}