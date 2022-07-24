import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectBtn = document.getElementById("connect-btn");
const fundBtn = document.getElementById("fund-btn");
const balanceBtn = document.getElementById("balance-btn");
const witdrawBtn = document.getElementById("withdraw-btn");

connectBtn.onclick = connect;
fundBtn.onclick = fund;
balanceBtn.onclick = getBalance;
witdrawBtn.onclick = withdraw;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    console.log("Have a MetaMask extension!");
    // eth_requestAccounts: connect to MetaMask account
    await window.ethereum.request({ method: "eth_requestAccounts" });

    connectBtn.innerHTML = "Connected";
  } else connectBtn.innerHTML = "Please install MetaMask";
}

// In nodejs: require
// In frontend javascript: import

// fund()
async function fund() {
  const ethAmount = document.getElementById("fund-amount").value;
  console.log(`Funding with ${ethAmount} ETH..`);
  if (typeof window.ethereum !== "undefined") {
    // 1, Provider / connection to the blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // 2, Signer / wallet / account with enough amount of gas
    const signer = provider.getSigner();
    // 3, Contracts => ABI & Address
    const contract = new ethers.Contract(contractAddress, abi, signer);
    // 4, Make transactions
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      // listen for the tx to be mined
      // listen for an event
      await listenForTxMined(transactionResponse, provider);
      console.log("Done!");
    } catch (error) {
      console.log(error);
    }
  }
}

function listenForTxMined(transactionResponse, provider) {
  console.log(`Mining tx: ${transactionResponse.hash}...`);
  // listen for tx to finish
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations} confirmation`
      );
      resolve();
    });
  });
}

async function getBalance() {
  const balanceInfo = document.getElementsByClassName("balance-info")[0];
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEther(balance));
    balanceInfo.innerHTML = balance;
  }
}

async function withdraw() {
  if (typeof window.ethereum !== "undefined") {
    console.log("Withdrawing..");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.withdraw();
      await listenForTxMined(transactionResponse, provider);
      console.log("Done!");
    } catch (error) {
      console.log(error);
    }
  }
}
