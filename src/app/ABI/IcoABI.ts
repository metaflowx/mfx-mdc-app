export const IcoABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "AlreadyInitialize", type: "error" },
  { inputs: [], name: "EndTimeGreaterThanStart", type: "error" },
  { inputs: [], name: "InsufficientSaleQuantity", type: "error" },
  { inputs: [], name: "InvalidAddress", type: "error" },
  { inputs: [], name: "InvalidOptionForTokenReceive", type: "error" },
  { inputs: [], name: "InvalidPriceFromOracle", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "InvalidRange",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "maxBuy", type: "uint256" },
      { internalType: "uint256", name: "given", type: "uint256" },
    ],
    name: "MaxBuyLimit",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "minBuy", type: "uint256" },
      { internalType: "uint256", name: "given", type: "uint256" },
    ],
    name: "MinBuyLimit",
    type: "error",
  },
  { inputs: [], name: "NoClaimableBeforeLaunch", type: "error" },
  { inputs: [], name: "NoTokensToBurn", type: "error" },
  { inputs: [], name: "NotInitialize", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  { inputs: [], name: "PriceFeedAddressMust", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  { inputs: [], name: "SaleEnded", type: "error" },
  { inputs: [], name: "SaleNotEnded", type: "error" },
  {
    inputs: [
      {
        internalType: "enum IMDCICO.Status",
        name: "currentStatus",
        type: "uint8",
      },
    ],
    name: "SaleNotLive",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saleType",
        type: "uint8",
      },
    ],
    name: "SaleTypeAlreadyCreated",
    type: "error",
  },
  { inputs: [], name: "UnsoldTokenNotBurnable", type: "error" },
  { inputs: [], name: "UnsupportedPaymentOptions", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "volume",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum IMDCICO.SaleType",
        name: "saleType",
        type: "uint8",
      },
    ],
    name: "BuyToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "priceFeedAddress",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "enable", type: "bool" },
      { indexed: false, internalType: "bool", name: "isStable", type: "bool" },
    ],
    name: "PaymentOptionUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saleType_",
        type: "uint8",
      },
      { internalType: "uint256", name: "tierId_", type: "uint256" },
      { internalType: "address", name: "token_", type: "address" },
      { internalType: "uint256", name: "amount_", type: "uint256" },
      { internalType: "address", name: "referrer_", type: "address" },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token_", type: "address" },
      { internalType: "uint256", name: "amount_", type: "uint256" },
    ],
    name: "calculateUSDAmount",
    outputs: [{ internalType: "uint256", name: "usdAmount", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saleType_",
        type: "uint8",
      },
    ],
    name: "claimSaleToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saleType_",
        type: "uint8",
      },
      { internalType: "uint256", name: "saleRateInUsd_", type: "uint256" },
      { internalType: "uint256", name: "saleTokenAmount_", type: "uint256" },
      {
        internalType: "uint256",
        name: "saleRateChangeInPercent_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "saleRateChangeInDuration_",
        type: "uint256",
      },
      { internalType: "uint256", name: "minBuy_", type: "uint256" },
      { internalType: "uint256", name: "maxBuy_", type: "uint256" },
      {
        internalType: "enum IMDCICO.SaleTokenOption",
        name: "saleTokenOption_",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "TGEReleasePercent",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "CycleReleasePercent",
            type: "uint256",
          },
          { internalType: "uint256", name: "CycleInMinutes", type: "uint256" },
        ],
        internalType: "struct IMDCICO.Vesting",
        name: "vesting_",
        type: "tuple",
      },
      { internalType: "uint256", name: "startAt_", type: "uint256" },
      { internalType: "uint256", name: "endAt_", type: "uint256" },
    ],
    name: "createSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "exchangelaunchDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAcceptedTokenList",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token_", type: "address" }],
    name: "getPaymentOption",
    outputs: [
      {
        components: [
          { internalType: "address", name: "token", type: "address" },
          { internalType: "bool", name: "enable", type: "bool" },
          { internalType: "bool", name: "isStable", type: "bool" },
          {
            internalType: "address",
            name: "priceFeedAddress",
            type: "address",
          },
        ],
        internalType: "struct IMDCICO.PaymentOption",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saleType_",
        type: "uint8",
      },
      { internalType: "address", name: "account_", type: "address" },
    ],
    name: "getPresaleTokenDue",
    outputs: [
      { internalType: "uint256", name: "vestingAmount", type: "uint256" },
      { internalType: "uint256", name: "remainingToken", type: "uint256" },
      { internalType: "uint256", name: "tokenDue", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token_", type: "address" }],
    name: "getPriceFromOracle",
    outputs: [
      { internalType: "int256", name: "price", type: "int256" },
      { internalType: "uint8", name: "decimals", type: "uint8" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saleType_",
        type: "uint8",
      },
    ],
    name: "getSaleTokenPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saleType_",
        type: "uint8",
      },
    ],
    name: "getSoldPercentage",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "mdcSaleToken_", type: "address" },
      {
        internalType: "address",
        name: "mdcReferralContract_",
        type: "address",
      },
      { internalType: "address", name: "mdcStakingContract_", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isInitialized",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mdcReferralContract",
    outputs: [
      { internalType: "contract IMDCReferral", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mdcSaleToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mdcStakingContract",
    outputs: [
      { internalType: "contract IMDCStaking", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saletType_",
        type: "uint8",
      },
      { internalType: "uint256", name: "startIndex_", type: "uint256" },
      { internalType: "uint256", name: "endIndex_", type: "uint256" },
    ],
    name: "saleType2Contributors",
    outputs: [{ internalType: "address[]", name: "result", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saleType_",
        type: "uint8",
      },
    ],
    name: "saleType2IcoDetail",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "saleRateInUsd", type: "uint256" },
          {
            internalType: "uint256",
            name: "saleRateChangeInPercent",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "saleRateChangeInDuration",
            type: "uint256",
          },
          { internalType: "uint256", name: "saleTokenAmount", type: "uint256" },
          { internalType: "uint256", name: "saleQuantity", type: "uint256" },
          { internalType: "uint256", name: "minBuy", type: "uint256" },
          { internalType: "uint256", name: "maxBuy", type: "uint256" },
          {
            internalType: "enum IMDCICO.SaleTokenOption",
            name: "saleTokenOption",
            type: "uint8",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "TGEReleasePercent",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "CycleReleasePercent",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "CycleInMinutes",
                type: "uint256",
              },
            ],
            internalType: "struct IMDCICO.Vesting",
            name: "vesting",
            type: "tuple",
          },
          { internalType: "uint256", name: "startAt", type: "uint256" },
          { internalType: "uint256", name: "endAt", type: "uint256" },
          {
            internalType: "enum IMDCICO.Status",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct IMDCICO.ICO",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token_", type: "address" },
      { internalType: "address", name: "priceFeedAddress_", type: "address" },
      { internalType: "bool", name: "enable_", type: "bool" },
      { internalType: "bool", name: "isStable_", type: "bool" },
    ],
    name: "setPaymentOption",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saletType_",
        type: "uint8",
      },
    ],
    name: "totalContributor",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user_", type: "address" },
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saletType_",
        type: "uint8",
      },
    ],
    name: "totalContributorLengthForUser",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "to_", type: "address" },
      { internalType: "uint256", name: "amount_", type: "uint256" },
    ],
    name: "transferNativeCoin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "token_", type: "address" },
      { internalType: "address", name: "to_", type: "address" },
      { internalType: "uint256", name: "amount_", type: "uint256" },
    ],
    name: "transferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "exchangelaunchDate_", type: "uint256" },
    ],
    name: "updateExchangelaunchDate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saleType_",
        type: "uint8",
      },
      { internalType: "uint256", name: "startAt_", type: "uint256" },
      { internalType: "uint256", name: "endAt_", type: "uint256" },
    ],
    name: "updateSaleTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saleType_",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "TGEReleasePercent",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "CycleReleasePercent",
            type: "uint256",
          },
          { internalType: "uint256", name: "CycleInMinutes", type: "uint256" },
        ],
        internalType: "struct IMDCICO.Vesting",
        name: "vesting_",
        type: "tuple",
      },
    ],
    name: "updateVesting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "mdcReferralContract_",
        type: "address",
      },
    ],
    name: "updatemdcReferralContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user_", type: "address" },
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saleType_",
        type: "uint8",
      },
    ],
    name: "user2SaleType2ClaimableDetail",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "claimed", type: "uint256" },
          { internalType: "uint256", name: "lastClaimedAt", type: "uint256" },
        ],
        internalType: "struct IMDCICO.Claimable",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user_", type: "address" },
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saleType_",
        type: "uint8",
      },
    ],
    name: "user2SaleType2Contributor",
    outputs: [
      {
        components: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "string", name: "coin", type: "string" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "volume", type: "uint256" },
          { internalType: "uint256", name: "at", type: "uint256" },
        ],
        internalType: "struct IMDCICO.Contributor",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user_", type: "address" },
      {
        internalType: "enum IMDCICO.SaleType",
        name: "saletType_",
        type: "uint8",
      },
      { internalType: "uint256", name: "startIndex_", type: "uint256" },
      { internalType: "uint256", name: "endIndex_", type: "uint256" },
    ],
    name: "user2SaleType2ContributorList",
    outputs: [
      {
        components: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "string", name: "coin", type: "string" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "volume", type: "uint256" },
          { internalType: "uint256", name: "at", type: "uint256" },
        ],
        internalType: "struct IMDCICO.Contributor[]",
        name: "result",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
] as const;
