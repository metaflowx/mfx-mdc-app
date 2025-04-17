import { Card } from "@/components/ui/card";
import { contractConfig } from "@/constants/contract";
import { Box, Grid2, Typography } from "@mui/material";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Address, formatEther, parseEther } from "viem";
import { useAccount, useBlockNumber, useReadContracts } from "wagmi";

export default function ReferralDashbaord() {


  const { address } = useAccount();
  const {chainId} = useAppKitNetwork()
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  const result = useReadContracts({
    contracts: [
     
      {
        ...contractConfig,
        functionName: "getReferralRewards",
        args: [address as Address ],
        chainId: Number(chainId)??97
      },
      {
        ...contractConfig,
        functionName: 'getReferralsCount',
        args: [address as Address ],
        chainId: Number(chainId)??97
        
      },
      {
        ...contractConfig,
        functionName: 'getReferrer',
        args: [address as Address ],
        chainId: Number(chainId)??97
      },
      
     
     
    ],
  })


  const dataList = [
    {
      title: "One",

      nestedData: [
        {
          title: "YOUR REFERRALS",
          value: result?.data?.[1]?.result? Number(result?.data[1]?.result) : 0,
          logo: "/referral/2.png",
        },
        
      ],
    },
    {
      title: "Two",
      nestedData: [
        {
          title: "YOUR REFERRAL EARNINGS",
          value: `${result?.data?.[0]?.result? Number(formatEther(BigInt(result?.data[0]?.result))).toFixed(2) : 0} MDC`,
          logo: "/referral/2.png",
        },
        
      ],
    },
  ];
   useEffect(() => {
      queryClient.invalidateQueries({
        queryKey: result.queryKey,
      });
      
    }, [blockNumber, queryClient,result]);
  return (
    <div>
      <Grid2 container spacing={2}>
        {dataList.map((data, index) => {
          return (
            <Grid2   data-aos="fade-up" key={index} size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
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
