import { Card } from '@/components/ui/card'
import TeamRewardTable from '@/components/ui/CommonTable'
import EarningDashboard from '@/ui/earning/EarningDashboard'
import { Box } from '@mui/material'
import React from 'react'

export default function page() {
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
