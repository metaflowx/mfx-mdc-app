import { IcoABI } from "@/app/ABI/IcoABI";
import { RefferABI } from "@/app/ABI/RewardToken";
import { StakingABI } from "@/app/ABI/StakingABI";
import { TokenABI } from "@/app/ABI/TokenSupply";
import { VCABI } from "@/app/ABI/VCABI";
export const TokenContractAddress = "0xebfa9073A0fA6d440185352175ce1a625FbBf819"; 
export const ICOContractAddress ="0xa4A84814a48eb0caE1d1C7531BDdD27f135FCdEb"
export const ReferralContractAddress="0xA86d21673e1810224113b7805FEAc494835F9e3a"
export const VCContractAddress="0xAFb5De95758bD9d818c52cd037d8a856aFBEE914"
export const USDTAddress="0x55d398326f99059fF775485246999027B3197955"
export const StakeContractAddress="0xEAb25c6D419b3458A129Db2096d47Dee2Cec5E84"


export const contractConfig = {
    address: ReferralContractAddress as `0x${string}`,
    abi: RefferABI,
  };

  export const iocConfig = {
    address: ICOContractAddress as `0x${string}`,
    abi: IcoABI,
    
  };

  export const tokenConfig = {
    address: TokenContractAddress as `0x${string}`,
    abi: TokenABI,
    
  };
  export const vcConfig = {
    address: VCContractAddress as `0x${string}`,
    abi: VCABI,
    
  };

  export const stakeConfig = {
    address: StakeContractAddress as `0x${string}`,
    abi: StakingABI,
    
  };
