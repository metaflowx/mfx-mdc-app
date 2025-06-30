import { IcoABI } from "@/app/ABI/IcoABI";
import { RefferABI } from "@/app/ABI/RewardToken";
import { StakingABI } from "@/app/ABI/StakingABI";
import { TokenABI } from "@/app/ABI/TokenSupply";
import { VCABI } from "@/app/ABI/VCABI";
export const TokenContractAddress = "0x95B93aa56d953fe7D1c315Caa10b7843D3fdfDfB";
export const ICOContractAddress = "0xB01caBB79b45Fd9e1e2c1180B4a3f39e65f2549F"
export const ReferralContractAddress = "0x7C6972D3B517827148422B3b4892CF5d7DcB29B9";
export const VCContractAddress = "0xAFb5De95758bD9d818c52cd037d8a856aFBEE914"
export const USDTAddress = "0x55d398326f99059fF775485246999027B3197955"
export const StakeContractAddress = "0x8cA4475caDE2d6676730171Cc6D74a0b6325CD63";


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
