import { network } from "hardhat";
import verify from "../scripts/verify";

export default async({deployments , getNamedAccounts} : {deployments: any, getNamedAccounts: any})=>{
  const {deployer} = await getNamedAccounts();
  const {deploy, log, get} =  deployments;

  const whitelistAddress = (await get('Whitelist')).address;
    
  const args = [whitelistAddress, 'Suprabhat__Mitro', 'SupMit']

  const NftContract = await deploy('Suprabhat__Mitro',{
    from: deployer,
    log:true,
    args: args,
    waitConfirmations: 6,
  })
  
  const address = NftContract.address;
  
  if(network.name === 'sepolia'){
    console.log(`Verifying Suprabhat__Mitro at address : ${address}`); 
    verify(address, args);  
  }
}
 
module.exports.tags = ['All', 'Nft']
