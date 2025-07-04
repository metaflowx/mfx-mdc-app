import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useWriteContract } from "wagmi";
import { contractConfig, stakeConfig } from "@/constants/contract";
import { toast } from "react-toastify";
import { extractDetailsFromError } from "@/utils/extractDetailsFromError";

interface CurrencySelectDialogProps {
  open: boolean;
  onClose: () => void;
  isClaimChecking: Record<string, boolean>;
  level?: number;
}

const ClaimModalConfirmation: React.FC<CurrencySelectDialogProps> = ({
  open,
  onClose,
  isClaimChecking,
  level,
}) => {
  
  const {
    writeContractAsync: writeContractAsyncClaim,
    isPending: isPendingClaim,
    isSuccess,
  } = useWriteContract();

  const [selectedCurrency, setSelectedCurrency] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCurrency(event.target.value);
  };

  const handleClaim = async () => {
    try {
      if (!selectedCurrency) {
        toast.error("Please select a currency.");
        return;
      }

      let res;
      if (isClaimChecking.royalty) {
        res = await writeContractAsyncClaim({
          ...stakeConfig,
          functionName: "claimedRoyalityIncome",
          args: [selectedCurrency !== "MDC"],
        });
      } else if (isClaimChecking.team) {
        res = await writeContractAsyncClaim({
          ...stakeConfig,
          functionName: "claimedTeamReward",
          args: [selectedCurrency !== "MDC"],
        });
      } else if (isClaimChecking.referral) {
        res = await writeContractAsyncClaim({
          ...contractConfig,
          functionName: "claimReferralReward",
          args: [selectedCurrency !== "MDC", BigInt(level ?? 1)],
        });
      } else {
        toast.error("Please select a valid claim type.");
        return;
      }

      if (res && isSuccess) {
        toast.success("Claim completed!");
        onClose();
      }
    } catch (error: any) {
      toast.error(extractDetailsFromError(error.message as string) as string);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: "#1e1e2f",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          color: "white",
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" px={3} pt={3}>
        <Typography variant="h6" fontWeight={600}>
          Confirm Claim
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers sx={{ px: 3, py: 2 }}>
        <Typography sx={{ mb: 2, color: "#ccc" }}>
          Please select the currency in which you want to claim your reward.
        </Typography>
        <FormControl fullWidth variant="outlined">
          <InputLabel sx={{ color: "#aaa" }}>Currency</InputLabel>
          <Select
            value={selectedCurrency}
            onChange={handleChange}
            label="Currency"
            disabled={isPendingClaim}
            sx={{
              borderRadius: 2,
              backgroundColor: "#2a2a3f",
              color: "white",
              "& .MuiSelect-icon": { color: "white" },
              "& fieldset": { borderColor: "#444" },
            }}
          >
            <MenuItem value="MDC">MDC</MenuItem>
            <MenuItem value="USDT">USDT</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "#ccc",
            borderColor: "#444",
            borderRadius: 2,
            px: 3,
            "&:hover": {
              borderColor: "#666",
              backgroundColor: "#2a2a3f",
            },
          }}
          disabled={isPendingClaim}
        >
          Cancel
        </Button>

        <Button
          onClick={async ()=> await handleClaim()}
          variant="contained"
          disabled={!selectedCurrency || isPendingClaim}
          sx={{
            background: "linear-gradient(45deg, #2caee2, #0077ff)",
            borderRadius: 2,
            px: 4,
            color: "#fff",
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(45deg, #249bd1, #0065e6)",
            },
          }}
          startIcon={
            isPendingClaim ? (
              <CircularProgress color="inherit" size={18} />
            ) : null
          }
        >
          {isPendingClaim ? "Processing..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClaimModalConfirmation;
