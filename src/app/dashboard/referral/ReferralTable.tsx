"use client";
import { Card } from '@/components/ui/card';
import CommonButton from '@/components/ui/CommonButton';
import CommonTabButton from '@/components/ui/CommonTabButton';
import { StyledTableContainer } from '@/components/ui/StyledTableContainer';
import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react'
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { TeamReward } from '@/types';
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
  return (

   

    <Card>
         <Box sx={{ p: 4, color: "white" }}>

<Box sx={{ mb: 3 }} className="displayCenter">
        <CommonTabButton tabList={tabList} setActiveTab={setActiveTab} activeTab={activeTab} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {activeTab === "direct" ? "Direct Referral" : "Upline Referral"}
        </Typography>
       
      </Box>

      <Card className="rounded-0">
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>From</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>
                  DR
                  <Tooltip title="Direct Referral">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  RP
                  <Tooltip title="Reward Points">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>Reward</TableCell>
                <TableCell>
                  TCR
                  <Tooltip title="Total Claimed Reward">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  RR
                  <Tooltip title="Remaining Reward">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  ST
                  <Tooltip title="Staking Time">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>Last Claim</TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((row, index) => (
                <TableRow key={index}>
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
                  <TableCell>{row.dr} MDC</TableCell>
                  <TableCell>{row.rp}</TableCell>
                  <TableCell>{row.reward}</TableCell>
                  <TableCell>{row.tcr}</TableCell>
                  <TableCell>{row.rr}</TableCell>
                  <TableCell>{row.st}</TableCell>
                  <TableCell>{row.lastClaim}</TableCell>
                
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
