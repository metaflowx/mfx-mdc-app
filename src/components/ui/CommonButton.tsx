import React from 'react'

export default function CommonButton({title,width, onClick,height,disabled}:{title:string,width?:string,background?:string, onClick?:any,height?:string,disabled?:any}) {
  return (
   <button 
   disabled={disabled}
   onClick={() => {
    if (onClick) {
      onClick();
    }
  }}
   style={{
    // background: "linear-gradient(90deg, #1AB3E5 0%, #034F89 50%, #1AB3E5 100%)",
    border: "1px solid #999"
    ,
    width:width ? width :"100%"
   }} className={`${width ? width :"w-full"} rounded-[40px] hover:bg-[#1AB3E5] transition-all duration-300 ease-in-out hover:scale-105 ${height? height:"h-[50px]"}  text-center text-[20px] flex justify-center items-center`} >
    <p >
    {title}
    </p>

   </button>
  )
}
