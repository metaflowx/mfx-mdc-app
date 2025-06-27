import { Card } from "@/components/ui/card";
import { contractConfig } from "@/constants/contract";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Address, formatEther, parseEther } from "viem";
import { useAccount, useBlockNumber, useReadContracts } from "wagmi";

export default function ReferralDashbaord() {
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  const result = useReadContracts({
    contracts: [
      {
        ...contractConfig,
        functionName: "getReferralRewards",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
      },
      {
        ...contractConfig,
        functionName: "getReferralsCount",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
      },
      {
        ...contractConfig,
        functionName: "getReferrer",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
      },
    ],
  });

  const dataList = [
    {
      title: "One",

      nestedData: [
        {
          title: "YOUR REFERRALS",
          value: result?.data?.[1]?.result
            ? Number(result?.data[1]?.result)
            : 0,
          logo: "/referral/2.png",
        },
      ],
    },
    {
      title: "Two",
      nestedData: [
        {
          title: "YOUR REFERRAL EARNINGS",
          value: `${
            result?.data?.[0]?.result
              ? Number(formatEther(BigInt(result?.data[0]?.result))).toFixed(2)
              : 0
          } MDC`,
          logo: "/referral/2.png",
        },
      ],
    },
    {
      title: "Three",

      nestedData: [
        {
          title: "YOUR REFERRALS CLAIM",
          value: `${
            result?.data?.[1]?.result ? Number(result?.data[1]?.result) : 0
          } MDC`,
          logo: "/referral/2.png",
        },
      ],
    },
    {
      title: "Four",
      nestedData: [
        {
          title: "LAST CLAIM DATE",
          value: (
            <Box sx={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Typography>
                {result?.data?.[0]?.result
                  ? new Date(
                      Number(result.data[0].result) * 1000
                    ).toLocaleString()
                  : "N/A"}
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "rgb(26, 179, 229)",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(22, 160, 205)", // Optional: a slightly darker hover effect
                  },
                }}
              >
                Claim
              </Button>
            </Box>
          ),
          logo: "/referral/2.png",
        },
      ],
    },
  ];
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: result.queryKey,
    });
  }, [blockNumber, queryClient, result]);
  return (
    <div>
      <Grid2 container spacing={2}>
        {dataList.map((data, index) => {
          return (
            <Grid2
              data-aos="fade-up"
              key={index}
              size={{ xs: 12, sm: 3, md: 3, lg: 3 }}
            >
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
                        {/* {data.title === "Four" && (
                          <Button variant="contained" fullWidth>
                            Claim
                          </Button>
                        )} */}
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
