"use client";
import React, { useEffect, useState } from "react";

export default function Counter({
  label,
  targetTime,
}: {
  label?: string;
  targetTime?: any;
}) {
  const calculateTimeLeft = () => {
    const now = Math.floor(Date.now() / 1000); // Current time in Unix seconds
    const difference = Number(targetTime) - now;

    if (difference <= 0 || difference === undefined)
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (24 * 3600)),
      hours: Math.floor((difference % (24 * 3600)) / 3600),
      minutes: Math.floor((difference % 3600) / 60),
      seconds: difference % 60,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <div>
      <p className="text-center text-white pb-3 font-[700] text-[16px] ">{label}</p>
      <div className="  grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 w-full">
        {[
          { value: timeLeft.days ||0, label: "DAYS" },
          { value: timeLeft.minutes ||0, label: "HOUR" },
          { value: timeLeft.minutes ||0, label: "MINUTES" },
          { value: timeLeft.seconds ||0, label: "SECOND" },
        ].map((time) => (
          <div
            key={time.label} // Moved the key here
            style={{
              background:
                "linear-gradient(270deg, rgba(166, 166, 166, 0.7) 0%, rgba(166, 166, 166, 0) 50%, rgba(166, 166, 166, 0.7) 100%)",
              padding: "1px",
            }}
            className="rounded-[8px]"
          >
            <div className="bg-[#1A1A1A] px-6 py-3 rounded-[8px] text-center min-w-[100px]">
              <h2 className="text-[30px] md:text-[60px] font-[700] text-white leading-normal">
                {time.value}
              </h2>
              <div className="text-[16px] font-[400] text-white">
                {time.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
