"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQContactSection = () => {
  // State to keep track of the open accordion item
  const [openItem, setOpenItem] = useState(null);

  const handleAccordionChange = (value: any) => {
    setOpenItem(value === openItem ? null : value); // Toggle open/close state
  };

  return (
    <div className=" text-white py-16 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-[60px]  font-[700] text-left sm:text-center mb-12">
          FAQs
        </h1>

        {/* FAQ Section */}
        <Accordion
          type="single"
          collapsible
          className="space-y-4"
          onValueChange={handleAccordionChange}
        >
          {faqData.map((item, index) => (
            <div
            key={index}
              style={{
                background:
                openItem? " linear-gradient(90deg, rgba(3, 79, 137, 0) 0%, rgba(26, 179, 229, 0.8) 50%, rgba(3, 79, 137, 0) 100%)": "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.3) 100%)",
                padding: "1px",
                borderRadius:"10px"
              }}
            >
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg"
                style={{
                  background:
                    openItem === `item-${index}`
                      ? "linear-gradient(90deg, rgba(3, 79, 137, 0) 0%, rgba(26, 179, 229, 0.8) 50%, rgba(3, 79, 137, 0) 100%)"
                      : "#000",
                      border:"none"
                }}
              >
                <AccordionTrigger className="text-[18px] sm:text-[24px] font-[700] px-4 py-2 flex justify-between items-center">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[16px] sm:text-[20px] px-4 py-3 font-[400] rounded-b-lg">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

const faqData = [
  {
    question: "What is MDC Coin?",
    answer:
      "MDC Coin is the native cryptocurrency of the MDC OTT platform, designed to facilitate transactions, rewards, governance, and staking within the ecosystem.",
  },
  {
    question: "How can I buy MDC?",
    answer:
      "MDC Coin is the native cryptocurrency of the MDC OTT platform, designed to facilitate transactions, rewards, governance, and staking within the ecosystem.",
  },
  {
    question: "Where can I store MDC?",
    answer:
      "Tokens are allocated to ecosystem development, staking rewards, marketing, and the team.",
  },
  {
    question: "What is the use case of MDC?",
    answer:
      "MDC Coin is the native cryptocurrency of the MDC OTT platform, designed to facilitate transactions, rewards, governance, and staking within the ecosystem.",
  },
  {
    question: "Is MDC a good investment?",
    answer: "Yes, there is a burn mechanism to ensure scarcity over time.",
  },
];

export default FAQContactSection;
