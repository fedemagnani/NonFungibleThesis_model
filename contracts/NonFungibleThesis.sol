//SPDX-License-Identifier: UNLICENSED
//Vulnerability: University might register several times a same alumno via different universityIDS (Bug could be a feature: bachelor and master degree?)
//Univeristy methods are set to only owner: the best thing is probably creating a "register_university()" method that is onlyowner and then creating a modifier that checks whether msg.sender is a whitelisted university

pragma solidity >=0.6.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

struct alumnoStructure{
    string Name; //Name and Surname
    address Address;
    uint256 uniID;
    string MetadataURI;
    bool Claimed;
}

contract NonFungibleThesis is ERC721, Ownable{
    constructor(string memory name, string memory symbol) ERC721(name,symbol){}
    
    uint256 public totalSupply;
    mapping(uint256=>alumnoStructure) public Alumni;//uniID → alumnoStructure

    modifier preliminaryAlumnoRegistrationCheck(uint256 _uniID, string memory _name, address _address, string memory _metadataUri){
        require(_uniID>0,"University ID is not valid");
        require(bytes(_name).length>0,"Alumno's name is missing");
        require(_address!=address(0), "Alumno's address can't be null address");
        require(bytes(_metadataUri).length>0,"Alumno's metadata is missing");
        _;
    }

    function tokenURI(uint256 _uniID) public view override returns (string memory) { 
        // return string(abi.encodePacked(uris[_uniID]));
        return Alumni[_uniID].MetadataURI;
    }

    function registerAlumno(uint256 _uniID, string memory _name, address _address, string memory _metadataUri)public onlyOwner preliminaryAlumnoRegistrationCheck(_uniID,_name,_address,_metadataUri){
        alumnoStructure storage Alumno = Alumni[_uniID];
        require(bytes(Alumno.Name).length==0,"Alumno already registered");
        Alumno.Name=_name;
        Alumno.Address=_address;
        Alumno.uniID=_uniID;
        Alumno.MetadataURI=_metadataUri;   
    }

    function registerBatchAlumni(uint256[] memory _uniID, string[] memory _name, address[] memory _address, string[] memory _metadataUri)public onlyOwner {
        for(uint i=0;i<_uniID.length;i++){
            registerAlumno(_uniID[i],_name[i],_address[i],_metadataUri[i]);
        }   
    }

    function mint(uint256 _uniID)public{
        require(bytes(Alumni[_uniID].Name).length>0,"Alumno not registered");
        require(Alumni[_uniID].Address==msg.sender,"Not allowed to mint with different address");
        require(!Alumni[_uniID].Claimed, "Alumno has already minted");
        require(bytes(Alumni[_uniID].MetadataURI).length>0,"TokenURI not found");
        //We mint using the uniID as tokenID
        _safeMint(msg.sender,_uniID);
        totalSupply++;
        Alumni[_uniID].Claimed=true;
    }
}
