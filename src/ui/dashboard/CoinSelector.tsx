import { iocConfig } from "@/constants/contract";
import { useAppKitNetwork } from "@reown/appkit/react";
import React, { useMemo } from "react";
import { useReadContract, useReadContracts } from "wagmi";
import { erc20Abi, zeroAddress } from "viem";
import { Tab, Tabs } from "@mui/material";
import Image from "next/image";
export default function CoinSelector({
  selectedToken,
  setSelectedToken,
}: {
  selectedToken?: any;
  setSelectedToken?: any;
}) {
  const { chainId } = useAppKitNetwork();
  const result = useReadContracts({
    contracts: [
      {
        ...iocConfig,
        functionName: "getAcceptedTokenList",
        chainId: Number(chainId),
      },
    ],
  });
  const tokenAddrss = useMemo(() => {
    const tokenlist =
      result && result.data && result.data && result.data[0]?.result;
    if (tokenlist && tokenlist?.length > 0) {
      const mergeArray = [...tokenlist, zeroAddress];
      return mergeArray;
    }
  }, [result]);

  return (
    <Tabs
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
        {tokenAddrss?.map((coin: any, index: number) => (
          <TokenData
            chainId={chainId}
            coin={coin}
            index={index}
            setCoinType={(coinData: any) => {
              setSelectedToken(coinData);
            }}
            coinType={selectedToken}
         
          />
        ))}
      </Tabs>
  );
}

const TokenData = ({
  coin,
  chainId,
  index,
  setCoinType,
  coinType,
 
}: {
  coin: any;
  chainId: any;
  index: number;
  setCoinType: any;
  coinType: any;
 
}) => {
  const { data: symbol } = useReadContract({
    abi: erc20Abi,
    address: coin,
    functionName: "symbol",
    query: {
      enabled: coin !== zeroAddress,
    },
    chainId: Number(chainId),
  });
  return (
    <>
      <Tab
        key={index}
        onClick={() =>
          setCoinType({
            address: coin,
            tokenname: coin === zeroAddress ? "BNB" : symbol,
          })
        }
        icon={
          <Image
            src={
              symbol === "BTCB"
                ? "/images/coin-icon/btcb.png"
                : symbol === "USDT"
                ? "/images/coin-icon/usdt.png"
                : `/images/coin-icon/${
                    coin === zeroAddress ? "bnb" : symbol?.toLowerCase()
                  }.svg`
            }
            alt={coin === zeroAddress ? "BNB" : symbol || ""}
            width={36}
            height={36}
          />
        }
        label={coin === zeroAddress ? "BNB" : symbol}
         
        sx={{
          display: "flex",
          flexDirection: "row",
          textTransform: "capitalize",
          color:
            coinType.tokenname === (coin === zeroAddress ? "BNB" : symbol)
              ? "#fff !important"
              : "#fff",
          background:
            coinType.tokenname === (coin === zeroAddress ? "BNB" : symbol)
              ? "linear-gradient(90deg, #1AB3E5,rgba(26, 178, 229, 0), #1AB3E5)"
              : "#101012",
          borderRadius: "12px",
          padding: "8px 16px",
          minWidth: "200px",
          border:
            coinType.tokenname === (coin === zeroAddress ? "BNB" : symbol)
              ? "1px solid #1AB3E5"
              : "1px solid #1D1D20",
          fontWeight: 600,

          alignItems: "center",
          gap: "8px",
          transition: "all 0.3s ease",
          "&:hover": {
            background:
              coinType.tokenname === (coin === zeroAddress ? "BNB" : symbol)
                ? "linear-gradient(90deg, #1AB3E5,rgba(26, 178, 229, 0), #1AB3E5)"
                : "#19191C",
          },
        }}
      />
    </>
  );
};
