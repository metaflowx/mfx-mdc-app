"use client"
import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";


const FAQContactSection = () => {
  // State to keep track of the open accordion item
  const [openItem, setOpenItem] = useState(null);

  const handleAccordionChange = (value:any) => {
    setOpenItem(value === openItem ? null : value); // Toggle open/close state
  };

  return (
    <div className=" text-white py-16 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-left sm:text-center mb-12">Aizu Coin FAQs</h1>

        {/* FAQ Section */}
        <Accordion
          type="single"
          collapsible
          className="space-y-4"
          onValueChange={handleAccordionChange}
        >
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg"
              style={{
                background:
                  openItem === `item-${index}`
                    ? "linear-gradient(90deg, rgba(45, 103, 254, 0) 0%, rgba(45, 103, 254, 0.5) 50%, rgba(45, 103, 254, 0) 100%)"
                    : "transparent",
              }}
            >
              <AccordionTrigger className="text-[18px] sm:text-[24px] font-[700] px-4 py-2 flex justify-between items-center">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-[16px] sm:text-[20px] px-4 py-3 font-[400] rounded-b-lg">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

const faqData = [
  { question: "What is AizuCoin?", answer: "AizuCoin is a decentralized cryptocurrency designed for secure, fast, and efficient transactions. It supports blockchain-based applications like DeFi, NFTs, and smart contracts, providing real-world utility." },
  { question: "How can I buy AizuCoin?", answer: "AizuCoin is a decentralized cryptocurrency designed for secure, fast, and efficient transactions. It supports blockchain-based applications like DeFi, NFTs, and smart contracts, providing real-world utility." },
  { question: "Where can I store AizuCoin?", answer: "Tokens are allocated to ecosystem development, staking rewards, marketing, and the team." },
  { question: "What is the use case of AizuCoin?", answer: "AizuCoin is a decentralized cryptocurrency designed for secure, fast, and efficient transactions. It supports blockchain-based applications like DeFi, NFTs, and smart contracts, providing real-world utility." },
  { question: "Is AizuCoin a good investment?", answer: "Yes, there is a burn mechanism to ensure scarcity over time." },
  
];

export default FAQContactSection;
