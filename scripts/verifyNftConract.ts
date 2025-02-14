import { run } from "hardhat";
import { deployments } from "hardhat";
const verify = async()=>{
    const contractAddress = (await deployments.get('Suprabhat__Mitro')).address
    const whitelistAddress = (await deployments.get('Whitelist')).address
    console.log(contractAddress, whitelistAddress);
    
    const args = [whitelistAddress, 'Suprabhat__Mitro', 'SupMit']
    try {
      await run('verify:verify',{
          address: contractAddress,
          constructorArguments: args,
      })
    } catch (error) {
      console.log(error);
    }
}

verify()
.then(()=>{
    process.exit(0);
})
.catch((error)=>{
    console.log(error);
    process.exit(1);
})