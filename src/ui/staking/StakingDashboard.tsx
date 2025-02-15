import CommonCard from '@/components/ui/CommonCard';
import { Grid2 } from '@mui/material';
import React from 'react'

export default function StakingDashboard() {
    const BoxList = [
        {
          id: 1,
          title: "Your Wallet Balance",
          data: "0.000",
          valueInUsd: "$0.000",
        },
        {
          id: 2,
          title: "Self Staking Income",
          data: "0.000 MDC",
          valueInUsd: "$0.000",
        },
        {
          id: 3,
          title: "Your Spot Income",
          data: "0.000 MDC",
          valueInUsd: "$0.000",
        },
        
      ];
  return (
    <div>

<Grid2 container spacing={2}>
            {BoxList.map((item, index) => (
              <Grid2 key={index} size={{ xs: 12, md: 4, lg: 4 }}>

                <CommonCard item={item} />
               
              </Grid2>
            ))}
          </Grid2>
      
    </div>
  )
}
