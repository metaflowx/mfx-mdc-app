"use client";
import { Box } from "@mui/material";
import AddressCopy from "./addressCopy";
import Modal from "./modal";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { sortAddress } from "@/utils";

const RefBottom = () => {
   const [url, setUrl] = useState("");
      const [url1, setUrl1] = useState("");
     const {address}=useAccount()
    useEffect(() => {
         
          
              if (typeof window !== "undefined") {
                setUrl(`${window.location.host}/dashboard?ref=${sortAddress(address||"")}`);
                setUrl1(`${window.location.host}/dashboard?ref=${address}`);
      
              }
            }, [address]);
  return (
    <Box
    data-aos="fade-down"
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
        hrefLink={url}
        text={url1}
        addresstext={url}
      />
      <Modal url={url} url1={url1}  />
    </Box>
  );
};

export default RefBottom;
