export const whitelistAddress = '0xf12EC345048eF52D1d1d31F0817BAa014030B4Ee'

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
      "inputs": [
        {
          "internalType": "address",
          "name": "_people",
          "type": "address"
        }
      ],
      "name": "checkWhitelisted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
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
    }
]