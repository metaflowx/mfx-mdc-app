import { Card } from "@/components/ui/card";
import { Box, Grid2, Typography } from "@mui/material";
import { Copy } from "lucide-react";
import React from "react";

export default function Profile() {
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
                style={{ width: "60px", height: "60px" }}
              />
              <Typography pl={2} sx={{display:"flex",alignItems:"center",color:"white",fontSize:"24px",fontWeight:400}} >
              0x39deb3.....e2ac64rd  <Copy />
              </Typography>
                </Box>
             
              <Box  sx={{display:"flex" ,alignItems:"center"}} pt={3} >
                <img
                  src="/referral/2.png"
                  style={{ width: "60px", height: "60px" }}
                />
               <Box pl={1} >
               <Typography sx={{color:"#fff",fontSize:"20px",fontWeight:"400",}}>Your referrals</Typography>
               <Typography sx={{color:"#fff",fontSize:"24px",fontWeight:"700"}} >0.00</Typography>
               </Box>
              </Box>
              <Box  sx={{display:"flex" ,alignItems:"center"}} mt={4} >
                <img
                  src="/profile/dollar.png"
                  style={{ width: "60px", height: "60px" }}
                />
               <Box pl={1} >
               <Typography sx={{color:"#fff",fontSize:"20px",fontWeight:400}}>Your referral earnings</Typography>
               <Typography sx={{color:"#fff",fontSize:"24px",fontWeight:700}}>0.00</Typography>
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
