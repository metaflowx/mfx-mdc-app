"use client"
import { motion } from "framer-motion";

const MarqueeSlider = () => {
  const movieList=[
    {
      poster:"/images/slider/featured.png"
    },
    {
      poster:"/images/slider/disney.png"
    },
    {
      poster:"/images/slider/mxplayer.png"
    },
    {
      poster:"/images/slider/netflix.png"
    },
    {
      poster:"/images/slider/prime.png"
    },
    
  ]
  return (
    <>
    
    <div 
    
    
   
    
    className="hidden sm:block relative w-full overflow-hidden  py-4 mt-[50px] md:mt-[10px]">
      <motion.div
      style={{
        background:"url(/images/slider/slider.svg)",
        backgroundSize: "cover",
      backgroundRepeat:" no-repeat",
      backgroundPosition: "center",
      // padding: "130px 0px"
  
  
      }}
        className="flex whitespace-nowrap"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}

      >
       
        {movieList.map((item:any, i) => (
          <div
          
          key={i} className="w-full mx-4 px-6 py-2 text-xl flex justify-center items-center h-[90px] md:h-[200px] lg:h-[260px] font-semibold text-white  rounded-lg shadow-lg">
           <img src={item?.poster} style={{maxWidth:"180px"}}  />
          </div>
        ))}
      </motion.div>
    </div>
    <div 
    
    
   
    
    className="block sm:hidden relative w-full overflow-hidden  py-4 mt-[50px] md:mt-[10px]">
      <motion.div
      // style={{
      //   background:"url(/images/slider/slider.svg)",
      //   backgroundSize: "cover",
      // backgroundRepeat:"no-repeat",
      // backgroundPosition: "center",
      // transform:"translateX(0%)"
    
  
  
      // }}
        className="flex"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}

      >
       
        {movieList.map((item:any, i) => (
          <div
          
          key={i} className="w-full mx-4 px-6 py-2 text-xl flex justify-center items-center h-[112px] md:h-[200px] lg:h-[260px] font-semibold text-white  rounded-lg shadow-lg">
           <img src={item?.poster} style={{maxWidth:"80px"}}  />
          </div>
        ))}
      </motion.div>
    </div>
    </>
  );
};

export default MarqueeSlider;
