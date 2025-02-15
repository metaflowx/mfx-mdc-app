import { Card } from "@/components/ui/card";
import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

export default function Profile() {
  return (
    <div>
      <Card >
        <Grid2 container spacing={3} sx={{padding:"10px"}} >
          <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
            <Box
              sx={{
                padding: "10px",
                
              }}
            >
                <Box>
                <img
                src="/profile/profile.png"
                style={{ width: "60px", height: "60px" }}
              />
                </Box>
             
              <Box  sx={{display:"flex" ,alignItems:"center"}} pt={3} >
                <img
                  src="/referral/2.png"
                  style={{ width: "60px", height: "60px" }}
                />
               <Box pl={1} >
               <Typography sx={{color:"#fff",fontSize:"20px",fontWeight:"400"}}>YOUR REFERRALS</Typography>
               <Typography sx={{color:"#fff",fontSize:"24px",fontWeight:"700"}} >0.00</Typography>
               </Box>
              </Box>
              <Box  sx={{display:"flex" ,alignItems:"center"}} >
                <img
                  src="/profile/dollar.png"
                  style={{ width: "60px", height: "60px" }}
                />
               <Box pl={1} >
               <Typography sx={{color:"#fff",fontSize:"20px",fontWeight:"400"}}>YOUR REFERRAL EARNINGS</Typography>
               <Typography sx={{color:"#fff",fontSize:"24px",fontWeight:"700"}}>0.00</Typography>
               </Box>
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
            <img src="/profile/cinema.png" />
          </Grid2>
        </Grid2>
      </Card>
    </div>
  );
}
