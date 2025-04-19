"use client";
import { stakeConfig } from "@/constants/contract";
import { extractDetailsFromError } from "@/utils/extractDetailsFromError";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useWriteContract } from "wagmi";
import ClaimModalConfirmation from "../modal/ClaimModalConfirmation";
import CommonButton from "./CommonButton";

export default function CommonCard({ item }: { item?: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaimChecking, setIsClaimChecking] = useState(false);

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
  return (
    <>
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
          {item.data}
        </Typography>
        <Typography color="#ffffff73">{item.valueInUsd}</Typography>
        {item?.isButton !== "" && item.data > 0 &&  (
          <>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <CommonButton
                onClick={() => {
                  setIsClaimChecking(
                    item?.isButton === "teamReward" ? false : true
                  );
                  setIsModalOpen(true);
                }}
                title="Claim"
                width="w-[120px] sm:w-[150px]  "
                height="h-[40px]"
              />
            </Box>
          </>
        )}
      </ListBox>
      {isModalOpen && (
        <ClaimModalConfirmation
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          isClaimChecking={isClaimChecking}
        />
      )}
    </>
  );
}
