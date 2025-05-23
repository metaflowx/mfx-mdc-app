"use client";
import { Box } from "@mui/material";
import Navbar from "./navbar";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/dashboard/mdclogo.svg";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import MobileMenuDashboard from "./Mobilemenu";

const Topheader = () => {
  const { open, close } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#101012",
          borderBottom: "1px solid #1AB3E5",
          padding: "0.8rem 1.5rem",
          position: "fixed",
          width: "100%",
          zIndex: "1111",
        }}
      >
        <Box>
          <Link href={"/"}>
            <Image src={logo} alt={""} />
          </Link>
         
        </Box>
        <div className="block sm:hidden " >
<MobileMenuDashboard />

        </div>
       
        <div className="hidden sm:flex items-center" >

        <Navbar />
        {address ? (
          <>

            <appkit-account-button balance="hide" />
          </>
        ) : (
          <Link
            onClick={async () => open()}
            style={{
              background:
                "linear-gradient(90deg, #1ab3e5 0%, #034f89 50%, #1ab3e5 100%)",
              color: "#fff",
              border: "1px solid #1ab3e5",
              borderRadius: "30px",
              padding: "12px 16px",
            }}
            href={""}
          >
            Connect Wallet
          </Link>
        )}
        </div>

      


        
      </Box>
    </>
  );
};

export default Topheader;
