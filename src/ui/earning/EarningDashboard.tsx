import CommonCard from '@/components/ui/CommonCard';
import { Grid2 } from '@mui/material';
import React from 'react'

export default function EarningDashboard() {
    const BoxList = [
        {
          id: 1,
          title: "Wallet Balance",
          data: "0.000",
          valueInUsd: "$0.000",
        },
        {
          id: 2,
          title: "Your Stake",
          data: "0.000 MDC",
          valueInUsd: "$0.000",
        },
        {
          id: 3,
          title: "Claimed Income",
          data: "0.000 MDC",
          valueInUsd: "$0.000",
        },
        {
            id: 4,
            title: "Unclaimed Income",
            data: "0.000 MDC",
            valueInUsd: "$0.000",
          },
      ];
  return (
    <div>

<Grid2 container spacing={2}>
            {BoxList.map((item, index) => (
              <Grid2 key={index} size={{ xs: 12, md: 4, lg: 3 }}>

                <CommonCard item={item} />
               
              </Grid2>
            ))}
          </Grid2>
      
    </div>
  )
}
