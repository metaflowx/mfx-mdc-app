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
    {
      poster:"/images/slider/disney.png"
    },
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
    {
      poster:"/images/slider/disney.png"
    },
  ]
  return (
    <div style={{
      background:"url(/images/slider/slider.svg)",
      backgroundSize: "cover",
    backgroundRepeat:" no-repeat",
    backgroundPosition: "unset",
    padding: "130px 0px"


    }} className="relative w-full overflow-hidden  py-4">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        {movieList.map((item:any, i) => (
          <div key={i} className="mx-4 px-6 py-2 text-xl font-semibold text-white  rounded-lg shadow-lg">
           <img src={item?.poster} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeSlider;
