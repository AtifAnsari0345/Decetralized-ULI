import React, { useState, useEffect } from "react";
import Web3 from "web3";
import LendingSystem from "./contracts/SimpleLendingContract.json"; // Import the contract JSON file

function LenderPage({ setMessage, lenderAddress }) {
  const [poolBalance, setPoolBalance] = useState(0);
  const [selectedAction, setSelectedAction] = useState("addFunds");
  const [lenderWalletBalance, setLenderWalletBalance] = useState("");
  const [contract, setContract] = useState(null);
//   const [lenderAddress, setLenderAddress] = useState("");

  useEffect(() => {
    async function initializeContract() {
      try {
        // Validate lenderAddress
        if (!lenderAddress) {
          setMessage(" ");
        //   console.log(lenderAddress);
        //   console.error("Lender address is undefined or null.");
          return;
        }

        // Initialize Web3
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

        // Get the network ID
        const networkId = await web3.eth.net.getId();

        // Get the deployed contract address from the JSON file
        const deployedNetwork = LendingSystem.networks[networkId];
        if (!deployedNetwork) {
          setMessage("Contract not deployed on the current network.");
          console.error("Contract not deployed on the current network.");
          return;
        }

        const contractInstance = new web3.eth.Contract(
          LendingSystem.abi,
          deployedNetwork.address
        );

        setContract(contractInstance);

        // Fetch the pool balance using the updated contract method
        const balanceWei = await contractInstance.methods
          .getContractBalance()
          .call();
        const balanceEth = web3.utils.fromWei(balanceWei, "ether");
        setPoolBalance(balanceEth);

        // Fetch the lender's wallet balance
        console.log("Fetching wallet balance for address:", lenderAddress);
        const walletBalanceWei = await web3.eth.getBalance(lenderAddress);
        const walletBalanceEth = web3.utils.fromWei(walletBalanceWei, "ether");
        setLenderWalletBalance(walletBalanceEth);
      } catch (error) {
        console.error("Error initializing contract:", error);
        setMessage("Error initializing contract.");
      }
    }

    initializeContract();
  }, [lenderAddress, setMessage]);

  const handleAddFunds = async (amount) => {
    if (contract && lenderAddress) {
      try {
        await contract.methods.addFunds().send({
          from: lenderAddress,
          value: Web3.utils.toWei(amount, "ether"),
        });
        setMessage(`${amount} Ether added to the pool.`);

        // Update the pool balance
        const balanceWei = await contract.methods.getContractBalance().call();
        const balanceEth = Web3.utils.fromWei(balanceWei, "ether");
        setPoolBalance(balanceEth);
      } catch (error) {
        console.error("Error adding funds:", error);
        setMessage("Error adding funds.");
      }
    } else {
      setMessage("Lender address or contract not available.");
    }
  };

  const handleFundLoan = async (borrowerAddressToFund) => {
    if (contract && lenderAddress) {
      try {
        await contract.methods
          .fundLoan(borrowerAddressToFund)
          .send({ from: lenderAddress });
        setMessage(`Loan funded for address: ${borrowerAddressToFund}`);
      } catch (error) {
        console.error("Error funding loan:", error);
        setMessage("Error funding loan.");
      }
    } else {
      setMessage("Lender address or contract not available.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const action = selectedAction;
    const amount = event.target.elements.addFundsAmount?.value;
    const fundBorrowerAddress =
      event.target.elements.fundBorrowerAddress?.value;

    if (action === "addFunds" && amount) {
      handleAddFunds(amount);
    } else if (action === "fundLoan" && fundBorrowerAddress) {
      handleFundLoan(fundBorrowerAddress);
    }
  };

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-indigo-600">
        Lender Dashboard
      </h1>
      <div className="mb-4 p-4 bg-white rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Lender Information
        </h2>
        <p className="text-gray-600">
          Address: <span className="font-bold">{lenderAddress || "N/A"}</span>
        </p>
        <p className="text-gray-600">
          Wallet Balance:{" "}
          <span className="font-bold">
            {lenderWalletBalance ? `${lenderWalletBalance} Ether` : "N/A"}
          </span>
        </p>
      </div>

      <div className="mb-4 p-4 bg-white rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Pool Information
        </h2>
        <p className="text-gray-600">
          Total Funds in Pool:{" "}
          <span className="font-bold">
            {poolBalance ? `${poolBalance} Ether` : "N/A"}
          </span>
        </p>
      </div>

      <div className="bg-white rounded-md shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Lender Actions
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Action:
              <select
                name="lenderAction"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedAction}
                onChange={handleActionChange}
              >
                <option value="addFunds">Add Funds to Pool</option>
                <option value="fundLoan">Fund Loan to Borrower</option>
              </select>
            </label>
          </div>

          {selectedAction === "addFunds" && (
            <div id="addFundsInput">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount to Add (Ether):
                <input
                  type="number"
                  step="any"
                  name="addFundsAmount"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
          )}

          {selectedAction === "fundLoan" && (
            <div id="fundLoanInput">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Borrower Address to Fund:
                <input
                  type="text"
                  name="fundBorrowerAddress"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
          )}

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LenderPage;