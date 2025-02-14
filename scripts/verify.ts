import { run } from "hardhat";
export default async(contractAddress : string, args : string[])=>{
    try {
      await run('verify:verify',{
          address: contractAddress,
          constructorArguments: args,
      })
    } catch (error) {
      console.log(error);
    }
}

