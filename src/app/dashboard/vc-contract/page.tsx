"use client"
import { useState, useRef } from "react";
import { Button, Box, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled } from "@mui/material";
import { useAccount } from "wagmi";
import { Card } from "@/components/ui/card";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { StyledTableContainer } from "@/components/ui/StyledTableContainer";

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
const VC_CONTRACT_ADDRESS = "0xYourContractAddress";
const VC_ABI = [
  {
    inputs: [{ name: "amount", type: "uint256" }],
    name: "buyTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const predefinedAmounts = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

const calculateReturns = (amount:number) => {
  let multiplier = 0.5; // Initial multiplier for $1000
  let returns = [];

  for (let i = 1; i <= 10; i++) {
    returns.push({ month: i, payout: (amount * 2).toFixed(2) });
    multiplier *= 2; // Double the multiplier for next amount tier
  }

  return returns;
};

const VCContractPage = () => {
  const [amount, setAmount] = useState("");
  const { isConnected } = useAccount();
  const scrollRef:any = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  return (
    <Box>
      <Card>
        <Box p={4}>
          <Typography py={2} variant="h5" gutterBottom>
            Buy Tokens
          </Typography>
          <Box py={3} display="flex" alignItems="center" sx={{ overflow: "hidden" }}>
            <IconButton onClick={scrollLeft}>
              <ArrowBackIos style={{ color: "#fff" }} />
            </IconButton>
            <Box ref={scrollRef} sx={{ display: "flex", gap: 2, overflowX: "auto", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
              {predefinedAmounts.map((value) => (
                <Button
                  key={value}
                  variant="outlined"
                  onClick={() => setAmount(value.toString())}
                  sx={{
                    minWidth: "80px",
                    background: amount === value.toString() ? "linear-gradient(90deg, #1AB3E5,rgba(26, 178, 229, 0), #1AB3E5)" : "transparent",
                    color: amount === value.toString() ? "white" : "inherit",
                    "&:hover": {
                        background: "linear-gradient(90deg, #1AB3E5,rgba(26, 178, 229, 0), #1AB3E5)",
                      color: "white",
                    },
                  }}
                >
                  {`$${value}`}
                </Button>
              ))}
            </Box>
            
            <IconButton onClick={scrollRight}>
              <ArrowForwardIos style={{ color: "#fff" }} />
            </IconButton>
          </Box>
          {amount && (
        <Card >
          <Box  p={2}>
          <Typography variant="h6" gutterBottom>
            Buy Plan for ${amount}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Locking Period: 24 Months
          </Typography>
          <Typography variant="body1" gutterBottom>
            APR: 30%
          </Typography>
          <Typography variant="body1" gutterBottom>
            Monthly Return: {( Number(amount) * 0.3 / 12).toFixed(2)} MDC for 24 months
          </Typography>
          </Box>
          
        </Card>
      )}

       <Box mt={2}>

<GradientButton fullWidth>Buy Plan</GradientButton>
       </Box>

        </Box>
      </Card>

      {amount && (
        <Box pt={2}>

        <Card  >
         <Box p={4}>
         <Typography variant="h6" gutterBottom>
            Monthly Returns for ${amount}
          </Typography>
          <Card className="rounded-0">

          <StyledTableContainer >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Reward (MDC)</TableCell>
                  <TableCell>Transation Hsh</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {calculateReturns(Number(amount)).map((row) => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{row.payout}</TableCell>
                    <TableCell>xsds......3434f</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
          </Card>
         </Box>
        </Card>
        </Box>
      )}


    </Box>
  );
};

export default VCContractPage;
