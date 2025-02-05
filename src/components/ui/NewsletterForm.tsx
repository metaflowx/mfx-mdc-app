"use client";

import { useState } from "react";
import CommonButton from "./CommonButton";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted email:", email);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
      <div style={{background:" #000000",
      border: "1px solid",
      borderImageSource: "linear-gradient(270deg, rgba(40, 101, 255, 0.6) 0%, rgba(40, 101, 255, 0) 50%, rgba(40, 101, 255, 0.6) 100%)"
      
      
}} className="relative flex items-center rounded-[30px] max-w-[643px] mx-auto ">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter a valid email address"
          className="w-full px-6  bg-transparent rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
       <CommonButton title="Submit" width="141px" />
      </div>
    </form>
  );
}