import React from 'react'

export default function CommonButton({title,width}:{title:string,width?:string}) {
  return (
   <button style={{background: "linear-gradient(90deg, #2865FF 0%, #DD4242 50%, #2865FF 100%)",width:width ? width :"100%"
   }} className='rounded-[40px] h-[50px] text-center text-[20px] flex justify-center items-center' >
    <p >
    {title}
    </p>

   </button>
  )
}
