// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract JIRA {
    uint256[] public nftTokenList;

    struct Data {
        string value;
    }

    mapping(uint256 => Data) public data;

    address public manager;
    string public project;

    function initialize() public {
        manager = msg.sender;
        project = "JIRA Web 3.0";
    }

    function addData(string memory tokenURIData) public returns (uint256) {
        uint256 length = nftTokenList.length; // Get the length of the array
        uint256 newItemId = length + 1; // Add 1 to the length
        nftTokenList.push(newItemId);
        Data memory newData = Data({value: tokenURIData});
        data[newItemId] = newData;
        nftTokenList.push(newItemId);
        return newItemId;
    }

    function updateData(uint256 itemId, string memory tokenURIData)
        public
        returns (Data memory)
    {
        Data memory newData = Data({value: tokenURIData});
        data[itemId] = newData;

        return newData;
    }

    function getToken() public view returns (uint256[] memory) {
        return nftTokenList;
    }

    function tokenURI(uint256 id) public view returns (Data memory) {
        return data[id];
    }
}
