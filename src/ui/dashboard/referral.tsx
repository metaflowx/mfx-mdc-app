import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import r1 from "../../../public/images/dashboard/r1.svg";
import { useAccount, useBlockNumber, useReadContracts } from "wagmi";
import { contractConfig } from "@/constants/contract";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useQueryClient } from '@tanstack/react-query';
import { Address, formatEther, parseEther } from "viem";
import { useEffect } from "react";

const ReferralContainer = styled(Box)({
  background: "linear-gradient(180deg, #16A4D7, #034f894a)",
  padding: "1px",
  borderRadius: "12px",
  height: "100%",
});

const InnerContainer = styled(Box)({
  backgroundColor: "#000",
  borderRadius: "12px",
  padding: "1rem 0.3rem",
  height: "100%",
});

const ReferralItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "0.3rem 1rem",
  gap: "1rem",
});

const Referral = () => {
  const { address } = useAccount();
  const {chainId} = useAppKitNetwork()
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  const result = useReadContracts({
    contracts: [
     
      {
        ...contractConfig,
        functionName: "getReferralRewards",
        args: [address as Address ],
        chainId: Number(chainId)??97
      },
      {
        ...contractConfig,
        functionName: 'getReferralsCount',
        args: [address as Address ],
        chainId: Number(chainId)??97
        
      },
      {
        ...contractConfig,
        functionName: 'getReferrer',
        args: [address as Address ],
        chainId: Number(chainId)??97
      },
      
     
     
    ],
  })
  const ReferralList = [
    { id: 1, Name: "Your Referrals", Data: result?.data?.[1]?.result? Number(result?.data[1]?.result) : 0, Img: r1 },
    { id: 2, Name: "Your referral Earnings", Data:  `${result?.data?.[0]?.result? Number(formatEther(BigInt(result?.data[0]?.result))).toFixed(2) : 0} MDC`, Img: r1 },
   
  ];
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: result.queryKey,
    });
    
  }, [blockNumber, queryClient,result]);
  return (
    <ReferralContainer>
      <InnerContainer>
        {ReferralList.map((item) => (
          <ReferralItem key={item.id}>
            <Box sx={{ backgroundColor: "transparent", display: "grid" }}>
              <Image src={item.Img} alt={item.Name} width={50} height={50} />
            </Box>
            <Box>
              <Typography color="#B4B3B4">{item.Name}</Typography>
              <Typography color="#fff" fontWeight={700} variant="h5">
                {item.Data}
              </Typography>
            </Box>
          </ReferralItem>
        ))}
      </InnerContainer>
    </ReferralContainer>
  );
};

export default Referral;
