"use client";
import { Box, Container, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Referral from "./referral";
import BuyTab from "./buyTab";
import RefBottom from "../shared/refBottom";
import Dsfooter from "../shared/dsfooter";

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

const BoxList = [
  {
    id: 1,
    title: "Your Wallet Balance",
    data: "0.000",
    valueInUsd: "$0.000",
  },
  {
    id: 2,
    title: "Self Staking Income",
    data: "0.000 MDC",
    valueInUsd: "$0.000",
  },
  {
    id: 3,
    title: "Your Spot Income",
    data: "0.000 MDC",
    valueInUsd: "$0.000",
  },
];

const Dsboard = () => {
  return (
    <Box sx={{ paddingTop: "7rem" }}>
      <Container>
        <StepTwo>
          <Grid container spacing={2}>
            {BoxList.map((item, index) => (
              <Grid key={index} size={{ xs: 12, md: 4, lg: 4 }}>
                <ListBox>
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

        <Box sx={{ marginTop: "1rem" }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <BuyTab />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Referral />
            </Grid>
          </Grid>
        </Box>

        <RefBottom />
        <Dsfooter />
      </Container>
    </Box>
  );
};

export default Dsboard;
