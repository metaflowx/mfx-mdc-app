import Giveway from '@/components/giveway/Giveway'
import MillinareGiveway from '@/components/giveway/MillinareGiveway'
import Wrapper from '@/components/global/wrapper'

import React from 'react'
import "aos/dist/aos.css";


export default function page() {
  return (
    <div
    
    >

   
      <Wrapper>

         <div className="relative overflow-x-hidden w-full pb-15 md:pb-10 px-4">

        <Giveway />
        <MillinareGiveway />
         </div>
      </Wrapper>

      
    
    </div>
  )
}
