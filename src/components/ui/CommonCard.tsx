"use client"
import { Box, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";
import React from 'react'

export default function CommonCard({item}:{item?:any}) {
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
  )
}
