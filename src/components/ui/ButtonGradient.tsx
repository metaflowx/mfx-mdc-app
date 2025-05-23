import React from 'react'

export default function ButtonGradient({btnName,width,onClick}:{btnName?:string,width?:string,onClick?:any}) {
  return (
    <div className={`relative inline-block ${width}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-[#1AB3E5] via-transparent to-[#1AB3E5] rounded-full p-[2px]  h-[50px]">
      <button onClick={onClick} className="w-full h-full rounded-full bg-black hover:bg-[#1AB3E5] text-white flex items-center justify-center">
        {btnName}
      </button>
    </div>
  </div>
  )
}

