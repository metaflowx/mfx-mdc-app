"use client"
import StakingDashboard from '@/ui/staking/StakingDashboard'
import React, { useEffect } from 'react'
import StakingCard from './StakingCard'
import Aos from 'aos';

export default function page() {
   useEffect(() => {
             Aos.init({ duration: 1000, once: true });
           }, []);
  return (
    <div>
      <StakingDashboard />
      <StakingCard />
    </div>
  )
}
