import { IcoABI } from "@/app/ABI/IcoABI";
import { RefferABI } from "@/app/ABI/RewardToken";
import { StakingABI } from "@/app/ABI/StakingABI";
import { TokenABI } from "@/app/ABI/TokenSupply";
import { VCABI } from "@/app/ABI/VCABI";
export const TokenContractAddress = "0xebfa9073A0fA6d440185352175ce1a625FbBf819";
export const ICOContractAddress = "0x2336687e574Ce614d10b8c735f2750bBcf9C494e"
export const ReferralContractAddress = "0xCf5EA7f8e98f92F411a944284804f2910aFbF666";
export const VCContractAddress = "0xAFb5De95758bD9d818c52cd037d8a856aFBEE914"
export const USDTAddress = "0x55d398326f99059fF775485246999027B3197955"
export const StakeContractAddress = "0x174253b156a51BedeFbc6D95aC061Ac3e9F7a48f";


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
