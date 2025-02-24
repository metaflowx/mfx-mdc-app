"use client"
import { Card } from '@/components/ui/card'
import TeamRewardTable from '@/components/ui/CommonTable'
import EarningDashboard from '@/ui/earning/EarningDashboard'
import { Box } from '@mui/material'
import Aos from 'aos'
import React, { useEffect } from 'react'

export default function page() {
    useEffect(() => {
           Aos.init({ duration: 1000, once: true });
         }, []);
  return (
    <div>

        <EarningDashboard />

        <Box pt={4}>

        <Card >

        <TeamRewardTable />
        </Card>
        </Box>


      
    </div>
  )
}
