import React, { useState, useEffect } from "react";
import Web3 from "web3";
import LendingSystem from "./contracts/SimpleLendingContract.json"; // Import the contract JSON file

function BorrowerPage({ state, setMessage, borrowerAddress }) {
//   const [borrowerAddress, setBorrowerAddress] = useState("");
  const [borrowerWalletBalance, setBorrowerWalletBalance] = useState("");
  const [poolBalance, setPoolBalance] = useState(0);
  const [contract, setContract] = useState(null);

  const [borrowerId, setBorrowerId] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [selectedAction, setSelectedAction] = useState("requestLoan");
  const [repayAmount, setRepayAmount] = useState("");
  const [borrowerBalance, setBorrowerBalance] = useState("");

  useEffect(() => {
    async function fetchBorrowerBalance() {
      if (state.web3 && borrowerAddress) {
        try {
          const balanceWei = await state.web3.eth.getBalance(borrowerAddress);
          const balanceEth = state.web3.utils.fromWei(balanceWei, "ether");
          setBorrowerBalance(balanceEth);
        } catch (error) {
          console.error("Error fetching borrower balance:", error);
        }
      }
    }

    fetchBorrowerBalance();
  }, [state.web3, borrowerAddress]);

    const autoApproveLoan = async (borrowerId) => {
    const response = await fetch("http://localhost:3001/check-uli", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ borrowerId }),
    });

    const result = await response.json();
    return result;
    };





//   const handleRequestLoan = async (borrowerId) => {
//     if (state.contract && borrowerAddress) {
//       try {
//         const gasEstimate = await state.contract.methods
//           .requestLoan(state.web3.utils.toWei(loanAmount, "ether"))
//           .estimateGas({ from: borrowerAddress });

//         await state.contract.methods
//           .requestLoan(state.web3.utils.toWei(loanAmount, "ether"))
//           .send({ from: borrowerAddress, gas: gasEstimate });

//         setMessage(
//           `Loan of ${loanAmount} Ether requested for user: ${username}`
//         );
//         setLoanAmount("");
//       } catch (error) {
//         console.error("Error requesting loan:", error);
//         setMessage("Error requesting loan.");
//       }
//     } else {
//       setMessage("Borrower address not available.");
//     }
//   };

  const handleRequestLoan = async (borrowerId) => {
    if (state.contract && borrowerAddress) {
        try {
        // Step 1: Auto-approve logic
        const result = await autoApproveLoan(borrowerId);

        if (!result.approved) {
            setMessage(result.message || "Loan Rejected Automatically.");
            return;
        }

        // Step 2: Estimate gas for requestLoan
        const gasEstimate = await state.contract.methods
            .requestLoan(state.web3.utils.toWei(loanAmount, "ether"))
            .estimateGas({ from: borrowerAddress });

        // Step 3: Request loan on smart contract
        await state.contract.methods
            .requestLoan(state.web3.utils.toWei(loanAmount, "ether"))
            .send({ from: borrowerAddress, gas: gasEstimate });

        setMessage(
            `Loan of ${loanAmount} Ether requested and auto-approved for user: ${borrowerId}`
        );
        setLoanAmount("");
        } catch (error) {
        console.error("Error requesting loan:", error);
        setMessage("Error requesting loan.");
        }
    } else {
        setMessage("Borrower address not available.");
    }
  };


  const handleRepayLoan = async (amount) => {
    if (state.contract && borrowerAddress) {
      try {
        await state.contract.methods.repayLoan().send({
          from: borrowerAddress,
          value: state.web3.utils.toWei(amount, "ether"),
        });
        setMessage(`Loan of ${amount} Ether repaid by user: ${borrowerId}`);
        setRepayAmount("");
      } catch (error) {
        console.error("Error repaying loan:", error);
        setMessage("Error repaying loan.");
      }
    } else {
      setMessage("Borrower address not available.");
    }
  };

  const handleViewLoanStatus = async () => {
    if (state.contract && borrowerAddress) {
      try {
        const loanDetails = await state.contract.methods
          .getLoanDetails(borrowerAddress)
          .call();
        console.log("Loan Details:", loanDetails);
        setMessage(
          `Loan details viewed in the console for user: ${borrowerId}`
        );
      } catch (error) {
        console.error("Error viewing loan status:", error);
        setMessage("Error viewing loan status.");
      }
    } else {
      setMessage("Borrower address not available.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const action = selectedAction;
    const amount = event.target.elements.repayAmount?.value;

    if (action === "requestLoan") {
      handleRequestLoan(borrowerId);
    } else if (action === "repayLoan" && amount) {
      handleRepayLoan(amount);
    } else if (action === "viewLoan") {
      handleViewLoanStatus();
    }
  };

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  useEffect(() => {
    async function initializeBorrower() {
      try {
        // Initialize Web3
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

        // Fetch accounts and set the borrower address as the second account
        const accounts = await web3.eth.getAccounts();
        if (accounts.length < 2) {
          setMessage("Not enough accounts in Ganache.");
          return;
        }
        // setBorrowerAddress(accounts[1]);

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

        // Fetch the borrower's wallet balance
        const walletBalanceWei = await web3.eth.getBalance(accounts[1]);
        const walletBalanceEth = web3.utils.fromWei(walletBalanceWei, "ether");
        setBorrowerWalletBalance(walletBalanceEth);
      } catch (error) {
        console.error("Error initializing borrower:", error);
        setMessage("Error initializing borrower.");
      }
    }

    initializeBorrower();
  }, [setMessage]);

  //   const handleRequestLoan = async (amount) => {
  //     if (contract && borrowerAddress) {
  //       try {
  //         await contract.methods.requestLoan(Web3.utils.toWei(amount, "ether")).send({
  //           from: borrowerAddress,
  //         });
  //         setMessage(`Loan of ${amount} Ether requested.`);
  //       } catch (error) {
  //         console.error("Error requesting loan:", error);
  //         setMessage("Error requesting loan.");
  //       }
  //     } else {
  //       setMessage("Borrower address or contract not available.");
  //     }
  //   };

  //   const handleRepayLoan = async (amount) => {
  //     if (contract && borrowerAddress) {
  //       try {
  //         await contract.methods.repayLoan().send({
  //           from: borrowerAddress,
  //           value: Web3.utils.toWei(amount, "ether"),
  //         });
  //         setMessage(`Loan of ${amount} Ether repaid.`);
  //       } catch (error) {
  //         console.error("Error repaying loan:", error);
  //         setMessage("Error repaying loan.");
  //       }
  //     } else {
  //       setMessage("Borrower address or contract not available.");
  //     }
  //   };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-blue-600">
        Borrower Dashboard
      </h1>
      <div className="mb-4 p-4 bg-white rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Borrower Information
        </h2>
        <p className="text-gray-600">
          Address: <span className="font-bold">{borrowerAddress || "N/A"}</span>
        </p>
        <p className="text-gray-600">
          Wallet Balance:{" "}
          <span className="font-bold">
            {borrowerWalletBalance ? `${borrowerWalletBalance} Ether` : "N/A"}
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
          Borrower Actions
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Action:
              <select
                name="borrowerAction"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedAction}
                onChange={handleActionChange}
              >
                <option value="requestLoan">Request Loan</option>
                <option value="repayLoan">Repay Loan</option>
                <option value="viewLoan">View Loan Status</option>
              </select>
            </label>
          </div>

          {/* {selectedAction === "requestLoan" && (
            <div id="requestLoanInput">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount to Request (Ether):
                <input
                  type="number"
                  step="any"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
          )} */}

          {selectedAction === "requestLoan" && (
            <>
              <div id="usernameInput">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username:
                  <input
                    type="text"
                    name="borrowerId"
                    value={borrowerId}
                    onChange={(e) => setBorrowerId(e.target.value)}
                    placeholder="Enter your username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </label>
              </div>

              <div id="requestLoanInput">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Amount to Request (Ether):
                  <input
                    type="number"
                    name="loanAmount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="Enter loan amount"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </label>
              </div>
            </>
          )}

          {selectedAction === "repayLoan" && (
            <div id="repayLoanInput">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount to Repay (Ether):
                <input
                  type="number"
                  step="any"
                  name="repayAmount"
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BorrowerPage;