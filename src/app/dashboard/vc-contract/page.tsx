"use client";
import { useState, useRef, useEffect } from "react";
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
  }, [blockNumber, queryClient,resultStakelIst, resultOfCheckAllowance]);

  console.log(">>>>>>>>>result", resultStakelIst);
  useEffect(() => {
    if (resultStakelIst) setLoading(false);
  }, [resultStakelIst]);

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
                  Monthly Return: {((Number(amount) * 0.3) / 12).toFixed(2)} MDC
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
  </GradientButton>  &nbsp;
  <GradientButton
    onClick={() => setActiveTab("monthly")}
    sx={{
      opacity: activeTab === "monthly" ? 1 : 0.5,
      boxShadow: activeTab === "monthly" ? "0px 0px 10px #00f0ff" : "none",
    }}
  >
    Monthly Returns
  </GradientButton>

 
</Box>


      {amount && activeTab === "monthly" && (
        <Box pt={2}>
          <Card>
            <Box p={4}>
              <Typography variant="h6" gutterBottom>
                Monthly Returns for ${amount}
              </Typography>
              <Card className="rounded-0">
                <StyledTableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell>Reward (MDC)</TableCell>
                        {/* <TableCell>Transation Hsh</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {calculateReturns(Number(amount)).map((row) => (
                        <TableRow key={row.month}>
                          <TableCell>{row.month}</TableCell>
                          <TableCell>{row.payout}</TableCell>
                          {/* <TableCell>xsds......3434f</TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </StyledTableContainer>
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
            <Skeleton variant="text" width="100%" height={30} />
          </TableCell>
        ))}
      </TableRow>
    ))}
     {!loading && result?.data  &&  !result?.data?.length  && (
    <TableRow>
      <TableCell colSpan={7} align="center">
        No data found
      </TableCell>
    </TableRow>
  )}
                      {!loading && resultStakelIst &&
                        resultStakelIst?.data &&
                        resultStakelIst?.data.map((row: any, index) => {
                          const startdate = new Date(
                            Number(row?.startTime) * 1000
                          );
                          const lastdate = new Date(
                            Number(row?.lastClaimTime) * 1000
                          );
                          return (
                            <TableRow key={index}>
                              <TableCell>
                                {Number(
                                  formatEther(row?.amount)
                                ).toFixed(2)}{" "}
                                USDT
                              </TableCell>

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
                                {parseFloat(
                                  formatEther(row?.volume)
                                ).toFixed(2)}{" "}
                                MDC
                              </TableCell>
                              <TableCell>
                                <GradientButton
                                  disabled={
                                    parseFloat(
                                      formatEther(row?.claimedRewards)
                                    ) <= 0
                                  }
                                  onClick={() => {
                                    if (isAproveERC20) {
                                      stakeHandler();
                                    } else {
                                      approveToken();
                                    }
                                  }}
                                  fullWidth
                                >
                                  Claim
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
