import { Card } from "@/components/ui/card";
import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

export default function ReferralDashbaord() {
  const dataList = [
    {
      title: "One",

      nestedData: [
        {
          title: "YOUR REFERRALS",
          value: "0.00",
          logo: "/referral/2.png",
        },
        {
          title: "YOUR REFERRAL EARNINGS",
          value: "0.00",
          logo: "/referral/2.png",
        },
        {
          title: "YOUR left side EARNINGS",
          value: "0.00",
          logo: "/referral/2.png",
        },
      ],
    },
    {
      title: "Two",
      nestedData: [
        {
          title: "YOUR right side earnings",
          value: "0.00",
          logo: "/referral/1.png",
        },
        {
          title: "YOUR self EARNINGS",
          value: "0.00",
          logo: "/referral/3.png",
        },
        {
          title: "YOUR eligible rewards",
          value: "0.00",
          logo: "/referral/4.png",
        },
      ],
    },
  ];
  return (
    <div>
      <Grid2 container spacing={2}>
        {dataList.map((data, index) => {
          return (
            <Grid2 key={index} size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
              <Card>
                {data.nestedData.map((item) => {
                  return (
                    <Box
                      sx={{
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={item.logo}
                        style={{ width: "60px", height: "60px" }}
                      />
                      <Box pl={2}>
                        <Typography>{item.title}</Typography>
                        <Typography>{item.value}</Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </div>
  );
}
