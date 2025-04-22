import { IcoABI } from "@/app/ABI/IcoABI";
import { RefferABI } from "@/app/ABI/RewardToken";
import { StakingABI } from "@/app/ABI/StakingABI";
import { TokenABI } from "@/app/ABI/TokenSupply";
import { VCABI } from "@/app/ABI/VCABI";
export const TokenContractAddress = "0xebfa9073A0fA6d440185352175ce1a625FbBf819"; 
export const ICOContractAddress ="0x531135F57b9490c10Caa8C3CA3C667b45D7017E0"
export const ReferralContractAddress="0x20d30fe1e37df13a9eff393863617b3ec9146144"
export const VCContractAddress="0xAFb5De95758bD9d818c52cd037d8a856aFBEE914"
export const USDTAddress="0x55d398326f99059fF775485246999027B3197955"
export const StakeContractAddress="0x8E8a74264d47334a6c3273a7BDAB587544d9Cdbd"


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
