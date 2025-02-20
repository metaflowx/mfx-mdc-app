"use client"
import Profile from '@/ui/profile/Profile'
import Aos from 'aos';
import React, { useEffect } from 'react'

export default function page() {
   useEffect(() => {
                 Aos.init({ duration: 1000, once: true });
               }, []);
  return (
    <div>

      <Profile />
      
    </div>
  )
}
