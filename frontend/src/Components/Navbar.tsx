'use client'
import { Web3Context } from '@/Context/Web3Context'
import formatWalletString from '@/utils/formatWalletString'
import React from 'react'
import { useContext } from 'react'
import { MdOutlineVerifiedUser } from "react-icons/md";

const Navbar = () => {
  const {isWalletConnected, connectWallet, wallet, isAccountWhitelisted} = useContext(Web3Context)
  
  return (
    <div className='p-2 flex flex-row items-center justify-between border-b-2 border-black'>
      <h1 className='text-xl font-bold text-cyan-500'>Suprabhat__Mitro</h1>
      { !isWalletConnected ? 
      <button onClick={connectWallet}>
        Connect
      </button>
      : (
        <>
          {isAccountWhitelisted && <MdOutlineVerifiedUser />}
          {formatWalletString(wallet)}
        </>
      )
      }
    </div>
  )
}

export default Navbar