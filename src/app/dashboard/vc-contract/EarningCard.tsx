"use client";



import { useAccount, useReadContract } from "wagmi";
import { iocConfig,  vcConfig } from "@/constants/contract";
import { Address, formatEther } from "viem";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useMemo } from "react";
import { StatsCard } from "@/components/stats-card";
export default function EarningPage() {
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork();
  const dailyReward = useReadContract({
    ...vcConfig,
    functionName: "user2Staker",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });
    const totalStakeLenth = useReadContract({
      ...vcConfig,
      functionName: "totalStakedLengthForUser",
      args: [address as Address],
      chainId: Number(chainId) ?? 56,
    });
  const tokenPrice = useReadContract({
    ...iocConfig,
    functionName: "getSaleTokenPrice",
    args: [1],
    chainId: Number(chainId) ?? 56,
  });
  

  const result = useReadContract({
    ...vcConfig,
    functionName: "user2StakerList",
    args: [address as Address, BigInt(0), BigInt(totalStakeLenth?.data || 0)],
    chainId: Number(chainId) ?? 56,
  });

  const totalPrice = useMemo(() => {
    const data = result?.data ?? [];
    const totalVol = data.map((amt:any)=>{
      const totalAmt = parseFloat(formatEther(amt?.claimedRewards))
      return totalAmt
    })
    const totalSumAmt = totalVol?.length>0 && totalVol.reduce((a,b)=>Number(a)+Number(b))

    return totalSumAmt ||0

    
  }, [result])


  const earningsData = [
    {
      id: 1,
      title: "Total Earnings",
      amount: totalPrice
        ? Number(totalPrice).toFixed(2)
        : "0",
      sunvalue:
        Number(formatEther(BigInt(dailyReward?.data?.claimedRewards ?? 0))) *
        Number(formatEther(BigInt(tokenPrice?.data ?? 0))),
    },
    {
      id: 2,
      title: "Total Staking Amount",
      amount:Number(
        Number(formatEther(BigInt(dailyReward?.data?.volume ?? 0))) 
      ).toFixed(2) ,
      sunvalue:    dailyReward?.data?.amount
      ? Number(formatEther(dailyReward?.data?.amount)).toFixed(2)
      : "0",
    },
   
  ];
  return (
    <>
      {/* <ComingSoon /> */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-8">
        {earningsData.map((item) => (
          <StatsCard
            title={item?.title}
            value={`${item?.amount} MDC`}
            subValue={`$${Number(item?.sunvalue).toFixed(2)}`}
          />
        ))}
      </div>

    
    </>
  );
}
