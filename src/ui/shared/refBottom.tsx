"use client";
import { Box } from "@mui/material";
import AddressCopy from "./addressCopy";
import Modal from "./modal";

const RefBottom = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(90deg, rgba(10, 77, 102, 0), #0A4E66, rgba(10, 77, 102, 0))",
        border: "1px solid #0D5972",
        padding: "8px 12px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 2,
        width: "100%",
      }}
    >
      <AddressCopy
        hrefLink={`https://ico.mdccoin.com/dashboard/?ref=${"address"}`}
        text={`https://ico.mdccoin.com/dashboard/?ref=${"address"}`}
        addresstext={`https://ico.mdccoin.com/dashboard/?ref=${""}`}
      />
      <Modal />
    </Box>
  );
};

export default RefBottom;
