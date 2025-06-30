import CommonCard from "@/components/ui/CommonCard";
import {
  iocConfig,
  stakeConfig,
  TokenContractAddress,
  vcConfig,
} from "@/constants/contract";
import { convertToAbbreviated } from "@/utils";
import { Grid2 } from "@mui/material";
import { useAppKitNetwork } from "@reown/appkit/react";
import moment from "moment";
import React from "react";
import { Address, erc20Abi, formatEther } from "viem";
import { useAccount, useReadContract } from "wagmi";

export default function EarningDashboard() {
  const { chainId } = useAppKitNetwork();
  const { address } = useAccount();
  const { data: resultOfTokenBalance } = useReadContract({
    abi: erc20Abi,
    address:
      chainId == 56
        ? TokenContractAddress
        : "0x8f8EB871F072Ed73dC592a7201bae514e08c9F3f",
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
  const getUserLevel = useReadContract({
    ...stakeConfig,
    functionName: "getLevel",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });
  const getUserRoi = useReadContract({
    ...stakeConfig,
    functionName: "getROIPercent",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });
  const royalityIncom = useReadContract({
    ...stakeConfig,
    functionName: "calculateTeamBusiness",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });
  const royalityClaimed = useReadContract({
    ...stakeConfig,
    functionName: "user2RoyaltyIncomeDetail",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });
  const teamClaimed = useReadContract({
    ...stakeConfig,
    functionName: "user2TeamIncomeDetail",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });
  const teamReward = useReadContract({
    ...stakeConfig,
    functionName: "calculateTeamReward",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });
  const yourReward = useReadContract({
    ...stakeConfig,
    functionName: "getReward",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });


  const lastClaimedTeam = new Date(Number(teamClaimed?.data?.[1]) * 1000);

  const royalityClaimedTeam = new Date(
    Number(royalityClaimed?.data?.[1]) * 1000
  );

  const BoxList = [
    {
      id: 1,
      title: "Wallet Balance",
      data: `${convertToAbbreviated(
        Number(formatEther(BigInt(resultOfTokenBalance ?? 0)))
      )} MDC`,
      valueInUsd: `$${convertToAbbreviated(Number(aizuUSDTAmount))}`,
      isButton: "",
    },
    {
      id: 2,
      title: "Your Stake",
      data: `${Number(
        Number(formatEther(BigInt(dailyReward?.data?.volume ?? 0)))
      ).toFixed(2)} MDC`,
      valueInUsd: `$${
        dailyReward?.data?.amount
          ? Number(formatEther(dailyReward?.data?.amount)).toFixed(2)
          : "0"
      } `,
      isButton: "",
    },
    {
      id: 3,
      title: "Your Reward",
      data:
        yourReward?.data === 0
          ? "None"
          : yourReward?.data === 1
          ? "Iphone"
          : yourReward?.data === 2
          ? "M1Book"
          : yourReward?.data === 3
          ? "Trip 3N/4D"
          : yourReward?.data === 4
          ? "Bike"
          : "Thar",
      valueInUsd: "",
      isButton: "",
    },
    {
      id: 4,
      title: "Your Level",
      data: `Level ${getUserLevel?.data}`,
      valueInUsd: "",
      isButton: "",
    },
    {
      id: 5,
      title: "APR %",
      data: `${
        getUserRoi?.data ? parseFloat(getUserRoi?.data.toString()) / 100 : "0"
      }%`,
      valueInUsd: "",
      isButton: "",
    },
    {
      id: 6,
      title: "Your Royality Income",
      data: royalityIncom?.data
        ? `$${formatEther(BigInt(royalityIncom?.data[1]))}`
        : "N/A",
      valueInUsd: "",
      isButton: "",
    },

    {
      id: 8,
      title: "Your Team Business",
      data: royalityIncom?.data
        ? `$${formatEther(BigInt(royalityIncom?.data[0]))}`
        : "N/A",
      valueInUsd: "",
      isButton: "",
    },
    {
      id: 9,
      title: "Your Team Reward",
      data: teamReward?.data ? `${parseFloat(formatEther(BigInt(teamReward?.data))).toFixed(5)} MDC` : "0 MDC",
      valueInUsd: "",
      isButton: "",
    },
    {
      id: 10,
      title: "Claim Team Reward",
      data: teamClaimed?.data
        ? `$${formatEther(BigInt(teamClaimed?.data?.[0]))}`
        : "",
      valueInUsd: `Claimed : ${
        teamClaimed?.data && teamClaimed?.data?.[1] > 0
          ? moment(lastClaimedTeam).format("lll")
          : "N/A"
      }`,
      isButton: "team",
    },
    {
      id: 11,
      title: "Claim Royality Income",
      data: royalityClaimed?.data
        ? `$${formatEther(BigInt(royalityClaimed?.data?.[0]))}`
        : "",
      valueInUsd: `Claimed :  ${
        royalityClaimed?.data && royalityClaimed?.data?.[1] > 0
          ? moment(royalityClaimedTeam).format("lll")
          : "N/A"
      }`,
      isButton: "royalty",
    },
  ];
  return (
    <>
      <Grid2 container spacing={2}>
        {BoxList.map((item, index) => (
          <Grid2 data-aos="fade-up" key={index} size={{ xs: 12, md: 4, lg: 3 }}>
            <CommonCard item={item} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
