"use client";
import { Card } from "@/components/ui/card";
import { StyledTableContainer } from "@/components/ui/StyledTableContainer";
import {
  Box,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Address, formatEther, formatUnits, parseUnits } from "viem";
import React, { useEffect, useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { TeamReward } from "@/types";
import { useAccount, useBlockNumber, useReadContract, useReadContracts } from "wagmi";
import { iocConfig } from "@/constants/contract";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useQueryClient } from "@tanstack/react-query";
import { sortAddress } from "@/utils";
import { Copy } from "lucide-react";
const mockData: TeamReward[] = Array(4).fill({
  from: "0x578e...ea4",
 
  dr: 100,
  rp: 10,
  reward: "5%",
  tcr: 20,
  rr: 20,
  st: 20,
  lastClaim: "Jun 12 2024 23:11:38 PM",
});
export default function PurchaseHistory() {
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork();
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const result = useReadContracts({
    contracts: [
      {
        ...iocConfig,
        functionName: "totalContributorLengthForUser",
        args: [address as Address, 1],
        chainId: Number(chainId) ?? 56,
      },
      // {
      //   ...iocConfig,
      //   functionName: "user2SaleType2ClaimableDetail",
      //   args: [address as Address, 1],
      //   chainId: Number(chainId) ?? 56,
      // },
      // {
      //   ...iocConfig,
      //   functionName: "exchangelaunchDate",
      //   chainId: Number(chainId),
      // },
      // {
      //   ...iocConfig,
      //   functionName: "saleType2IcoDetail",
      //   args: [1],
      //   chainId: Number(chainId) ?? 56,
      // },

      // {
      //   ...iocConfig,
      //   functionName: "getPresaleTokenDue",
      //   args: [1,address as Address],
      //   chainId: Number(chainId) ?? 56,
      // },

      
    ],
  });
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: result.queryKey,
    });
    
  }, [blockNumber, queryClient,result]);
  const totalLength = result?.data?.[0]?.result?.toString() || "0";
  const historyTable = useReadContract({
    ...iocConfig,
    functionName: "user2SaleType2ContributorList",
    args: [address as Address, 1, BigInt(0), BigInt(totalLength)],
    chainId: Number(chainId) ?? 56,
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  const dateTime = (timestamp: any) => {
    const numericTimestamp = Number(timestamp);
    const date = new Date(numericTimestamp * 1000);
    return date.toLocaleString();
  };
  return (
    <Card  >
      <Box sx={{ p: {xs:1, sm:4}, color: "white" }}>
       

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            alignItems: "center",
          }}
        >
          <h4 className="text-white text-[18px] sm:text-[28px] font-[700] " >
            Contributors History
          </h4>
        </Box>

        <Card className="rounded-0">
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  
                 
                  <TableCell>
                  Amount
                   
                  </TableCell>
                  <TableCell>
                  Coin
                    
                  </TableCell>
                  <TableCell>
                  Quantity
                   
                  </TableCell>

                  <TableCell>
                  Date & Time
                   
                  </TableCell>
                  
                 
                  
               
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {mockData.map((row, index) => (
                  <TableRow data-aos="fade-up" key={index}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {row.from}
                        <IconButton
                          size="small"
                          sx={{ color: "white", ml: 1 }}
                          onClick={() => handleCopy(row.from)}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    
                    <TableCell>{row.lastClaim}</TableCell>
                    <TableCell>MDC</TableCell>
                    <TableCell>{row.reward}</TableCell>
                    <TableCell>{row.tcr}</TableCell>
                    
                    
                  </TableRow>
                ))} */}

{historyTable.isLoading ? (
              [...Array(5)].map((_, index) => (
                <TableRow key={index} className="border-b-0">
                  {[...Array(5)].map((_, i) => (
                    <TableCell key={i} className="text-white">
                      <Skeleton variant="text" width={100} height={20} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : historyTable?.data && historyTable?.data?.length > 0 ? (
              historyTable?.data.map((item: any, index: number) => (
                <TableRow key={index} className="border-b-0">
                  <TableCell className="text-white">
                   <Box sx={{display:"flex",alignItems:"center"}}>
                   {sortAddress(item?.user)}&nbsp;
                    <Box onClick={()=>handleCopy(item?.user)}>
                    <Copy color="#fff" />
                </Box>
                   </Box>
                  </TableCell>
                  <TableCell className="text-white">
                    $
                    {item?.amount
                      ? Number(formatEther(BigInt(item?.amount))).toFixed(2)
                      : "--"}
                  </TableCell>
                  <TableCell className="text-white">
                    {item?.coin === "Native" ? "BNB" : item?.coin || "--"}
                  </TableCell>
                  <TableCell className="text-white">
                    {Number(formatUnits(item?.volume, 18)).toFixed(2)} AIZU
                  </TableCell>
                  <TableCell className="text-white">
                    {dateTime(item?.at) || "--"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-white py-4">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Card>
      </Box>
    </Card>
  );
}
