import ClaimButton from "@/components/modal/ClaimModalConfirmation";
import ClaimModalConfirmation from "@/components/modal/ClaimModalConfirmation";
import { Card } from "@/components/ui/card";
import CommonButton from "@/components/ui/CommonButton";
import { StyledTableContainer } from "@/components/ui/StyledTableContainer";
import { contractConfig } from "@/constants/contract";
import { convertToAbbreviated } from "@/utils";
import {
  Box,
  Button,
  Grid2,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Typography,
} from "@mui/material";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect,useState } from "react";
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
        functionName: "getTotalReferralRewards",
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

  const dataList1 = [
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
              ? convertToAbbreviated(Number(formatEther(BigInt(result?.data[0]?.result?.[0]))))
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
          title: "YOUR REFERRALS CLAIMED",
          value: `${
            result?.data?.[0]?.result ? convertToAbbreviated(Number(formatEther(BigInt(result?.data[0]?.result?.[1])))) : 0
          } MDC`,
          logo: "/referral/2.png",
        },
      ],
    },
    // {
    //   title: "Four",
    //   nestedData: [
    //     {
    //       title: "LAST CLAIM DATE",
    //       value: (
    //         <Box sx={{ display: "flex", alignItems: "center", gap: 16 }}>
    //           <Typography>
    //             {result?.data?.[0]?.result
    //               ? new Date(
    //                   Number(result.data[0].result) * 1000
    //                 ).toLocaleString()
    //               : "N/A"}
    //           </Typography>
    //           <Button
    //             variant="contained"
    //             size="small"
    //             sx={{
    //               backgroundColor: "rgb(26, 179, 229)",
    //               textTransform: "none",
    //               "&:hover": {
    //                 backgroundColor: "rgb(22, 160, 205)", // Optional: a slightly darker hover effect
    //               },
    //             }}
    //           >
    //             Claim
    //           </Button>
    //         </Box>
    //       ),
    //       logo: "/referral/2.png",
    //     },
    //   ],
    // },
  ];

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: result.queryKey,
    });
  }, [blockNumber, queryClient, result]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Grid2 container spacing={2}>
        {dataList1.map((data, index) => {
          return (
            <>
              <Grid2
                data-aos="fade-up"
                key={index}
                size={{ xs: 12, sm: 4, md: 4, lg: 4 }}
              >
                <Card>
                  {data.nestedData.map((item,index) => {
                    return (
                      <Box
                      key={index}
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
            </>
          );
        })}
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 data-aos="fade-up" size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Card>
            <StyledTableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Level</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      Referral Earning
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      Referral Claimed
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      Last Claimed Date
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3, 4].map((level) => (
                    <TableBodyData
                      key={level}
                      index={level}
                      address={address as Address}
                      chainId={Number(chainId)}
                    />
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
}

const TableBodyData = ({
  index,
  address,
  chainId,
}: {
  index: number;
  address: Address | undefined;
  chainId: number;
}) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClaimChecking, setIsClaimChecking] = useState<Record<string,boolean>>({
      royalty: false,
      team: false,
      referral: false,
    });
  const { data: getReferralRewardsResult } = useReadContracts({
    contracts: [
      {
        ...contractConfig,
        functionName: "getReferralRewards",
        args: [address as Address, BigInt(index)],
        chainId: Number(chainId) ?? 56,
      },
    ],
  });

  
  return (
    <TableRow>
      <TableCell sx={{ color: "white" }}>{index}</TableCell>
      <TableCell sx={{ color: "white" }}>
        {getReferralRewardsResult?.[0]?.result
          ? convertToAbbreviated(Number(formatEther(BigInt(getReferralRewardsResult?.[0].result?.amount))))
          : 0}{" "}
        MDC
      </TableCell>
      <TableCell sx={{ color: "white" }}>
        {getReferralRewardsResult?.[0]?.result
          ? convertToAbbreviated(Number(formatEther(BigInt(getReferralRewardsResult?.[0].result?.claimed))))
          : 0}{" "}
        MDC
      </TableCell>
      <TableCell sx={{ color: "white" }}>
        {getReferralRewardsResult?.[0]?.result && getReferralRewardsResult?.[0]?.result?.lastClaimTime>0
          ? new Date(Number(getReferralRewardsResult?.[0].result?.lastClaimTime) * 1000).toLocaleString()
          : "-"}
      </TableCell>
      <TableCell sx={{ color: "white" }}>
        <ClaimButton isClaimChecking={{ referral: true }} level={index}/>
        
        {/* <CommonButton 
             onClick={() => {
                  setIsClaimChecking(
                     {
                      ...isClaimChecking,
                      ['referral']: true,
                    }
                  );
                  setIsModalOpen(true);
                }}
                title="Claim"
                width="w-[120px] sm:w-[150px]  "
                height="h-[40px]"
        /> */}
        
      </TableCell>
        {/* {isModalOpen && (
        <ClaimModalConfirmation
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          isClaimChecking={isClaimChecking}
          level={index}
        />
      )} */}
     
    </TableRow>
  );
}
