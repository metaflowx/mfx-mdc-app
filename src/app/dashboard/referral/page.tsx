import ReferralDashbaord from '@/ui/referral/ReferralDashbaord'
import React from 'react'
import ReferralTable from './ReferralTable'
import { Box } from '@mui/material'

export default function page() {
  return (
    <div>

      <ReferralDashbaord />


      <Box pt={4}>

      <ReferralTable />
      </Box>

      
    </div>
  )
}
