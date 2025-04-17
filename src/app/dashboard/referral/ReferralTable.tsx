"use client";
import { Card } from '@/components/ui/card';
import CommonTabButton from '@/components/ui/CommonTabButton';
import { StyledTableContainer } from '@/components/ui/StyledTableContainer';
import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react'
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { TeamReward } from '@/types';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useAccount, useReadContract } from 'wagmi';
import { Address, formatEther, formatUnits, parseUnits } from "viem";
import { contractConfig } from '@/constants/contract';
const mockData: TeamReward[] = Array(7).fill({
  from: "0x578e...ea4",
  level: "8K MDC",
  levelAmount: "$0.00",
  dr: 100,
  rp: 10,
  reward: "5%",
  tcr: 20,
  rr: 20,
  st: 20,
  lastClaim: "Jun 12 2024 23:11:38 PM",
});
export default function ReferralTable() {
    const tabList=[
        {
title:"Direct Referral",
value:"direct"
        },
        {
            title:"Upline Referral",
            value:"upline"
                    },
    ]
     const [activeTab, setActiveTab] = useState("direct");

     const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
      };


      const { chainId } = useAppKitNetwork();
      const { address } = useAccount();
    
      const getRef = useReadContract({
        ...contractConfig,
        functionName: "getReferralsCount",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
      });
    
      const dataRef =
        Number(getRef?.data) > 0 ? BigInt(Number(getRef.data)) : BigInt(0);
    
      const result = useReadContract({
        ...contractConfig,
        functionName: "getDirectReferrals",
        args: [address as Address, BigInt(0), dataRef],
        chainId: Number(chainId) ?? 56,
      });






  return (

   

    <Card>
         <Box sx={{  p: {xs:1, sm:4}, color: "white" }}>

{/* <Box sx={{ mb: 3 }} className="displayCenter">
        <CommonTabButton tabList={tabList} setActiveTab={setActiveTab} activeTab={activeTab} />
      </Box> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <h4 className="text-white text-[18px] sm:text-[28px] font-[700] ">
          {activeTab === "direct" ? "Direct Referral" : "Upline Referral"}
        </h4>
       
      </Box>

      <Card className="rounded-0">
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>From</TableCell>
                <TableCell>Level</TableCell>
                <TableCell sx={{whiteSpace:"pre"}}>
                  DR
                  <Tooltip title="Direct Referral">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{whiteSpace:"pre"}}>
                  RP
                  <Tooltip title="Reward Points">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>Reward</TableCell>
                <TableCell sx={{whiteSpace:"pre"}}>
                  TCR
                  <Tooltip title="Total Claimed Reward">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{whiteSpace:"pre"}}>
                  RR
                  <Tooltip title="Remaining Reward">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{whiteSpace:"pre"}}>
                  ST
                  <Tooltip title="Staking Time">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{whiteSpace:"pre"}}>Last Claim</TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((row, index) => (
                <TableRow   data-aos="fade-up" key={index}>
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
                  <TableCell>
                    <Box>
                      <Typography>{row.level}</Typography>
                      <Typography variant="caption" sx={{ color: "grey.500" }}>
                        {row.levelAmount}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{whiteSpace:"pre"}}>{row.dr} MDC</TableCell>
                  <TableCell sx={{whiteSpace:"pre"}}>{row.rp}</TableCell>
                  <TableCell sx={{whiteSpace:"pre"}}>{row.reward}</TableCell>
                  <TableCell sx={{whiteSpace:"pre"}}>{row.tcr}</TableCell>
                  <TableCell sx={{whiteSpace:"pre"}}>{row.rr}</TableCell>
                  <TableCell sx={{whiteSpace:"pre"}}>{row.st}</TableCell>
                  <TableCell sx={{whiteSpace:"pre"}}>{row.lastClaim}</TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Card>
      </Box>
    </Card>
   
  )
}
