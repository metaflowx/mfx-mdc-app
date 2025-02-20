"use client"
import ReferralDashbaord from '@/ui/referral/ReferralDashbaord'
import React, { useEffect } from 'react'
import ReferralTable from './ReferralTable'
import { Box } from '@mui/material'
import Aos from 'aos';

export default function page() {
    useEffect(() => {
               Aos.init({ duration: 1000, once: true });
             }, []);
  return (
    <div>

      <ReferralDashbaord />


      <Box pt={4}>

      <ReferralTable />
      </Box>

      
    </div>
  )
}
