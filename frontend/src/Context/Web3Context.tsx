'use client'
import { createContext, useEffect, useState} from 'react'
import { ethers, Contract } from "ethers";
import { abi, contractAddress } from '@/utils/contractInfo';
import {whitelistAbi, whitelistAddress} from '@/utils/whitelistContractInfo'
declare global {
  interface Window {
    ethereum: any;
  }
}
interface Web3ContextType {
  wallet: string | undefined;
  connectWallet: () => Promise<void>;
  isWalletConnected: boolean;
  mintNft: (eth: string) => Promise<void>;
  totalMinted: string;
  whitelistAccount: () => Promise<void>;
  isAccountWhitelisted: boolean ;
  loadingMint : boolean;
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
 
 useEffect(()=>{
  checkMetamask().catch((e)=>console.log(e))
 },[])
 
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

 const checkMetamask = async()=>{
   const {ethereum} = window;

   if(!ethereum){
    console.log('Check if metamask is available');
   } else {
    console.log(`Wallet exists! we're ready to go`);
   }
 }

 const connectWallet = async()=>{
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  if(signer){
    setIsWalletConnected(true);
    setWallet(signer.address)
    connectContract(provider)
    
  }
 }

 const connectContract = async(provider : any)=>{
  console.log('connecting to contract');
  const signer = await provider.getSigner();
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
      
      const response = await contract?.mint({value: _price});
      await response.wait();
      
      totalSupply();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMint(false);
    }

  }
 }
 
 return (
    <Web3Context.Provider value={{wallet, connectWallet, isWalletConnected, mintNft, totalMinted, whitelistAccount, isAccountWhitelisted, loadingMint }}>
     {children}
    </Web3Context.Provider>
 )
}