"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="flex items-center gap-2 text-white text-[17px] font-[400] hover:text-white transition-colors"
    >
      <p className="sm:block hidden">Back to top</p>
      <motion.div 
        animate={{ y: [0, -8, 0] }} 
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowUp 
          className="w-[50px] h-[50px] rounded-full sm:ml-0 ml-1" 
          style={{
            background: "transparent",
            border: "1.5px solid #FFFFFF1A",
          }}
        />
      </motion.div>
    </button>
  );
}
