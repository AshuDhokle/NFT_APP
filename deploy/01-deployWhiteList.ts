import { ethers, network } from "hardhat";
import verify from "../scripts/verify";
export default async({getNamedAccounts, deployments} : {deployments: any, getNamedAccounts: any})=>{
  const {deployer} = await getNamedAccounts();
  const {deploy, log} = deployments;
   
  let contractName : string = 'Whitelist'
  let args = ['10']
   
  const WhitelistContract = await deploy(contractName,{
    from:deployer,
    log:true,
    args: args,
    waitConfirmations: 4,
  })
  
  const address = WhitelistContract.address;
    
  if(network.name === 'sepolia'){
    console.log(`Verifying ${contractName} at address : ${address}`);
    await verify(address, args);
  }
}


module.exports.tags = ['All', 'WhiteList']
