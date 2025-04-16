"use client";
import * as React from "react";
import { useState ,useEffect} from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  InputBase,
  styled,
  Grid2,
} from "@mui/material";
import Image from "next/image";
import usdt from "../../../public/images/dashboard/usdt.svg";
import usdc from "../../../public/images/dashboard/usdc.svg";
import bnb from "../../../public/images/dashboard/bnb.svg";
import eth from "../../../public/images/dashboard/eth.svg";
import mdcicon from "../../../public/images/dashboard/mdcicon.svg";
import { toast } from "react-toastify";
import { IcoABI } from "@/app/ABI/IcoABI";
import {
  contractConfig,
  ICOContractAddress,
  iocConfig,
  stakeConfig,
  tokenConfig,
} from "@/constants/contract";
import { useAccount, useBalance, useBlockNumber, useReadContract, useReadContracts, useWriteContract } from "wagmi";
import {
  Address,
  erc20Abi,
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";
import { useAppKitNetwork } from "@reown/appkit/react";
import { extractDetailsFromError } from "@/utils/extractDetailsFromError";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import useCheckAllowance from "@/hooks/useCheckAllowance";
import CoinSelector from "./CoinSelector";
const tokens = [
  { label: "USDT", icon: usdt },
  { label: "USDC", icon: usdc },
  { label: "BNB", icon: bnb },
  { label: "ETH", icon: eth },
];

// const tokensList = [
//   {
//     label: "Package A",
//     title: "10% APR",
//     des: "Withdraw period monthly",
//     des1: "12 Months Lockup",
//   },
//   {
//     label: "Package B",
//     title: "18% APR",
//     des: "Withdraw period monthly",
//     des1: "18 Months Lockup",
//   },
//   {
//     label: "Package C",
//     title: "24% APR",
//     des: "Withdraw period monthly",
//     des1: "24 Months Lockup",
//   },
// ];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ color: "#fff", mt: 2 }}>
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

const a11yProps = (index: number) => ({
  id: `tab-${index}`,
  "aria-controls": `tabpanel-${index}`,
});

const StyledBox = styled(Box)({
  background: "linear-gradient(180deg, #16A4D7, #034f894a)",
  padding: "1px",
  borderRadius: "12px",
  height: "100%",
});

const InnerBox = styled(Box)({
  backgroundColor: "#000",
  borderRadius: "12px",
  padding: "1rem",
  height: "100%",
});

const MaxButtonWrap = styled(Box)({
  backgroundColor: "#101012",
  border: "1px solid #1D1D20",
  borderRadius: "12px",
  display: "flex",
  padding: "2px",
  marginTop: "1.5rem",
});

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

const ReferralTab = () => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { address } = useAccount();
  const [selectedToken, setSelectedToken] = useState({
    tokenname: "BNB",
    id: "tether",
    imgurl: "/images/coin-icon/usdt.png",
    address: zeroAddress,
  });
  const { writeContractAsync, isPending, isSuccess, isError } =
    useWriteContract();
  const queryClient = useQueryClient();
  const searchparm = useSearchParams();
  const { chainId } = useAppKitNetwork();
  const [value, setValue] = useState(0);
  const [isAproveERC20, setIsApprovedERC20] = useState(true);
  const [value1, setValue1] = useState(0);

  const [amount, setAmount] = useState<string>("");
  const [referrer, setReferrer] = useState(
    searchparm.get("ref") || zeroAddress
  );
  const resultOfCheckAllowance = useCheckAllowance({
    spenderAddress: ICOContractAddress,
    token: selectedToken.address,
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
        ...iocConfig,
        functionName: "saleType2IcoDetail",
        args: [1],
        chainId: Number(chainId) ?? 56,
      },
      {
        ...tokenConfig,
        functionName: "totalSupply",
        chainId: Number(chainId) ?? 56,
      },
      {
        ...iocConfig,
        functionName: "user2SaleType2Contributor",
        args: [address as Address, 1],
        chainId: Number(chainId) ?? 56,
      },
      {
        ...iocConfig,
        functionName: "saleType2IcoDetail",
        args: [1],
        chainId: Number(chainId),
      },

      {
        ...contractConfig,
        functionName: "getReferrer",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
      },
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



 

  const handleBuy = async () => {
    try {
      const formattedAmount = parseUnits(amount, 18);
      const tokenAddress = selectedToken?.address;
      const res = await writeContractAsync({
        address: ICOContractAddress,
        abi: IcoABI,
        functionName: "buy",
        args: [
          1,
         BigInt(value1),
          tokenAddress as Address,
          formattedAmount,
          result?.data?.[5]?.result !== zeroAddress
            ? (result?.data?.[5]?.result as Address)
            : (referrer as Address),
        ],
        value:
          selectedToken?.tokenname === "BNB" ? parseEther(amount) : BigInt(0),
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
        address: selectedToken.address,
        functionName: "approve",
        args: [ICOContractAddress, formattedAmount],
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


  const { data: Balance } = useBalance({
    address: address,
  });

  const { data: resultOfTokenBalance } = useReadContract({
    abi: erc20Abi,
    address: selectedToken.address,
    functionName: "balanceOf",
    args: [address as Address],
    account: address,
    query: {
      enabled: selectedToken.tokenname === "BNB" ? false : true,
    },
  });

  const totalTierLenth = useReadContract({
    ...stakeConfig,
    functionName: "totalTierLenth",
    chainId: Number(chainId) ?? 56,
  });

  const tokensList = useReadContract({
    ...stakeConfig,
    functionName: "getTierList",
    args: [BigInt(0), BigInt(totalTierLenth?.data || 0)],
    chainId: Number(chainId) ?? 56,
  });

  const TabPanel = ({
    children,
    value,
    index,
  }: {
    children: any;
    value: any;
    index: any;
  }) => {
    return (
      <Box
        role="tabpanel"
        // hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        sx={{ px: 2, color: "#fff", pb: 2, borderRadius: "8px", mt: 2 }}
      >
        <Box>{children}</Box>
      </Box>
    );
  };

  return (
    <StyledBox>
      <InnerBox>
        <Typography variant="h4" color="#fff" fontWeight={700} textAlign="center" mt={2}>
          Buy MDC Coins
        </Typography>

        {/* Tab Panels */}
        {tokens.map((token, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            <Box display="flex" justifyContent="center" gap="1rem" mt={2}>
              <Typography>{token.label} Price: $0.0600</Typography>
              <Typography>MDC Coin Price: $0.0170</Typography>
            </Box>
          </CustomTabPanel>
        ))}

        

        <CoinSelector
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
            />

        <Box sx={{ width: "100%" }} mt={3}>
          <Grid2 container spacing={2}>
            {tokensList?.data && tokensList.data.length  && tokensList.data?.map((token:any, index:number) => (
              <Grid2
                onClick={() => setValue1(index)}
                size={{ xs: 12, sm: 4 }}
                sx={{
                  border:
                    value1 === index
                      ? "1px solid #1AB3E5"
                      : "1px solid #1D1D20",
                  background: "#101012",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  "&:hover": {
                    background: value === index ? "#101012" : "#19191C",
                  },
                }}
              >
                <TabPanel key={index} value={value} index={index}>
                  <Box
                    sx={{
                      background: "#000000",
                      borderRadius: "6px",
                      height: "40px",
                    }}
                    className="displayCenter"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#1AB3E5",
                        fontWeight: 700,
                        fontSize: "17px",
                      }}
                    >
                      {`Package ${index===0 ? "A" : index===1 ? "B":"C"}`}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "16px",
                      pt: 2,
                    }}
                  >
                    {/* {token.title} */}
                    {`${Number(token.returnInPercent) / 1e2}% APR`}
                  </Typography>
                  <Typography
                    sx={{ color: "#fff", fontWeight: 400, fontSize: "16px" }}
                    variant="body1"
                  >
                    {/* {token.des} */}
                    Withdraw period monthly
                  </Typography>
                  <Typography
                    sx={{ color: "#fff", fontWeight: 400, fontSize: "16px" }}
                    variant="body1"
                  >
                     {`${Number(token.lockPeriod)} Months Lockup`}
                  </Typography>
                </TabPanel>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        {/* Buy Input */}
        <CustomTabPanel value={value} index={value}>
          <MaxButtonWrap>
            <InputBase
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              placeholder="Enter Amount in MDC"
              type="number"
              sx={{
                flex: 1,
                color: "#fff",
                padding: "0.3rem 0.5rem",
                "& input[type=number]": { "-moz-appearance": "textfield" },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
              }}
            />
            <GradientButton onClick={() => setAmount("0")}>Max</GradientButton>
          </MaxButtonWrap>

          {/* Cost & Receive Details */}
          <Box display="flex" justifyContent="center" gap="1.5rem" mt={3}>
            <Box display="flex" alignItems="center" gap="10px">
              <Image src={usdt} alt="USDT" width={30} height={30} />
              <Typography>
                COST:{" "}
                <Typography component="span" fontWeight={700}>
                  $0.0600
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="10px">
              <Image src={mdcicon} alt="MDC" width={30} height={30} />
              <Typography>
                Receive:{" "}
                <Typography component="span" fontWeight={700}>
                  $0.0000
                </Typography>
              </Typography>
            </Box>
          </Box>

          {/* Buy Button */}
          <Box mt={2}>
            <GradientButton
              fullWidth
              onClick={() => {
                if (selectedToken?.tokenname === "BNB") {
                  handleBuy();
                } else {
                  !isAproveERC20 ? approveToken() : handleBuy();
                }
              }}
            >
              Buy MDC Coin
            </GradientButton>
          </Box>
        </CustomTabPanel>
      </InnerBox>
    </StyledBox>
  );
};

export default ReferralTab;
