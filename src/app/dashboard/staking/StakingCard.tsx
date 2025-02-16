"use client";
import Referral from '@/ui/dashboard/referral'
import RefBottom from '@/ui/shared/refBottom'
import { Box, Grid2 } from '@mui/material'
import React from 'react'
import StakingTabCard from './StakingTabCard'

export default function StakingCard() {
  return (
    <div>
       <Box sx={{ marginTop: "1rem" }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <StakingTabCard />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Referral />
            </Grid2>
          </Grid2>
        </Box>

        <RefBottom />
    </div>
  )
}
