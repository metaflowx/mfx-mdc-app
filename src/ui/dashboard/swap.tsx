"use client";
import * as React from "react";
import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  InputBase,
  styled,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const StyledInput = styled(InputBase)({
  width: "100%",
  padding: "12px",
  border: "1px solid #1D1D20",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  marginTop: "12px",
  "& input": {
    appearance: "none",
    MozAppearance: "textfield",
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
});

const Swap = () => {
  const [amount, setAmount] = useState<string>(""); // user input
  const [mdcAmount, setMdcAmount] = useState<string>(""); // calculated MDC
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Example MDC price (replace with contract data later)
  const mdcPrice = 0.1; // 1 MDC = $0.1

  useMemo(() => {
    const val = parseFloat(amount || "0");
    if (!isNaN(val)) {
      setMdcAmount((val / mdcPrice).toFixed(2));
    } else {
      setMdcAmount("");
    }
  }, [amount]);

  const handleSwap = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setToastMsg(`Swapping ${amount} USDT to ${mdcAmount} MDC`);
    setToastOpen(true);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, color: "#fff" }}>
      <Typography variant="h4" textAlign="center" fontWeight={700}>
        Swap MDC Coins
      </Typography>
      <Box mt={2} textAlign="center">
        <Typography variant="body2">1 MDC = ${mdcPrice}</Typography>
      </Box>

      <Typography mt={3} mb={1}>
        Enter Amount
      </Typography>
      <StyledInput
        type="number"
        placeholder="Enter amount in USDT"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Typography mt={3} mb={1}>
        You will get (MDC)
      </Typography>
      <StyledInput type="text" value={mdcAmount} readOnly />

      <Box mt={3} textAlign="center">
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #1ab3e5, #034f89)",
            borderRadius: "8px",
            fontWeight: 700,
            padding: "12px 24px",
            "&:hover": {
              background: "linear-gradient(90deg, #1ab3e5 20%, #034f89 80%)",
            },
          }}
          onClick={handleSwap}
          disabled={!amount || parseFloat(amount) <= 0}
        >
          Swap
        </Button>
      </Box>

      {/* Toast / Snackbar */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Swap;
