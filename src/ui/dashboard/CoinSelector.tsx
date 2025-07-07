import { iocConfig } from "@/constants/contract";
import { useAppKitNetwork } from "@reown/appkit/react";
import React, { useMemo, useState } from "react";
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

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const result = useReadContracts({
    contracts: [
      {
        ...iocConfig,
        functionName: "getAcceptedTokenList",
        chainId: Number(chainId) ?? 56,
      },
    ],
  });

  const tokenAddresses = useMemo(() => {
    const list = result?.data?.[0]?.result;
    if (Array.isArray(list)) {
      return [...list, zeroAddress]; // e.g., [USDT, BTCB, BNB (as zero address)]
    }
    return [];
  }, [result.data]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedIndex(newValue);
  };

  return (
    <Tabs
      variant="fullWidth"
      value={selectedIndex}
      onChange={handleChange}
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
      {tokenAddresses?.map((coin: any, index: number) => (
        <TokenData
          key={index}
          coin={coin}
          chainId={chainId}
          index={index}
          selected={index === selectedIndex}
          onSelect={(coinData: any) => {
            setSelectedToken(coinData);
            setSelectedIndex(index);
          }}
        />
      ))}
    </Tabs>
  );
}

const TokenData = ({
  coin,
  chainId,
  index,
  selected,
  onSelect,
}: {
  coin: any;
  chainId: any;
  index: number;
  selected: boolean;
  onSelect: (coinData: any) => void;
}) => {
  const { data: symbol } = useReadContract({
    abi: erc20Abi,
    address: coin,
    functionName: "symbol",
    query: {
      enabled: coin !== zeroAddress,
    },
    chainId: Number(chainId) ?? 56,
  });

  const tokenLabel = coin === zeroAddress ? "BNB" : symbol;
  const tokenImage =
    tokenLabel === "BTCB"
      ? "/images/coin-icon/btcb.png"
      : tokenLabel === "USDT"
      ? "/images/coin-icon/usdt.png"
      : `/images/coin-icon/${tokenLabel?.toLowerCase()}.svg`;

  return (
    <Tab
      onClick={() =>
        onSelect({
          address: coin,
          tokenname: tokenLabel,
        })
      }
      icon={
        <Image
          src={tokenImage}
          alt={tokenLabel || ""}
          width={36}
          height={36}
        />
      }
      label={tokenLabel}
      sx={{
        display: "flex",
        flexDirection: "row",
        textTransform: "capitalize",
        color: selected ? "#fff !important" : "#fff",
        background: selected
          ? "linear-gradient(90deg, #1AB3E5,rgba(26, 178, 229, 0), #1AB3E5)"
          : "#101012",
        borderRadius: "12px",
        padding: "8px 16px",
        minWidth: "200px",
        border: selected
          ? "1px solid #1AB3E5"
          : "1px solid #1D1D20",
        fontWeight: 600,
        alignItems: "center",
        gap: "8px",
        transition: "all 0.3s ease",
        "&:hover": {
          background: selected
            ? "linear-gradient(90deg, #1AB3E5,rgba(26, 178, 229, 0), #1AB3E5)"
            : "#19191C",
        },
      }}
    />
  );
};
