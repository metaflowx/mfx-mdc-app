import React from 'react'

export default function ButtonGradient({btnName,width}:{btnName?:string,width?:string}) {
  return (
    <div className={`relative inline-block ${width}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-[#1AB3E5] via-transparent to-[#1AB3E5] rounded-full p-[2px] w-[195px] h-[50px]">
      <button className="w-full h-full rounded-full bg-black text-white flex items-center justify-center">
        {btnName}
      </button>
    </div>
  </div>
  )
}

