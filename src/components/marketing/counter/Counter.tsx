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
    <div className="w-full px-4">
      {label && (
        <p className="text-center text-white pb-3 font-bold text-[16px]">
          {label}
        </p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 w-full">
        {[
          { value: timeLeft.days || 0, label: "DAYS" },
          { value: timeLeft.hours || 0, label: "HOURS" },
          { value: timeLeft.minutes || 0, label: "MINUTES" },
          { value: timeLeft.seconds || 0, label: "SECONDS" },
        ].map((time, index) => (
          <div
            key={index}
            style={{
              background:
                "linear-gradient(270deg, rgba(166, 166, 166, 0.7) 0%, rgba(166, 166, 166, 0) 50%, rgba(166, 166, 166, 0.7) 100%)",
              padding: "1px",
            }}
            className="rounded-[8px] w-full"
          >
            <div
              data-aos="fade-up"
              className="bg-[#1A1A1A] hover:bg-[#101012] px-4 md:px-6 py-2 rounded-[8px] flex flex-col items-center text-center min-w-[80px] md:min-w-[100px] max-w-full overflow-hidden"
            >
              <h3 className="text-[30px] md:text-[60px] font-[600] text-white leading-none break-words">
                {time.value}
              </h3>
              <div className="text-[14px] md:text-[16px] font-[400] text-white">
                {time.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
