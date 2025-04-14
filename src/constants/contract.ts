import { IcoABI } from "@/app/ABI/IcoABI";
import { RefferABI } from "@/app/ABI/RewardToken";
import { TokenABI } from "@/app/ABI/TokenSupply";
import { VCABI } from "@/app/ABI/VCABI";
export const TokenContractAddress = "0xB68038cD28202F9fcbc087602923BAcf3Bd1bfE6"; 
export const ICOContractAddress ="0x863a4D881B31Dad9F3E7e8C04065aD31FB8D25C2"
export const ReferralContractAddress="0x8B05177a27795Bb453c5AF920023361F7dcBeEF9"
export const VCContractAddress="0x8f8eb871f072ed73dc592a7201bae514e08c9f3f"


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