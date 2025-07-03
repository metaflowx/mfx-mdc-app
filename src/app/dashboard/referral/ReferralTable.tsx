"use client";
import { Card } from "@/components/ui/card";
import CommonTabButton from "@/components/ui/CommonTabButton";
import { StyledTableContainer } from "@/components/ui/StyledTableContainer";
import { stakeConfig, contractConfig } from "@/constants/contract";
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import copy from "clipboard-copy";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useAccount, useReadContract } from "wagmi";
import { Address, formatEther, zeroAddress } from "viem";
import { toast } from "react-toastify";
import { sortAddress } from "@/utils";
import { Copy } from "lucide-react";

export default function ReferralTable() {
  const tabList = [
    { title: "Direct Referral", value: "direct" },
    { title: "Upline Referral", value: "upline" },
  ];
  const [activeTab, setActiveTab] = useState("direct");
  const [selectedLevel, setSelectedLevel] = useState(1);
  const { chainId } = useAppKitNetwork();
  const { address } = useAccount();

  const getUserActiveLevel = useReadContract({
    ...stakeConfig,
    functionName: "getLevel",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });

  return (
    <Card>
      <Box sx={{ p: { xs: 1, sm: 4 }, color: "white" }}>
        <Box sx={{ mb: 3 }} className="displayCenter">
          <CommonTabButton
            tabList={tabList}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            alignItems: "center",
          }}
        >
          <h4 className="text-white text-[18px] sm:text-[28px] font-[700]">
            {activeTab === "direct" ? "My Team" : "Upline Referral"}
          </h4>

          {activeTab === "direct" && (
            <div className="relative flex items-center gap-10">
              <span className="text-white text-sm sm:text-base font-medium">
                Your Current Active level: {getUserActiveLevel?.data?.toString() ?? "-"}
              </span>
              <div className="relative">
                <select
                  className="bg-[#1f1f1f] text-white border border-gray-600 rounded-xl px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#2caee2] text-sm sm:text-base"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(Number(e.target.value))}
                >
                  {Array.from({ length: 20 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Level {i + 1}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ▼
                </div>
              </div>
            </div>
          )}
        </Box>

        {activeTab === "direct" ? (
          <DirectReferralTable selectedLevel={selectedLevel} userActiveLevel={Number(getUserActiveLevel?.data?.toString())}  />
        ) : (
          <UplineReferralTable />
        )}
      </Box>
    </Card>
  );
}

const DirectReferralTable = ({ selectedLevel,userActiveLevel }: { selectedLevel: number,userActiveLevel:number }) => {
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork();

  const getRef = useReadContract({
    ...contractConfig,
    functionName: "getReferralsCount",
    args: [address as Address],
    chainId: Number(chainId),
  });

  const dataRef = Number(getRef?.data) > 0 ? BigInt(Number(getRef.data)) : BigInt(0);

  const result = useReadContract({
    ...contractConfig,
    functionName: "getDirectReferrals",
    args: [address as Address, BigInt(0), dataRef],
    chainId: Number(chainId),
  });

  const getLevelResult = useReadContract({
    ...contractConfig,
    functionName: "getDownlineReferralAtLevel",
    args: [address as Address, BigInt(selectedLevel)],
    chainId: Number(chainId),
  });

  return (
    <Card className="rounded-0">
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.NO</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Staking Amount</TableCell>
              {
                selectedLevel == 1 &&
                <TableCell>Direct Bonus</TableCell>
              }
              <TableCell>Team APR</TableCell>
              <TableCell>Team Rewards</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getLevelResult.isLoading ? (
              [...Array(3)].map((_, index) => (
                <TableRow key={index}>
                  {[...Array(3)].map((_, i) => (
                    <TableCell key={i}>
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
                  userActiveLevel={userActiveLevel}
                  selectedLevel={selectedLevel}
                />
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
  );
};

const UplineReferralTable = ({}) => {
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork();
  const bonus = [
     5,
    1.25,
    1.75,
    2
  ];

    const result = useReadContract({
    ...contractConfig,
    functionName: "getReferralUplineTree",
    args: [address as Address],
    chainId: Number(chainId),
  });

  return (
    <Card className="rounded-0">
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Level</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Bonus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result?.data && result?.data.map((item:any, index:any) => (
              <TableRow key={index}>
                <TableCell className="text-white">{index + 1}</TableCell>
                <TableCell className="text-white">
                  {item!==zeroAddress?(
                    <>
                    {item} &nbsp;
                  <Copy
                    className="cursor-pointer inline"
                    size={16}
                    onClick={() => {
                      copy(item);
                      toast.success("Address copied to clipboard!");
                    }}
                  />
                    </>
                  ) 
                  : "-"
                  }
                </TableCell>
                <TableCell className="text-white">{bonus[index]}%</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Card>
  );
};

const TableBodyData = ({
  index,
  item,
  address,
  chainId,
  userActiveLevel,
  selectedLevel

}: {
  index: number;
  item: any;
  address: Address;
  chainId: number;
  userActiveLevel: number;
  selectedLevel: number;
}) => {
  const stakeDetail = useReadContract({
    ...stakeConfig,
    functionName: "user2Staker",
    args: [item],
    chainId,
  });

  const getUserRoi = useReadContract({
    ...stakeConfig,
    functionName: "getROIPercentByLevel",
    args: [address,BigInt(index+1)],
    chainId,
  });

  const handleCopy = (item: any) => {
    copy(item);
    toast.success("Address copied to clipboard!");
  };

  const reward =
    stakeDetail?.data && getUserRoi?.data
      ? (
          ((Number(formatEther(stakeDetail.data.amount)) * (0.1)) *
            Number(getUserRoi.data.toString())) /
          1e4
        ).toFixed(2)
      : "0";

  return (
    <TableRow key={index}>
      <TableCell className="text-white">{index + 1}</TableCell>
      <TableCell className="text-white">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {sortAddress(item)}&nbsp;
          <Box onClick={() => handleCopy(item)} className="cursor-pointer">
            <Copy color="#fff" size={16} />
          </Box>
        </Box>
      </TableCell>
      <TableCell className="text-white">
        {stakeDetail?.data
          ? `${formatEther(stakeDetail.data.amount)} MDC`
          : "0 MDC"}
      </TableCell>
      {
        selectedLevel===1 &&
        <TableCell className="text-white">5%</TableCell>
        }
      <TableCell className="text-white">{
      userActiveLevel<selectedLevel?`Kindly, Activate Level ${selectedLevel} `:`${(Number(getUserRoi?.data?.toString())/100)}%`
      }</TableCell>
      <TableCell className="text-white">≈{userActiveLevel<selectedLevel?"0":reward} MDC</TableCell>
    </TableRow>
  );
};
