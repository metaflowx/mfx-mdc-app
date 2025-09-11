"use client";
import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  InputBase,
  styled,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAccount, useBlockNumber, useReadContract, useReadContracts, useWriteContract } from "wagmi";
import { iocConfig, swapConfig, swapContractAddress, TokenContractAddress } from "@/constants/contract";
import { useAppKit, useAppKitNetwork } from "@reown/appkit/react";
import { Address } from "abitype";
import useCheckAllowance from "@/hooks/useCheckAllowance";
import { erc20Abi, formatEther, parseEther, parseUnits } from "viem";
import { useQueryClient } from "@tanstack/react-query";
import { extractDetailsFromError } from "@/utils/extractDetailsFromError";
import { toast } from "react-toastify";

const StyledInput = styled(InputBase)({
  width: "100%",
  padding: "12px",
  border: "1px solid #1D1D20",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  marginTop: "12px",
  "& input": {
    appearance: "none",
    MozAppearance: "textfield",
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
});

const Swap = () => {
  const [amount, setAmount] = useState<string>(""); // user input
  const [mdcAmount, setMdcAmount] = useState<string>(""); // calculated MDC

  const { chainId } = useAppKitNetwork();
  const [value, setValue] = useState(0);
  const [isAproveERC20, setIsApprovedERC20] = useState(true);

  const { open, close } = useAppKit();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { writeContractAsync, isPending, isSuccess, isError } =
    useWriteContract();
  //// start
  const resultOfCheckAllowance = useCheckAllowance({
    spenderAddress: swapContractAddress,
    token: TokenContractAddress,
  });

  const result = useReadContracts({
    contracts: [
      {
        ...iocConfig,
        functionName: "getSaleTokenPrice",
        args: [1],
        chainId: Number(chainId) ?? 56,
      },
      {
        ...swapConfig,
        functionName: "calculateSwapAmount",
        args: [parseEther(amount ?? 0)],
        chainId: Number(chainId) ?? 56
      },

      {
        ...swapConfig,
        functionName: "canUserSwap",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
      },
      {
        ...swapConfig,
        functionName: "minSwap",
        chainId: Number(chainId) ?? 56,
      }
    ],
  });

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
      queryKey: result.queryKey,
    });
  }, [blockNumber, queryClient, result, resultOfCheckAllowance]);

  const handleSwap = async () => {
    try {
      const formattedAmount = parseUnits(amount, 18);
      const res = await writeContractAsync({
        ...swapConfig,
        functionName: "swap",
        args: [
          formattedAmount,
        ]
      });

      if (res) {
        setAmount("");
        toast.success("Transaction completed");
      }
    } catch (error: any) {
      console.log(">>>>>>>>>>>>.error", error);
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
        address: TokenContractAddress,
        functionName: "approve",
        args: [swapContractAddress, formattedAmount],
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


  const { data: resultOfTokenBalance } = useReadContract({
    abi: erc20Abi,
    address: TokenContractAddress,
    functionName: "balanceOf",
    args: [address as Address],
    account: address,
    chainId: Number(chainId) ?? 56,
  });

  //// end


  const calculateToken = useMemo(() => {
    if ((result && result?.data) || amount) {
      const tokenPrice = result?.data && result?.data[0]?.result;
      const swapDetail = result?.data && result?.data[1]?.result;
      const canUserSwap = result?.data && result?.data[2]?.result;
      const minSwap = result?.data && result?.data[3]?.result;
      return {
        mdcPrice: Number(formatEther(BigInt(tokenPrice ?? 0))),
        canUserSwap: Boolean(canUserSwap),
        getUsdtToken: Number(formatEther(BigInt(swapDetail?.[0] ?? 0))),
        getUsdtTokenAfterFee: Number(formatEther(BigInt(swapDetail?.[2] ?? 0))),
        fee: Number(formatEther(BigInt(swapDetail?.[1] ?? 0))),
        minSwap: Number(formatEther(BigInt(minSwap ?? 0))),
      }

    }
  }, [amount, result]);


  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, color: "#fff" }}>
      <Typography variant="h4" textAlign="center" fontWeight={700}>
        Swap MDC Coins
      </Typography>
      <Box mt={2} textAlign="center">
        <Typography variant="body2">1 MDC = ${calculateToken?.mdcPrice ?? 0.1}</Typography>
      </Box>

      <Typography mt={3} mb={1}>
        Enter Amount
      </Typography>
      <StyledInput
        type="number"
        placeholder="Enter amount in MDC"
        value={amount}
        inputProps={{
              min: 0, /// 👈 prevents negative numbers
            }}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Typography mt={3} mb={1}>
        You will received (USDT)
      </Typography>
      <StyledInput type="text" value={calculateToken?.getUsdtTokenAfterFee ?? 0} readOnly />

      {
        (Number(amount)>0 && !calculateToken?.canUserSwap) &&
        <Typography color="red" mt={3} mb={1}>
        Sorry! Only presale contributors can swap MDC
      </Typography>
      }

      {
        (Number(amount)>0 && !calculateToken?.canUserSwap && Number(calculateToken?.fee)>0) &&
        <Typography mt={3} mb={1}>
        swap fee:  ${calculateToken?.fee.toFixed(2)}
      </Typography>
      }

      <Box mt={3} textAlign="center">
       {
        address?(
           <Button
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #1ab3e5, #034f89)",
            borderRadius: "8px",
            fontWeight: 700,
            padding: "12px 24px",
            "&:hover": {
              background: "linear-gradient(90deg, #1ab3e5 20%, #034f89 80%)",
            },
          }}
          onClick={()=>{
            !isAproveERC20 ? approveToken() : handleSwap();
          }}
          disabled={
            !amount || 
            parseFloat(amount) <= 0 ||
            isPending ||
            !calculateToken?.canUserSwap ||
            isAproveERC20 ||
            !(Number(calculateToken?.minSwap)<= Number(calculateToken?.getUsdtToken)) ||
            Number(
              formatEther(BigInt(resultOfTokenBalance ?? 0))
            ) < Number(amount)
          }
        >
           {isPending
            ? isAproveERC20
              ? "Swapping..."
              : "Approving..."
            : amount === ""
              ? "Please enter amount"
              : !(Number(calculateToken?.minSwap)<= Number(calculateToken?.getUsdtToken))
                ? `Min. Swap is $${calculateToken?.minSwap}`
                : (Number(formatEther(BigInt(resultOfTokenBalance ?? 0))) < Number(amount))
                  ? "Insufficient funds"
                  : isAproveERC20
                    ? "Swap"
                    : "Approve"}
        </Button>
        ):(
           <Button
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #1ab3e5, #034f89)",
            borderRadius: "8px",
            fontWeight: 700,
            padding: "12px 24px",
            "&:hover": {
              background: "linear-gradient(90deg, #1ab3e5 20%, #034f89 80%)",
            },
          }}
          onClick={async () => open()}

        >
          Connect Wallet
           
        </Button>
        )
       }
      </Box>

    </Box>
  );
};

export default Swap;
