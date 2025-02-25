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
} from "@mui/material";
import Image from "next/image";
import usdt from "../../../public/images/dashboard/usdt.svg";
import usdc from "../../../public/images/dashboard/usdc.svg";
import bnb from "../../../public/images/dashboard/bnb.svg";
import eth from "../../../public/images/dashboard/eth.svg";
import mdcicon from "../../../public/images/dashboard/mdcicon.svg";

const tokens = [
  { label: "USDT", icon: usdt },
  { label: "USDC", icon: usdc },
  { label: "BNB", icon: bnb },
  { label: "ETH", icon: eth },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ color: "#fff", mt: 2 }}>
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

const ReferralTab = () => {
  const [value, setValue] = useState(0);
  const [buyInput, setBuyInput] = useState("");

  return (
    <StyledBox>
      <InnerBox>
        <Typography variant="h4" fontWeight={700} textAlign="center" mt={2}>
          Buy MDC Coins
        </Typography>

        {/* Tab Panels */}
        {tokens.map((token, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            <Box display="flex" justifyContent="center" gap="1rem" mt={2}>
              <Typography>{token.label} Price: $0.0600</Typography>
              <Typography>MDC Coin Price: $0.0170</Typography>
            </Box>
          </CustomTabPanel>
        ))}

        {/* Tabs */}
        <Tabs
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          variant="fullWidth"
          sx={{
            mt: 3,
            "& .MuiTabs-flexContainer": { gap: "1rem" },
            "& .MuiButtonBase-root.MuiTab-root": {
              minHeight: "40px",
              padding: "8px 16px",
            },
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          {tokens.map((token, index) => (
            <Tab
              key={index}
              icon={<Image src={token.icon} alt={token.label} width={36} height={36} />}
              label={token.label}
              {...a11yProps(index)}
              sx={{
                display:"flex",
                flexDirection:"row",
                textTransform: "capitalize",
                color: value === index ? "#fff !important" : "#fff",
                background: value === index
                  ? "linear-gradient(90deg, #1AB3E5,rgba(26, 178, 229, 0), #1AB3E5)"
                  : "#101012",
                borderRadius: "12px",
                padding: "8px 16px",
                minWidth: "100px",
                border: value === index ? "1px solid #1AB3E5" : "1px solid #1D1D20",
                fontWeight: 600,
              
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: value === index
                    ? "linear-gradient(90deg, #1AB3E5,rgba(26, 178, 229, 0), #1AB3E5)"
                    : "#19191C",
                },
              }}
            />
          ))}
        </Tabs>

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
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
              }}
            />
            <GradientButton onClick={() => setBuyInput("0")}>Max</GradientButton>
          </MaxButtonWrap>

          {/* Cost & Receive Details */}
          <Box display="flex" justifyContent="center" gap="1.5rem" mt={3}>
            <Box display="flex" alignItems="center" gap="10px">
              <Image src={usdt} alt="USDT" width={30} height={30} />
              <Typography>
                COST: <Typography component="span" fontWeight={700}>$0.0600</Typography>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="10px">
              <Image src={mdcicon} alt="MDC" width={30} height={30} />
              <Typography>
                Receive: <Typography component="span" fontWeight={700}>$0.0000</Typography>
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

export default ReferralTab;
