import { Card } from "@/components/ui/card";
import { contractConfig } from "@/constants/contract";
import { sortAddress } from "@/utils";
import { Box, Grid2, Typography } from "@mui/material";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useQueryClient } from "@tanstack/react-query";
import { Copy } from "lucide-react";
import React, { useEffect } from "react";
import { Address, formatEther, parseEther } from "viem";
import { useAccount, useBlockNumber, useReadContracts } from "wagmi";

export default function Profile() {
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
     useEffect(() => {
        queryClient.invalidateQueries({
          queryKey: result.queryKey,
        });
        
      }, [blockNumber, queryClient,result]);
  return (
    <div>
      <Card >
        <Grid2 container spacing={3} sx={{padding:"20px"}} >
          <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
            <Box
              sx={{
                padding: "10px",
                
              }}
            >
                <Box sx={{display:"flex",alignItems:"center"}} >
                <img
                src="/profile/profile.png"
                  data-aos="fade-right"
                style={{ width: "60px", height: "60px" }}
              />
              <Typography  data-aos="fade-right" pl={2} sx={{display:"flex",alignItems:"center",color:"white",fontSize:"24px",fontWeight:400}} >
              {address ? sortAddress(address):""}<Copy />
              </Typography>
                </Box>
             
              <Box  sx={{display:"flex" ,alignItems:"center"}} pt={3} >
                <img
                  src="/referral/2.png"
                   data-aos="fade-right"
                  style={{ width: "60px", height: "60px" }}
                />
               <Box pl={1} >
               <Typography  data-aos="fade-right" sx={{color:"#fff",fontSize:"20px",fontWeight:"400",}}>Your referrals</Typography>
               <Typography  data-aos="fade-right" sx={{color:"#fff",fontSize:"24px",fontWeight:"700"}} >{result?.data?.[1]?.result? Number(result?.data[1]?.result) : 0}</Typography>
               </Box>
              </Box>
              <Box  sx={{display:"flex" ,alignItems:"center"}} mt={4} >
                <img
                 data-aos="fade-right"
                  src="/profile/dollar.png"
                  style={{ width: "60px", height: "60px" }}
                />
               <Box pl={1} >
               <Typography  data-aos="fade-right" sx={{color:"#fff",fontSize:"20px",fontWeight:400}}>Your referral earnings</Typography>
               <Typography  data-aos="fade-right" sx={{color:"#fff",fontSize:"24px",fontWeight:700}}>{`${result?.data?.[0]?.result? Number(formatEther(BigInt(result?.data[0]?.result))).toFixed(2) : 0} MDC`}</Typography>
               </Box>
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
            <img  data-aos="fade-left" src="/profile/cinema.png" />
          </Grid2>
        </Grid2>
      </Card>
    </div>
  );
}
