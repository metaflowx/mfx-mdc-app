"use client";

import { useEffect, useState } from "react";
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
import { stakeConfig, StakeContractAddress } from "@/constants/contract";
import { useAccount, useBlockNumber, useReadContract, useWriteContract } from "wagmi";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import copy from "clipboard-copy";
import { Address, formatEther } from "viem";
import { sortAddress } from "@/utils";
import { Copy } from "lucide-react";
import moment from "moment";
import { extractDetailsFromError } from "@/utils/extractDetailsFromError";
import { StakingABI } from "@/app/ABI/StakingABI";
import ClaimConfirmationModal from "./ClaimConfirmationModal";
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
const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork();
  const queryClient = useQueryClient();
  const totalStakeLenth = useReadContract({
    ...stakeConfig,
    functionName: "totalStakedLengthForUser",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });

  const result = useReadContract({
    ...stakeConfig,
    functionName: "user2StakerList",
    args: [address as Address, BigInt(0), BigInt(totalStakeLenth?.data || 0)],
    chainId: Number(chainId) ?? 56,
  });


  const isLoading = result?.isLoading;
  const data = result?.data ?? [];

    useEffect(() => {
      queryClient.invalidateQueries({
        queryKey: totalStakeLenth.queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: result.queryKey,
      });
    }, [blockNumber, queryClient,totalStakeLenth, result]);

     const handleCopy = (item: any) => {
        copy(item);
        toast.success("Address copied to clipboard!");
      };

  return (
    <Box sx={{ p: {xs:1, sm:4}, color: "white" }}>
      <Box sx={{ mb: 3,mt:2 }} className="displayCenter">
        {/* <CommonTabButton setActiveTab={setActiveTab} activeTab={activeTab} tabList={tabList} /> */}
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
                <TableCell>User</TableCell>
                <TableCell>Staked Amount</TableCell>
                <TableCell style={{whiteSpace:"pre"}} >
                Tier
                  
                </TableCell>
                <TableCell style={{whiteSpace:"pre"}}>
                Reward
                  
                </TableCell>
               
                <TableCell style={{whiteSpace:"pre"}}>
                Claim Reward
                  
                </TableCell>
                <TableCell style={{whiteSpace:"pre"}}>
                  Start Time
                  
                </TableCell>
                <TableCell style={{whiteSpace:"pre"}}>
                Last Claimed
                 
                </TableCell>
              
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {mockData.map((row, index) => (
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
              ))} */}

{isLoading ? (
              [...Array(5)].map((_, index) => (
                <TableRow key={index} className="animate-pulse border-b-0">
                  {Array(8).fill("").map((_, i) => (
                    <TableCell key={i} className="py-4">
                      <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-white py-6">
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => {
                const startdate = new Date(Number(item?.startTime) * 1000);
                const lastdate = new Date(Number(item?.lastClaimTime) * 1000);

                return (
                  <TableRow key={index} className="border-b-0">
                    <TableCell className="text-white whitespace-pre">
                      <div className="flex items-center">
                      {address ? sortAddress(address) : ""}&nbsp;
                      <IconButton onClick={() => handleCopy(address)}>
                         <Copy color="#fff" />
                      </IconButton>
                      </div>
                    </TableCell>
                    <TableCell className="text-white whitespace-pre">
                      {Number(formatEther(item?.volume)).toFixed(2)} MDC
                    </TableCell>
                    <TableCell className="text-white">
                      {Number(item?.tierId) + 1}
                    </TableCell>
                    <DailyReward index={index} address={address as Address} />
                    <TableCell className="text-white whitespace-pre">
                      {parseFloat(formatEther(item?.claimedRewards)).toFixed(2)} MDC
                    </TableCell>
                    <TableCell className="text-white whitespace-pre">
                      {moment(startdate).format("lll")}
                    </TableCell>
                    <TableCell className="text-white whitespace-pre">
                      {moment(lastdate).format("lll")}
                    </TableCell>
                    <ActionSection item={item} index={index} />
                  </TableRow>
                );
              })
            )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Card>
    </Box>
  );
}

const ActionSection = ({ item, index }: { item: any; index: any }) => {
  const { address } = useAccount();
  const[indexData,setIndexData]=useState(null)
  const[openModal,setOpenModal]=useState(false)

  const { writeContractAsync, isPending, isSuccess, isError } =
    useWriteContract();
    const { writeContractAsync:writeContractAsyncClaim, isPending:isPendingClaim, isSuccess:isSuccessClaim, isError:isErrorClaim } =
    useWriteContract();
    const { writeContractAsync:writeContractAsyncUnstake, isPending:isPendingUnstake, isSuccess:isSuccessUnstake, isError:isErrorUnstake } =
    useWriteContract();
  const { chainId } = useAppKitNetwork();
  const tierData = useReadContract({
    ...stakeConfig,
    functionName: "getTier",
    args: [item?.tierId],
    chainId: Number(chainId) ?? 56,
  });

 


  const handleRestake = async () => {
    try {
      const res = await writeContractAsync({
        address: StakeContractAddress,
        abi: StakingABI,
        functionName: "restake",
        args: [BigInt(index)],
      });

      if (res) {
        toast.success("Re-Stake successfully");
      }
    } catch (error: any) {
      console.log(">>>>>>>>>>>>.error", error);

      toast.error(extractDetailsFromError(error.message as string) as string);
    }
  };

  const handleUnstake = async () => {
    try {
      const res = await writeContractAsyncUnstake({
        address: StakeContractAddress,
        abi: StakingABI,
        functionName: "unstake",
        args: [address as Address, BigInt(index)],
      });

      if (res) {
        toast.success("Un-Stake successfully");
      }
    } catch (error: any) {
      console.log(">>>>>>>>>>>>.error", error);

      toast.error(extractDetailsFromError(error.message as string) as string);
    }
  };
console.log(">>>>>>>>>>>>tierData",item);


  return (
    <>
    
    <TableCell className="text-white ">
      <div className="flex items-center justify-end space-x-2">
        <Button
        
        onClick={()=>{
          setOpenModal(true)
          setIndexData(index)}}
          disabled={isPendingClaim || item?.claimedRewards <=0}
          className="w-[86px] bg-black border border-[#2865FF] text-white px-3 py-1 rounded-[50px] h-[50px] "
        >
         {isPendingClaim ? "Claiming...":"Claim"} 
        </Button>
       
          <CommonButton onClick={()=>{
          setOpenModal(true)
          setIndexData(index)}}
          
          disabled={isPendingClaim || item?.claimedRewards <=0}
          title= {isPendingClaim ? "Claiming...":"Claim"}  width="120px" />
        
        {/* <CommonButton
          disabled={isPending}
          onClick={() => handleRestake()}
          title={`${isPending ? "Restaking..." : "Restake"}`}
          width="100px"
        /> */}
      </div>
    </TableCell>
    {openModal && (
      <ClaimConfirmationModal indexData={indexData} open={openModal} onClose={()=>{
        setOpenModal(false)
        setIndexData(null)}} />
    )}
    </>
  );
};

const DailyReward = ({
  index,
  address,
}: {
  index: number;
  address: Address;
}) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  const { chainId } = useAppKitNetwork();
  const dailyReward = useReadContract({
    ...stakeConfig,
    functionName: "calculateRewards",
    args: [address, BigInt(index)],
    chainId: Number(chainId) ?? 56,
  });
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: dailyReward.queryKey,
    });
    
  }, [blockNumber, queryClient,dailyReward]);

  return (
    <TableCell className="text-white whitespace-pre">
      {dailyReward?.data
        ? parseFloat(formatEther(dailyReward?.data)).toFixed(2)
        : "0.00"}{" "}
      MDC
    </TableCell>
  );
};
