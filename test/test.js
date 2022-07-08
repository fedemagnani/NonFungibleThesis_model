const { expect } = require("chai");
const { ethers } = require("hardhat");
var owner,alumno,alumno2,abuser,thirdGuy;
var instanceContractAlumno,instanceContractAlumno2,instanceContractAbuser;
var nfthesis;
describe("Non-Fungible-Thesis Test", function () {
  it("We should be able to deploy the contract",async()=>{
    [owner,alumno,alumno2,abuser,thirdGuy] = await ethers.getSigners();
    const NFThesis = await ethers.getContractFactory("NonFungibleThesis");
    nfthesis = await NFThesis.deploy("Luiss Thesis","LUISST");
    instanceContractAlumno = await nfthesis.connect(alumno);
    instanceContractAlumno2 = await nfthesis.connect(alumno2);
    instanceContractAbuser = await nfthesis.connect(abuser);
    expect(instanceContractAlumno);
  })

  it("We should be able to register Alumno",async()=>{
    var uniID = 746361;
    var name = "Federico Magnani";
    var link = "https://gateway.pinata.cloud/ipfs/QmWvjM5rKeozN7Yy8n3Ckg95VLFxhVWHQeUmYEhvtsRBqg";
    expect(await nfthesis.registerAlumno(uniID,name,alumno.address,link));
  })

  it("We should be able to register Alumno2",async()=>{
    var uniID = 111111;
    var name = "Adam Smith";
    var link = "https://dweb.link/ipns/...";
    expect(await nfthesis.registerAlumno(uniID,name,alumno2.address,link));
  })

  it("We shouldn't be able to register Alumno for a second time",async()=>{
    try{
      var uniID = 746361;
      var name = "Satoshi Nakamoto";
      var link = "https://dweb.link/ipns/...";
      await nfthesis.registerAlumno(uniID,name,alumno.address,link);
    }catch(e){
      expect(true);
    }
  })

  it("Alumno should be able to mint NFT",async()=>{
    expect(await instanceContractAlumno.mint(746361));
  })

  it("Number of circulating thesis should have increased",async()=>{
    expect((await instanceContractAlumno.totalSupply())>0);
  })

  it("Alumno shouldn't be able to mint NFT for a second time",async()=>{
    try{
      await instanceContractAlumno.mint(746361)
    }catch(e){
      expect(true);
    }
  })

  it("Alumno shouldn't be able to mint Alumno2's thesis",async()=>{
    try{
      await instanceContractAlumno.mint(111111)
    }catch(e){
      expect(true);
    }
  })

  it("Abuser shouldn't be able to register himself",async()=>{
    try{
      var uniID = 123456;
      var name = "Master Bad Villain";
      var link = "https://dweb.link/ipns/...";
      await instanceContractAbuser.registerAlumno(uniID,name,abuser.address,link);
    }catch(e){
      expect(true);
    }
  })

  it("Abuser shouldn't be able to register another person",async()=>{
    try{
      var uniID = 789123;
      var name = "Master Bad Villain'friend";
      var link = "https://dweb.link/ipns/...";
      await instanceContractAbuser.registerAlumno(uniID,name,thirdGuy.address,link);
    }catch(e){
      expect(true);
    }
  })

  it("Abuser shouldn't be able to mint Alumno2's thesis",async()=>{
    try{
      await instanceContractAbuser.mint(111111)
    }catch(e){
      expect(true);
    }
  })

  
  it("Alumno2 should be able to mint NFT",async()=>{
    expect(await instanceContractAlumno2.mint(111111));
  })

  it("Alumno2 shouldn't be able to mint NFT for a second time",async()=>{
    try{
      await instanceContractAlumno2.mint(111111)
    }catch(e){
      expect(true);
    }
  })
});
