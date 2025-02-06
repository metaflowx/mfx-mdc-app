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
      <div
        style={{
          background:
            "linear-gradient(270deg, rgba(26, 179, 229, 0.6) 0%, rgba(3, 79, 137, 0) 50%, rgba(26, 179, 229, 0.6) 100%)",
        }}
        className="max-w-[643px] p-[1px] rounded-[30px] mx-auto"
      >
        <div
          style={{ background: " #000000" }}
          className="relative flex items-center rounded-[30px] max-w-[643px] mx-auto "
        >
         <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter a valid email address"
  className="w-full px-6 outline-none bg-transparent rounded-lg text-white placeholder-gray-400"
  required
/>
          <button
            style={{
              background:
                "linear-gradient(90deg, #1AB3E5 0%, rgba(3, 79, 137, 0) 50%, #1AB3E5 100%)",
              border: "1px solid #1AB3E5",
              width: "141px",
              height: "50px",
              borderRadius: "50px",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
