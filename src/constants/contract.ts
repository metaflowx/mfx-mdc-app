import { IcoABI } from "@/app/ABI/IcoABI";
import { RefferABI } from "@/app/ABI/RewardToken";
import { TokenABI } from "@/app/ABI/TokenSupply";
export const TokenContractAddress = "0x27285729C6cd4c88A9d38C64E3E138d6567E60E8"; 
export const ICOContractAddress ="0x37d1e8c9b70b83187DBB0B916f4e6C7b876ed7c8"
export const ReferralContractAddress="0xf06b0d90eE58197F4CB161c7F66AF79B0Ef25800"

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