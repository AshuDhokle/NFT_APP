export const whitelistAddress = '0x79747a5e9347E3007782fD5A150638B0822d996D'

export const whitelistAbi = [
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_maxWhitelistAddress",
        "type": "uint8"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "Whitelist_MaxLimitReached",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Whitelist__AlreadyWhitelisted",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "addTowhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getNumofAddressesWhitelisted",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "i_maxWhitelistAddress",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "whitelistedAddresses",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]