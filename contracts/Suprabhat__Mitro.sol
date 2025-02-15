// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './Whitelist.sol';

error Suprabhat__Mitro__MAX_LIMIT_REACHED();
error Suprabhat__Mitro__ALREADY_OWNED();
error  Suprabhat__Mitro__NOT_ENOUGH_ETH();

contract Suprabhat__Mitro is ERC721Enumerable, Ownable {
    
    uint256 constant public PRICE = 0.01 ether;
    
    uint256 constant private s_maxTokenIds = 20;
    uint256 immutable private i_reservedTokens;
    uint256 private s_reservedTokensClaimed = 0;    

    Whitelist whitelist;

    constructor(address _WhitelistAddress, string memory _name, string memory _symbol) 
    ERC721(_name, _symbol) Ownable(msg.sender){
       whitelist = Whitelist(_WhitelistAddress);
       i_reservedTokens = whitelist.i_maxWhitelistAddress();
    }

    function mint() public payable{
        if(totalSupply() + i_reservedTokens - s_reservedTokensClaimed >= 20){
            revert Suprabhat__Mitro__MAX_LIMIT_REACHED();
        }
        
        if(msg.value < PRICE && whitelist.whitelistedAddresses(msg.sender)){
            if(balanceOf(msg.sender) > 0){
                revert Suprabhat__Mitro__ALREADY_OWNED();
            }

            s_reservedTokensClaimed++;   
        } else if(msg.value < PRICE){
            revert Suprabhat__Mitro__NOT_ENOUGH_ETH();
        }

        uint256 tokenId = totalSupply();
        _safeMint(msg.sender, tokenId);
    }

    function withdraw() public onlyOwner  {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) =  _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function getReservedTokensClaimed() public view returns(uint256){
        return s_reservedTokensClaimed;
    }

    function getReservedTokens() public view returns(uint256){
        return i_reservedTokens;
    }

    function getMaxTokens() public pure returns(uint256){
        return 20;
    }
}

