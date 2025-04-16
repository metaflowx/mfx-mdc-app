import { IcoABI } from "@/app/ABI/IcoABI";
import { RefferABI } from "@/app/ABI/RewardToken";
import { StakingABI } from "@/app/ABI/StakingABI";
import { TokenABI } from "@/app/ABI/TokenSupply";
import { VCABI } from "@/app/ABI/VCABI";
export const TokenContractAddress = "0x8f8eb871f072ed73dc592a7201bae514e08c9f3f"; 
export const ICOContractAddress ="0xbe99934e107faf2bd1371c14c3dbaadd6412074e"
export const ReferralContractAddress="0x20d30fe1e37df13a9eff393863617b3ec9146144"
export const VCContractAddress="0x4Ab65FE359DCa48790a5c4D32Ba3d3050134A32e"
export const USDTAddress="0xE394f7359E0FD4f82EFDe5c3eD0CAac3172276f2"
export const StakeContractAddress="0x786eccfdeaeeb5afba3114d73ceaeea370afc6bd"


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