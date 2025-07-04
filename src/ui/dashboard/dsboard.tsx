"use client";
import { Box, Container, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { Address, erc20Abi, formatEther } from "viem";
import { convertToAbbreviated } from "@/utils";
import { useAccount, useReadContract } from "wagmi";
import { iocConfig, stakeConfig, TokenContractAddress } from "@/constants/contract";
import { useAppKitNetwork } from "@reown/appkit/react";
import PurchaseHistory from "./PurchaseHistory";
import RefBottom from "../shared/refBottom";
import Referral from "./referral";
import BuyTab from "./buyTab";

const MainDiv = styled(Box)(({ theme }) => ({
  margin: "3rem 30px 20px 30px",
  [theme.breakpoints.down("lg")]: {
    margin: "20px",
  },
}));

const StepTwo = styled(Box)({
  marginTop: "1rem",
});

const ListBox = styled(Box)({
  background: "linear-gradient(145deg, #16A4D7, #034F89)",
  padding: "1rem",
  borderRadius: "12px",
  textAlign: "center",
  height: "100%",
  transition: "0.5s",
  "&:hover": {
    transform: "translateY(-5px)",
  },
});



const Dsboard = () => {
  const { chainId } = useAppKitNetwork();
  const { address } = useAccount();
  const { data: resultOfTokenBalance } = useReadContract({
    abi: erc20Abi,
    address: chainId==56?TokenContractAddress:'0x95B93aa56d953fe7D1c315Caa10b7843D3fdfDfB',
    functionName: "balanceOf",
    args: [address as Address],
    account: address,
  });

  const { data: tokenPriceUSDT } = useReadContract({
    ...iocConfig,
    functionName: "getSaleTokenPrice",
    args: [1],
    chainId: Number(chainId) ?? 56,
  });

  const tokenPrice = tokenPriceUSDT && tokenPriceUSDT;
  const tokenPriceBig = Number(formatEther(BigInt(tokenPrice ?? 0)));
  const aizuUSDTAmount =
    Number(formatEther(BigInt(resultOfTokenBalance ?? 0))) * tokenPriceBig;

const dailyReward = useReadContract({
        ...stakeConfig,
        functionName: "user2Staker",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
      });
  const BoxList = [
    {
      id: 1,
      title: "Your Wallet Balance",
      data:`${convertToAbbreviated(Number(
        formatEther(BigInt(resultOfTokenBalance ?? 0))
      ))}`,
      valueInUsd:`$${convertToAbbreviated(Number(aizuUSDTAmount))}`,
    },
    {
      id: 2,
      title: "Self Staking Income",
      data: `${ Number(
                        Number(formatEther(BigInt(dailyReward?.data?.volume ?? 0))) 
                      ).toFixed(2)}`,
      valueInUsd:  `$${dailyReward?.data?.amount
                      ? Number(formatEther(dailyReward?.data?.amount)).toFixed(2)
                      : "0"} `,
    },
    // {
    //   id: 3,
    //   title: "Your Spot Income",
    //   data: "0.000 MDC",
    //   valueInUsd: "$0.000",
    // },
  ];


  return (
    <Box >
     
        <StepTwo>
          <Grid container spacing={2}>
            {BoxList.map((item, index) => (
              <Grid key={index} size={{ xs: 12, md: 6, lg: 6 }}>
                <ListBox data-aos="fade-down">
                  <Box
                    sx={{
                      backgroundColor: "#034F89",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #1AB3E5",
                    }}
                  >
                    <Typography color="#fff">{item.title}</Typography>
                  </Box>
                  <Typography color="#fff" fontWeight={700} variant="h5" mt={1.5}>
                    {item.data} MDC
                  </Typography>
                  <Typography color="#ffffff73">{item.valueInUsd}</Typography>
                </ListBox>
              </Grid>
            ))}
          </Grid>
        </StepTwo>

        <Box sx={{ marginTop: "1rem",marginBottom:"20px" }}>
          <Grid container spacing={2}>
            <Grid data-aos="fade-left" size={{ xs: 12, md: 8 }}>
              <BuyTab />
            </Grid>
            <Grid data-aos="fade-right" size={{ xs: 12, md: 4 }}>
              <Referral />
            </Grid>
          </Grid>
        </Box>

        <PurchaseHistory />

        <RefBottom />
      
    </Box>
  );
};

export default Dsboard;
