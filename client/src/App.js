import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Upload from './artifacts/contracts/Upload.sol/Upload.json';
import './App.css';
import FileUpload from './components/fileUpload';
import Display from './components/display';
import Modal from './components/Modal';
import Chatbot from './components/Chatbot';


function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen,setModalOpen] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // to open MetaMask automatically


        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        })

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });


        const signer = await provider.getSigner();
        // const address = await(await signer).getAddress();
        const address = await signer.getAddress();

        console.log(address);
        setAccount(address);

        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
        console.log(contract);
        setContract(contract);
        setProvider(signer);
      } else {
        alert("MetaMask is not installed");
      }
    };
    initialize();
  }, []);

  return (
      <>
      {!modalOpen && (
        <button className='share' onClick={() => setModalOpen(true)}>Share</button>
      )}
      {
        modalOpen && (
          <Modal setModalOpen={setModalOpen} contract={contract} />
        )
      }
    <div className="App">
      <h1 style={{color : 'white'}}>Gdrive 3.0</h1>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>

      <p style={{color : 'white'}}>
        Account : {account}
      </p>
      <FileUpload account={account} contract={contract} provider={provider}></FileUpload>
      <Display account={account} contract={contract} provider={provider}></Display>
    </div>
    <div className="App">
      <Chatbot/>
    </div>
    </>
  );
}

export default App;
