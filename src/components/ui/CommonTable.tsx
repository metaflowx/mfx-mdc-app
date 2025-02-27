"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { TeamReward } from "@/types";
import CommonTabButton from "./CommonTabButton";
import { Card } from "./card";
import { StyledTableContainer } from "./StyledTableContainer";
import CommonButton from "./CommonButton";

const ClaimAllButton = muiStyled(Button)({
  backgroundColor: "transparent",
  color: "#1AB3E5",
  borderRadius: "20px",
  border: "1px solid #1AB3E5",
  padding: "8px 24px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#0081CC",
    color: "#fff",
  },
});

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

export default function TeamRewardTable() {
  const [activeTab, setActiveTab] = useState("self");
  const tabList=[
    {
title:"Self Earning",
value:"self"
    },
    {
        title:" Team Reward",
        value:"team"
                },
]
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box sx={{ p: {xs:1, sm:4}, color: "white" }}>
      <Box sx={{ mb: 3,mt:2 }} className="displayCenter">
        <CommonTabButton setActiveTab={setActiveTab} activeTab={activeTab} tabList={tabList} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <h4 className="text-white text-[18px] sm:text-[30px] font-[] " >
          {activeTab === "self" ? "Self Earning Reward" : "Team Reward"}
        </h4>
        {activeTab === "team" && (
          <ClaimAllButton>Claim All Reward</ClaimAllButton>
        )}
      </Box>

      <Card className="rounded-0">
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>From</TableCell>
                <TableCell>Level</TableCell>
                <TableCell style={{whiteSpace:"pre"}} >
                  DR
                  <Tooltip title="Direct Referral">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell style={{whiteSpace:"pre"}}>
                  RP
                  <Tooltip title="Reward Points">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>Reward</TableCell>
                <TableCell style={{whiteSpace:"pre"}}>
                  TCR
                  <Tooltip title="Total Claimed Reward">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell style={{whiteSpace:"pre"}}>
                  RR
                  <Tooltip title="Remaining Reward">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell style={{whiteSpace:"pre"}}>
                  ST
                  <Tooltip title="Staking Time">
                    <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell style={{whiteSpace:"pre"}}>Last Claim</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((row, index) => (
                <TableRow  data-aos="fade-up" key={index}>
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
                  <TableCell style={{whiteSpace:"pre"}}>{row.lastClaim}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <CommonButton title="Claim" width="w-[83px]" />
                      &nbsp;
                      <CommonButton title="Unstake" width="w-[104px]" />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Card>
    </Box>
  );
}
