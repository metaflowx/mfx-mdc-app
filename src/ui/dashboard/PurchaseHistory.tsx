"use client";
import { Card } from "@/components/ui/card";
import { StyledTableContainer } from "@/components/ui/StyledTableContainer";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { TeamReward } from "@/types";
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

 

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <Card  >
      <Box sx={{ p: 4, color: "white" }}>
       

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Contributors History
          </Typography>
        </Box>

        <Card className="rounded-0">
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell sx={{whiteSpace:"pre"}} >Date & Time</TableCell>
                  <TableCell>
                  Coin
                    
                  </TableCell>
                  <TableCell>
                  Amount
                   
                  </TableCell>
                  <TableCell>
                  Quantity
                   
                  </TableCell>
                  
                 
                  
               
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {mockData.map((row, index) => (
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
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Card>
      </Box>
    </Card>
  );
}
