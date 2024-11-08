// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.0 < 0.9.0;

contract Upload{
    struct Access {
        address user;
        bool access;
    }

    mapping (address => string[]) value; //to store the URL
    mapping (address => mapping(address => bool)) ownership; //to give ownership
    mapping (address => Access[]) public accessList; //access the shared ownership list  [public accesslist]
    mapping (address => mapping (address => bool)) previousData;

    function add(address _user,string memory url) external {  // alternate string calldata url
        value[_user].push(url);
    }

    function allow(address user) external {
        ownership[msg.sender][user] = true;
        if(previousData[msg.sender][user]){  // ==true
            for(uint i = 0; i < accessList[msg.sender].length ; i++){
                if(accessList[msg.sender][i].user == user){
                    accessList[msg.sender][i].access = true;
                }
            }
        }else {
        accessList[msg.sender].push(Access(user, true));
        previousData[msg.sender][user] = true;
        }
    }

    function disallow(address user) public {  //external
        ownership[msg.sender][user] = false;
        for(uint i = 0; i < accessList[msg.sender].length ; i++){
            if(accessList[msg.sender][i].user == user){
                accessList[msg.sender][i].access = false;
            }
        }    
    }


    function display(address _user) external view returns (string[] memory){
        require(_user == msg.sender || ownership[_user][msg.sender],"You Dont have access");
        return  value[_user];
    }

    function shareAccess() public view returns(Access[] memory){
        return accessList[msg.sender];
    }
}