'use client'
import Navbar from "@/Components/Navbar";
import { Web3Context } from "@/Context/Web3Context";
import { useContext, useState } from "react";
import { PropagateLoader } from 'react-spinners'
export default function Home() {

  const { mintNft, totalMinted, loadingMint, isAccountWhitelisted } = useContext(Web3Context)
  const [eth, setEth] = useState('0');
  
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    mintNft(eth)
  }

  return (
    <div className="h-[730px]">
      <Navbar />
      <div className="p-10">
        <div className="">
          <h1 className="text-3xl font-bold font-mono m-2"> 🌞 Suprabhat__Mitro</h1>
          <h2 className="text-xl font-semibold font-mono m-2">Limited Addition - Only 20ids</h2>
          <h3 className="text-lg font-medium font-mono m-2"> First 10 Whitlisted user will get it for <span className="font-black text-4xl">free!!!</span></h3>
          {!isAccountWhitelisted && <button className="m-2 px-6 w-64 h-14 bg-gradient-to-r from-blue-500 to-cyan-400 text-white 
             font-bold rounded-lg shadow-lg transform transition-all duration-300 
             hover:scale-105 hover:shadow-xl flex items-center justify-center"> 
             Whitelist 
          </button>}
        </div>
        <div className="mt-20">
          <p className="text-xl">Total Minted : {totalMinted}</p>
          <form onSubmit={handleSubmit}>
            <button
            type="submit"
            className="m-2 px-6 w-64 h-14 bg-gradient-to-r from-blue-500 to-cyan-400 text-white 
             font-bold rounded-lg shadow-lg transform transition-all duration-300 
             hover:scale-105 hover:shadow-xl flex items-center justify-center"
          >
            {loadingMint ? (
              <PropagateLoader color="#ffffff" size={10} />
            ) : (
              <span>Mint NFT 🚀</span>
            )}
          </button>
          <input type="text" value={eth} placeholder="Eth" 
            className="m-2 p-2 border-b-2 border-gray-400 focus:outline-none"
            onChange={(e)=>setEth(e.target.value)}/>
          </form>
        </div>
      </div>
    </div>
  );
}
