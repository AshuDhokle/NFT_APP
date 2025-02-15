'use client'
import { createContext, useEffect, useState} from 'react'
import { ethers, Contract } from "ethers";
import { abi, contractAddress } from '@/utils/contractInfo';
import {whitelistAbi, whitelistAddress} from '@/utils/whitelistContractInfo'
import {useAccount} from 'wagmi';
declare global {
  interface Window {
    ethereum: any;
  }
}
interface Web3ContextType {
  wallet: string | undefined;
  connectContract: (walletAddress : string)=> Promise<void>; 
  isWalletConnected: boolean;
  mintNft: (eth: string) => Promise<void>;
  totalMinted: string;
  whitelistAccount: () => Promise<void>;
  isAccountWhitelisted: boolean ;
  loadingMint: boolean;
  mintError: string; 
}

export const Web3Context = createContext<Web3ContextType | null>(null);

interface Web3ProviderProps {
  children: React.ReactNode;
}

export function Web3Provider({children}: Web3ProviderProps){
 const [wallet, setWallet] = useState<string | undefined>(undefined);
 const [isWalletConnected, setIsWalletConnected] = useState(false);
 const [contract, setContract] = useState<Contract | undefined>(undefined);
 const [whitelistContract, setWhitelistContract] = useState<Contract | undefined>(undefined);
 const [totalMinted, setTotalMinted] = useState('0');
 const [loadingMint, setLoadingMint] = useState(false);
 const [isAccountWhitelisted, setIsAddressWhitelisted] = useState(false);
 const [mintError, setMintError] = useState('');
 useEffect(()=>{
   if(contract){
    totalSupply();
   }
 },[contract])
 
 useEffect(()=>{
  if(whitelistContract){
    checkAccountWhitelisted();
  }
 },[whitelistContract])

 const checkAccountWhitelisted = async() =>{
    if(whitelistContract && wallet){
      try {
        const response = await whitelistContract.whitelistedAddresses(wallet);  
        setIsAddressWhitelisted(response)  
      } catch (error) {
        console.log(error);
      }
    }
 }

 const whitelistAccount = async()=>{
  if(whitelistContract){
    try {
      const response = await whitelistContract?.addTowhitelist();
      setIsAddressWhitelisted(true);
    } catch (error) {
      console.log(error);
    }
  }
 }
  
  const connectContract = async(walletAddress : string)=>{
    console.log('connecting to contract');
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    setWallet(walletAddress)
    setIsWalletConnected(true);
    
    const tempcontract = new Contract(contractAddress, abi, signer)
    setContract(tempcontract);
    
    const tempWhitelistContract = new Contract(whitelistAddress, whitelistAbi, signer);
    setWhitelistContract(tempWhitelistContract);

  }
 
 const totalSupply = async() =>{
  try {
    const supply = await contract?.totalSupply();
    setTotalMinted(supply);
  } catch (error) {
    console.error("Error fetching total supply:", error);
  } 
}

 const mintNft = async(eth : string)=>{
  if(wallet){
    setLoadingMint(true);
    try {

      const _price = ethers.parseEther(eth)
      const reqPrice = ethers.parseEther('0.01') 
      if(parseInt(totalMinted.toString()) >= 20){
        setMintError(`Can't mint nft, All nfts are minted`)
      }

      if(isAccountWhitelisted && _price <  reqPrice){
        setMintError(`Can't mint nft, you are whitelisted, kindly pay 0.01eth to buy nft`);
        return;
      }
      const response = await contract?.mint({value: _price});
      await response.wait();
      totalSupply();
      setMintError('');
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMint(false);
    }

  }
 }
 
 return (
    <Web3Context.Provider value={{wallet, connectContract,isWalletConnected, mintNft, totalMinted, whitelistAccount, isAccountWhitelisted, loadingMint, mintError }}>
     {children}
    </Web3Context.Provider>
 )
}