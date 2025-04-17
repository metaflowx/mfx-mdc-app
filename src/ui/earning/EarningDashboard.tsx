import CommonCard from '@/components/ui/CommonCard';
import { iocConfig, stakeConfig, TokenContractAddress, vcConfig } from '@/constants/contract';
import { convertToAbbreviated } from '@/utils';
import { Grid2 } from '@mui/material';
import { useAppKitNetwork } from '@reown/appkit/react';
import React from 'react'
import { Address, erc20Abi, formatEther } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

export default function EarningDashboard() {
const { chainId } = useAppKitNetwork();
  const { address } = useAccount();
  const { data: resultOfTokenBalance } = useReadContract({
    abi: erc20Abi,
    address: TokenContractAddress,
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
      console.log(">>>>>>>>>>>dailyReward",dailyReward);
      
    const BoxList = [
        {
          id: 1,
          title: "Wallet Balance",
          data: `${convertToAbbreviated(Number(
                  formatEther(BigInt(resultOfTokenBalance ?? 0))
                ))}`,
          valueInUsd: `$${convertToAbbreviated(Number(aizuUSDTAmount))}`,
        },
        {
          id: 2,
          title: "Your Stake",
          data:`${ Number(
                  Number(formatEther(BigInt(dailyReward?.data?.volume ?? 0))) 
                ).toFixed(2)}`,
          valueInUsd:  `$${dailyReward?.data?.amount
                ? Number(formatEther(dailyReward?.data?.amount)).toFixed(2)
                : "0"} `,
        },
        {
          id: 3,
          title: "Claimed Income",
          data:  `${Number(formatEther(BigInt(dailyReward?.data?.claimedRewards ?? 0)))}`,
          valueInUsd: `$${ Number(formatEther(BigInt(dailyReward?.data?.claimedRewards ?? 0))) *
                  Number(formatEther(BigInt(tokenPrice ?? 0)))}`,
        },
        // {
        //     id: 4,
        //     title: "Unclaimed Income",
        //     data: "0.000 MDC",
        //     valueInUsd: "$0.000",
        //   },
      ];
  return (
    <div>

<Grid2 container spacing={2}>
            {BoxList.map((item, index) => (
              <Grid2  data-aos="fade-up" key={index} size={{ xs: 12, md: 4, lg: 3 }}>

                <CommonCard item={item} />
               
              </Grid2>
            ))}
          </Grid2>
      
    </div>
  )
}
