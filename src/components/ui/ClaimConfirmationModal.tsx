import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
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
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useWriteContract } from 'wagmi';
import { StakeContractAddress } from '@/constants/contract';
import { StakingABI } from '@/app/ABI/StakingABI';
import { toast } from 'react-toastify';
import { extractDetailsFromError } from '@/utils/extractDetailsFromError';

interface CurrencySelectDialogProps {
  open: boolean;
  onClose: () => void;
  indexData: any;
}

const ClaimConfirmationModal: React.FC<CurrencySelectDialogProps> = ({ open, onClose, indexData }) => {
  const {
    writeContractAsync: writeContractAsyncClaim,
    isPending: isPendingClaim
  } = useWriteContract();

  const [selectedCurrency, setSelectedCurrency] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCurrency(event.target.value);
  };

  const handleConfirm = async () => {
    if (!selectedCurrency) {
      toast.warn("Please select the token");
      return;
    }

    try {
      const res = await writeContractAsyncClaim({
        address: StakeContractAddress,
        abi: StakingABI,
        functionName: "claimReward",
        args: [BigInt(indexData), false],
      });

      if (res) {
        toast.success("Claim successful.");
        setSelectedCurrency('');
        onClose();
      }
    } catch (error: any) {
      console.log(">>>> Error:", error);
      toast.error(extractDetailsFromError(error.message as string) as string);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box display="flex" alignItems="center" justifyContent="space-between" px={3} pt={2}>
        <Typography variant="h6" component="div">
          Confirm Your Claim
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ ml: 2 }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="currency-select-label">Currency</InputLabel>
          <Select
            labelId="currency-select-label"
            value={selectedCurrency}
            label="Currency"
            onChange={handleChange}
            disabled={isPendingClaim}
          >
            <MenuItem value="MDC">MDC</MenuItem>
            {/* <MenuItem value="USDT">USDT</MenuItem> */}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined" disabled={isPendingClaim}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={!selectedCurrency || isPendingClaim}
          startIcon={
            isPendingClaim && (
              <CircularProgress size={20} color="inherit" />
            )
          }
        >
          {isPendingClaim ? 'Processing...' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClaimConfirmationModal;
