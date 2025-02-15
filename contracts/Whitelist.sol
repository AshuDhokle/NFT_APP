// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

error Whitelist__AlreadyWhitelisted();
error Whitelist_MaxLimitReached();

contract Whitelist {
    uint8 public immutable i_maxWhitelistAddress;

    mapping(address => bool) public whitelistedAddresses;

    uint8 private numOfAddressesWhitelisted;

    constructor(uint8 _maxWhitelistAddress) {
        i_maxWhitelistAddress = _maxWhitelistAddress;
        numOfAddressesWhitelisted = 0;
    }

    function addTowhitelist() public {
        if(whitelistedAddresses[msg.sender]){
          revert Whitelist__AlreadyWhitelisted();
        }

        if(numOfAddressesWhitelisted >= i_maxWhitelistAddress){
            revert Whitelist_MaxLimitReached();
        }

        whitelistedAddresses[msg.sender] = true;

        numOfAddressesWhitelisted++;
    }

    function getNumofAddressesWhitelisted() public view returns(uint8){
        return numOfAddressesWhitelisted;
    }

    
}