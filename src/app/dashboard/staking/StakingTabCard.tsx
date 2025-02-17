"use client";
import * as React from "react";
import { useState } from "react";
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

const tokens = [
  {
    label: "Package A",
    title: "0.33% Daily",
    des: "Withdraw period 1 months",
    des1: "Total Return 200%",
  },
  {
    label: "Package B",
    title: "0.33% Daily",
    des: "Withdraw period 1 months",
    des1: "Total Return 200%",
  },
  {
    label: "Package C",
    title: "0.33% Daily",
    des: "Withdraw period 1 months",
    des1: "Total Return 200%",
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index?: number;
  value?: number;
}

const CustomTabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ color: "#fff" }}>
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

const StakingTabCard = () => {
  const [value, setValue] = useState(0);
  const [buyInput, setBuyInput] = useState("");

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
        sx={{ px: 2, color: "#fff",pb:2, borderRadius: "8px", mt: 2 }}
      >
        <Box>{children}</Box>
      </Box>
    );
  };

  return (
    <StyledBox>
      <InnerBox>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          mt={2}
          style={{ color: "#fff" }}
        >
          Stake MDC Coins
        </Typography>

        {/* Tab Panels */}

        <CustomTabPanel>
          <Box display="flex" justifyContent="center">
            <Typography
              sx={{ fontSize: "24px", fontWeight: 400, color: "#fff" }}
            >
              {" "}
              MDC Coin Price $0.0170
            </Typography>
          </Box>
        </CustomTabPanel>

        {/* Tabs */}
        <Box sx={{ width: "100%" }} mt={3}>
          <Grid2 container spacing={2}>
            {tokens.map((token, index) => (
              <Grid2
                onClick={() => setValue(index)}
                size={{ xs: 4 }}
                sx={{
                  border:
                    value === index ? "1px solid #1AB3E5" : "1px solid #1D1D20",
                  background: "#101012",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor:"pointer",
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
                      sx={{ color: "#1AB3E5", fontWeight: 700,fontSize:"17px" }}
                    >
                      {token.label}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: 700,fontSize:"16px" ,pt:2}}
                  >
                    {token.title}
                  </Typography>
                  <Typography   sx={{ color: "#fff", fontWeight: 400,fontSize:"16px"}} variant="body1">{token.des}</Typography>
                  <Typography sx={{ color: "#fff", fontWeight: 400,fontSize:"16px"}} variant="body1">{token.des1}</Typography>
                </TabPanel>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        {/* Buy Input */}
        <CustomTabPanel value={value} index={value}>
          <MaxButtonWrap>
            <InputBase
              value={buyInput}
              onChange={(e) => setBuyInput(e.target.value)}
              fullWidth
              placeholder="Enter Amount in RAMA"
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
            <GradientButton onClick={() => setBuyInput("0")}>
              Max
            </GradientButton>
          </MaxButtonWrap>

          {/* Cost & Receive Details */}
          <Box display="flex" justifyContent="center" gap="1.5rem" mt={3}>
            <Box display="flex" alignItems="center" gap="10px">
              <Typography>
                COST:{" "}
                <Typography component="span" fontWeight={700}>
                  $0.0600
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="10px">
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
            <GradientButton fullWidth>Buy MDC Coin</GradientButton>
          </Box>
        </CustomTabPanel>
      </InnerBox>
    </StyledBox>
  );
};

export default StakingTabCard;
