import React from 'react'

export default function CommonButton({title,width}:{title:string,width?:string}) {
  return (
   <button style={{
    background: "linear-gradient(90deg, #1AB3E5 0%, #034F89 50%, #1AB3E5 100%)",
    border: "1px solid #1AB3E5"
    ,width:width ? width :"100%"
   }} className='rounded-[40px] h-[50px] text-center text-[20px] flex justify-center items-center' >
    <p >
    {title}
    </p>

   </button>
  )
}
