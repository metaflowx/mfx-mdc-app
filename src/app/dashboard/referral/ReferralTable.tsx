"use client";
import { Card } from "@/components/ui/card";
import CommonTabButton from "@/components/ui/CommonTabButton";
import { StyledTableContainer } from "@/components/ui/StyledTableContainer";
import { stakeConfig } from "@/constants/contract";
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
  const [selectedLevel, setSelectedLevel] = useState(1);

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

  const getLevelResult = useReadContract({
    ...contractConfig,
    functionName: "getDownlineReferralAtLevel",
    args: [address as Address, BigInt(selectedLevel)],
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

  const getUserLevel = useReadContract({
    ...stakeConfig,
    functionName: "getLevel",
    args: [address as Address],
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
            {activeTab === "direct" ? "My Team" : "Upline Referral"}
          </h4>

          <div className="relative flex items-center gap-10">
            {/* Show current level */}
            <span className="text-white text-sm sm:text-base font-medium">
              Your Current level: {getUserLevel?.data?.toString() ?? "-"}
            </span>

            {/* Dropdown */}
            <div className="relative">
              <select
                className="bg-[#1f1f1f] max-h-[200px] text-white border border-gray-600 rounded-xl px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#2caee2] text-sm sm:text-base"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(Number(e.target.value))}
              >
                {Array.from({ length: 20 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Level {i + 1}
                  </option>
                ))}
              </select>

              {/* Chevron Icon */}
              <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                ▼
              </div>
            </div>
          </div>
        </Box>
        <Card className="rounded-0">
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.NO</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Staking Amount</TableCell>
                  <TableCell>Bonus</TableCell>
                  <TableCell>Team Rewards</TableCell>
                  {/* <TableCell sx={{ whiteSpace: "pre" }}>Profit</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {getLevelResult.isLoading ? (
                  [...Array(3)].map((_, index) => (
                    <TableRow key={index} className="border-b-0">
                      {[...Array(3)].map((_, i) => (
                        <TableCell key={i} className="text-white">
                          <Skeleton variant="text" width={100} height={20} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : getLevelResult?.data && getLevelResult?.data?.length > 0 ? (
                  getLevelResult.data.map((item: any, index: number) => (
                    <TableBodyData
                      key={index}
                      index={index}
                      item={item}
                      address={address as Address}
                      chainId={Number(chainId)}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-white py-4"
                    >
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

const TableBodyData = ({
  index,
  item,
  address,
  chainId,
}: {
  index: number;
  item: any;
  address: Address;
  chainId: number;
}) => {
  const stakeDetail = useReadContract({
    ...stakeConfig,
    functionName: "user2Staker",
    args: [item],
    chainId: Number(chainId) ?? 56,
  });

  const getUserRoi = useReadContract({
    ...stakeConfig,
    functionName: "getROIPercent",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });
  const handleCopy = (item: any) => {
    copy(item);
    toast.success("Address copied to clipboard!");
  };

  return (
    <TableRow key={index} className="border-b-0">
      {/* Level */}
      <TableCell className="text-white">{index + 1}</TableCell>

      {/* Address */}
      <TableCell className="text-white">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {sortAddress(item)}&nbsp;
          <Box onClick={() => handleCopy(item)} className="cursor-pointer">
            <Copy color="#fff" size={16} />
          </Box>
        </Box>
      </TableCell>

      {/* Staking Amount */}
      <TableCell className="text-white">
        {stakeDetail?.data
          ? `${formatEther(stakeDetail.data.amount)} MDC`
          : "0 MDC"}
      </TableCell>

      {/* Bonus */}
      <TableCell className="text-white">5%</TableCell>

      {/* Team Reward */}
      <TableCell className="text-white">
        {stakeDetail.data && getUserRoi.data
          ? `${(
              (Number(formatEther(stakeDetail.data.amount)) *
                Number(getUserRoi.data.toString())) /
              1e4
            ).toFixed(4)} MDC`
          : "0 MDC"}
      </TableCell>
    </TableRow>
  );
};
