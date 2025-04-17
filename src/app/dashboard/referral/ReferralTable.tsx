"use client";
import { Card } from "@/components/ui/card";
import CommonTabButton from "@/components/ui/CommonTabButton";
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
import React, { useState } from "react";
import copy from "clipboard-copy";
import { TeamReward } from "@/types";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useAccount, useReadContract } from "wagmi";
import { Address, formatEther, formatUnits, parseUnits } from "viem";
import { contractConfig, iocConfig } from "@/constants/contract";
import { toast } from "react-toastify";
import { sortAddress } from "@/utils";
import { Copy } from "lucide-react";
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
  const tabList = [
    {
      title: "Direct Referral",
      value: "direct",
    },
    {
      title: "Upline Referral",
      value: "upline",
    },
  ];
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
      <Box sx={{ p: { xs: 1, sm: 4 }, color: "white" }}>
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
                  <TableCell>User</TableCell>
                  <TableCell>Bonus</TableCell>
                  <TableCell sx={{ whiteSpace: "pre" }}>
                  Profit
                   
                  </TableCell>
                 
                 
                 
                </TableRow>
              </TableHead>
              <TableBody>
              {result.isLoading ? (
              [...Array(3)].map((_, index) => (
                <TableRow key={index} className="border-b-0">
                  {[...Array(3)].map((_, i) => (
                    <TableCell key={i} className="text-white">
                      <Skeleton variant="text" width={100} height={20} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : result?.data && result?.data?.length > 0 ? (
              result?.data.map((item: any, index: number) => (
                <TableBodyData index={index} item={item} />
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

const TableBodyData = ({ index, item }: { index: number; item: any }) => {
  const { chainId } = useAppKitNetwork();
  const getRef = useReadContract({
    ...iocConfig,
    functionName: "user2SaleType2Contributor",
    args: [item as Address, 1],
    chainId: Number(chainId) ?? 56,
    query: {
      select(data) {
        const value = parseFloat(formatEther(data.volume)) * 0.1;
        return value.toFixed(2);
      },
    },
  });

  const handleCopy = (item: any) => {
    copy(item);
    toast.success("Address copied to clipboard!");
  };
  return (
    <TableRow key={index} className="border-b-0">
      <TableCell className="text-white">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {sortAddress(item)}&nbsp;
          <Box onClick={() => handleCopy(item)}>
            <Copy color="#fff" />
          </Box>
        </Box>
      </TableCell>
      <TableCell className="text-white">10%</TableCell>
      <TableCell className="text-white">
        {getRef?.data ? getRef?.data : 0} MDC
      </TableCell>
    </TableRow>
  );
};
