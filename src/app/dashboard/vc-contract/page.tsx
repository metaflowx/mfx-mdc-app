"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import {
  Button,
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Skeleton,
} from "@mui/material";
import {
  useAccount,
  useBlockNumber,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import { Card } from "@/components/ui/card";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { StyledTableContainer } from "@/components/ui/StyledTableContainer";
import {
  ICOContractAddress,
  iocConfig,
  USDTAddress,
  vcConfig,
  VCContractAddress,
} from "@/constants/contract";
import { Address, erc20Abi, formatEther, parseEther, parseUnits } from "viem";
import { toast } from "react-toastify";
import { extractDetailsFromError } from "@/utils/extractDetailsFromError";
import useCheckAllowance from "@/hooks/useCheckAllowance";
import { useQueryClient } from "@tanstack/react-query";
import { useAppKitNetwork } from "@reown/appkit/react";
import moment from "moment";
import EarningPage from "./EarningCard";
const GradientButton = styled(Button)({
  background: "linear-gradient(90deg, #1ab3e5 0%, #034f89 50%, #1ab3e5 100%)",
  color: "#fff",
  border: "1px solid #1ab3e5",
  borderRadius: "8px",
  padding: "12px 24px",
  fontWeight: 700,
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(90deg, #1ab3e5 10%, #034f89 50%, #1ab3e5 90%)",
  },
});

const predefinedAmounts = [
  1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
];

const calculateReturns = (amount: number) => {
  let multiplier = 0.5; // Initial multiplier for $1000
  let returns = [];

  for (let i = 1; i <= 10; i++) {
    returns.push({ month: i, payout: (amount * 2).toFixed(2) });
    multiplier *= 2; // Double the multiplier for next amount tier
  }

  return returns;
};

const VCContractPage = () => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  const resultOfCheckAllowance = useCheckAllowance({
    spenderAddress: VCContractAddress,
    token: USDTAddress,
  });
  const { chainId } = useAppKitNetwork();
  const [activeTab, setActiveTab] = useState("bought");
  const [isAproveERC20, setIsApprovedERC20] = useState(true);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const { isConnected, address } = useAccount();
  const scrollRef: any = useRef(null);
  const { writeContractAsync, isPending, isSuccess, isError } =
    useWriteContract();
    const { writeContractAsync:calimWriteAsync, isPending:pending, isSuccess:success, isError:error } =
    useWriteContract();
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };
  const totalStakeLenth = useReadContract({
    ...vcConfig,
    functionName: "totalStakedLengthForUser",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });

  const resultStakelIst = useReadContract({
    ...vcConfig,
    functionName: "user2StakerList",
    args: [address as Address, BigInt(0), BigInt(totalStakeLenth?.data || 0)],
    chainId: Number(chainId) ?? 56,
  });

  const result = useReadContracts({
    contracts: [
      {
        ...vcConfig,
        functionName: "user2Staker",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
      },
    ],
  });

  const stakeHandler = async () => {
    try {
      const formattedAmount = parseUnits(amount, 18);
      const res = await writeContractAsync({
        ...vcConfig,
        functionName: "stake",
        args: [formattedAmount],
      });
      if (res) {
        setAmount("");
        toast.success("Transaction completed");
      }
    } catch (error: any) {
      toast.error(extractDetailsFromError(error.message as string) as string);
    }
  };

  const approveToken = async () => {
    try {
      const formattedAmount =
        Number?.(amount) > 0
          ? parseEther?.(amount)
          : parseEther?.(
              BigInt((Number.MAX_SAFE_INTEGER ** 1.3)?.toString())?.toString()
            );
      const res = await writeContractAsync({
        abi: erc20Abi,
        address: USDTAddress,
        functionName: "approve",
        args: [VCContractAddress, formattedAmount],
        account: address,
      });
      if (res) {
        setIsApprovedERC20(true);
        toast.success("Token approved successfully");
      }
    } catch (error: any) {
      toast.error(extractDetailsFromError(error.message as string) as string);
    }
  };

  useEffect(() => {
    if (resultOfCheckAllowance && address) {
      const price = parseFloat(amount === "" ? "0" : amount);
      const allowance = parseFloat(
        formatEther?.(resultOfCheckAllowance.data ?? BigInt(0))
      );
      if (allowance >= price) {
        setIsApprovedERC20(true);
      } else {
        setIsApprovedERC20(false);
      }
    }
  }, [resultOfCheckAllowance, address, amount]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: resultOfCheckAllowance.queryKey,
    });
    queryClient.invalidateQueries({
      queryKey: resultStakelIst.queryKey,
    });
  }, [blockNumber, queryClient, resultStakelIst, resultOfCheckAllowance]);

 
  useEffect(() => {
    if (resultStakelIst) setLoading(false);
  }, [resultStakelIst]);

  const totalVCReward = useMemo(() => {
    const totalReward:any = resultStakelIst &&
    resultStakelIst?.data &&
    resultStakelIst?.data.map((item:any)=>{
     
     const amount= Number(formatEther(item?.amount))
      return amount*2
      
    })
   
    return totalReward?.length>0 ? totalReward?.reduce((a:any,b:any)=>Number(a)+Number(b)):"0"
  
    

  }, [resultStakelIst])
 

  const claimRewardHandler =async(index:any)=>{
    try {
    
      const res = await calimWriteAsync({
        ...vcConfig,
        functionName: "claimReward",
        args: [BigInt(index)],
      });
      if (success) {
       
        toast.success("Claimed successfully.");
      }
    } catch (error: any) {
      toast.error(extractDetailsFromError(error.message as string) as string);
    }
  }

  const tokenPrice = useReadContract({
      ...iocConfig,
      functionName: "getSaleTokenPrice",
      args: [1],
      chainId: Number(chainId) ?? 56,
    });

  const totalMDC = useMemo(() => {

    const calculate = Number(amount) /  Number(formatEther(tokenPrice?.data==0?BigInt(tokenPrice?.data ?? 0):"100000000000000000"))
    const mdcValue = (calculate * 30/100)/24
    return mdcValue
    
    

  }, [amount,tokenPrice])

  return (
    <Box>
      <EarningPage />
      <Card>
        <Box p={4}>
          <Typography py={2} variant="h5" gutterBottom>
            Buy Tokens
          </Typography>
          <Box
            py={3}
            display="flex"
            alignItems="center"
            sx={{ overflow: "hidden" }}
          >
            <IconButton onClick={scrollLeft}>
              <ArrowBackIos style={{ color: "#fff" }} />
            </IconButton>
            <Box
              ref={scrollRef}
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {predefinedAmounts.map((value) => (
                <Button
                  disabled={isPending}
                  key={value}
                  variant="outlined"
                  onClick={() => setAmount(value.toString())}
                  sx={{
                    minWidth: "80px",
                    background:
                      amount === value.toString()
                        ? "linear-gradient(90deg, #1AB3E5,rgba(26, 178, 229, 0), #1AB3E5)"
                        : "transparent",
                    color: amount === value.toString() ? "white" : "inherit",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #1AB3E5,rgba(26, 178, 229, 0), #1AB3E5)",
                      color: "white",
                    },
                  }}
                >
                  {`$${value}`}
                </Button>
              ))}
            </Box>

            <IconButton onClick={scrollRight}>
              <ArrowForwardIos style={{ color: "#fff" }} />
            </IconButton>
          </Box>
          {amount && (
            <Card>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  Buy Plan for ${amount}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Locking Period: 24 Months
                </Typography>
                <Typography variant="body1" gutterBottom>
                  APR: 30%
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Monthly Return: {((Number(totalMDC))).toFixed(2)} MDC
                  for 24 months
                </Typography>
              </Box>
            </Card>
          )}

          <Box mt={2}>
            <GradientButton
              disabled={isPending || amount === ""}
              onClick={() => {
                if (isAproveERC20) {
                  stakeHandler();
                } else {
                  approveToken();
                }
              }}
              fullWidth
            >
              {isPending && !isAproveERC20
                ? "Approving..."
                : isPending && isAproveERC20
                ? "Buying..."
                : isAproveERC20
                ? " Buy Plan"
                : "Approve"}
            </GradientButton>
          </Box>
        </Box>
      </Card>

      <Box sx={{ display: "flex", alignItems: "center" }} mt={2}>
        <GradientButton
          onClick={() => setActiveTab("bought")}
          sx={{
            opacity: activeTab === "bought" ? 1 : 0.5,
            boxShadow: activeTab === "bought" ? "0px 0px 10px #00f0ff" : "none",
          }}
        >
          Bought History
        </GradientButton>{" "}
        &nbsp;
        <GradientButton
          onClick={() => setActiveTab("monthly")}
          sx={{
            opacity: activeTab === "monthly" ? 1 : 0.5,
            boxShadow:
              activeTab === "monthly" ? "0px 0px 10px #00f0ff" : "none",
          }}
        >
        VC Rewards
        </GradientButton>
      </Box>

      { activeTab === "monthly" && (
        <Box pt={2}>
          <Card>
            <Box p={4}>
              <Typography variant="h6" gutterBottom>
               VC rewards for next 10 months.
              </Typography>
              <Card className="rounded-0">
              <Box sx={{padding:"20px"}} >
              <Typography style={{color:"#fff",padding:"5px"}}>
              {totalVCReward ? `${totalVCReward} MDC`:"0 MDC"}
              </Typography>
              </Box>
              </Card>
            </Box>
          </Card>
        </Box>
      )}
      {activeTab === "bought" && (
        <Box pt={2}>
          <Card>
            <Box p={4}>
              <Typography variant="h6" gutterBottom>
                Bought History
              </Typography>
              <Card className="rounded-0">
                <StyledTableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Amount</TableCell>
                        <TableCell>Rewards </TableCell>

                        <TableCell>Claimed Rewards </TableCell>
                        <TableCell>Stake </TableCell>

                        <TableCell>Last Claim Time </TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>Volume</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading &&
                        Array.from({ length: 5 }).map((_, index) => (
                          <TableRow key={index}>
                            {Array.from({ length: 7 }).map((__, cellIndex) => (
                              <TableCell key={cellIndex}>
                                <Skeleton
                                  variant="text"
                                  width="100%"
                                  height={30}
                                />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      {!loading && result?.data && !result?.data?.length && (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            No data found
                          </TableCell>
                        </TableRow>
                      )}
                      {!loading &&
                        resultStakelIst &&
                        resultStakelIst?.data &&
                        resultStakelIst?.data.map((row: any, index) => {
                          console.log(">>>>>>>>>row",row);
                          
                          const startdate = new Date(
                            Number(row?.startTime) * 1000
                          );
                          const lastdate = new Date(
                            Number(row?.lastClaimTime) * 1000
                          );
                          return (
                            <TableRow key={index}>
                              <TableCell>
                                {Number(formatEther(row?.amount)).toFixed(2)}{" "}
                                USDT
                              </TableCell>
                              <DailyReward index={index} address={address as Address} />

                              <TableCell>
                                {parseFloat(
                                  formatEther(row?.claimedRewards)
                                ).toFixed(2)}{" "}
                                MDC
                              </TableCell>
                              <TableCell>
                                {row?.isUnstaked ? "No" : "Yes"}
                              </TableCell>
                              <TableCell>
                                {" "}
                                {row?.lastClaimTime > 0
                                  ? moment(lastdate).format("lll")
                                  : "N/A"}{" "}
                              </TableCell>

                              <TableCell>
                                {" "}
                                {moment(startdate).format("lll")}
                              </TableCell>
                              <TableCell>
                                {parseFloat(formatEther(row?.volume)).toFixed(
                                  2
                                )}{" "}
                                MDC
                              </TableCell>
                              <TableCell>
                                <GradientButton
                                 disabled={pending}
                                  onClick={() => {
                                    claimRewardHandler(index);
                                  }}
                                  fullWidth
                                >
                                 {pending ? "Claiming...":"Claim"} 
                                </GradientButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </StyledTableContainer>
              </Card>
            </Box>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default VCContractPage;


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
    ...vcConfig,
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
