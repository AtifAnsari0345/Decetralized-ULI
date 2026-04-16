import "./App.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import LendingSystem from "./contracts/SimpleLendingContract.json";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LenderPage from "./LenderPage";
import BorrowerPage from "./BorrowerPage";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
    accounts: [],
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function initializeWeb3() {
      try {
        const web3 = new Web3(provider);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = LendingSystem.networks[networkId];
        const contract = new web3.eth.Contract(
          LendingSystem.abi,
          deployedNetwork.address
        );
        const accounts = await web3.eth.getAccounts();

        setState({
          web3: web3,
          contract: contract,
          accounts: accounts,
        });
      } catch (error) {
        console.error("Could not connect to contract or web3:", error);
        setMessage("Could not connect to contract or web3.");
      }
    }

    provider && initializeWeb3();
  }, []);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <nav className="bg-white shadow rounded-md p-4 mb-6">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/lender"
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Lender
              </Link>
            </li>
            <li>
              <Link
                to="/borrower"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Borrower
              </Link>
            </li>
          </ul>
        </nav>

        <div className="bg-white shadow rounded-md p-6">
          <Routes>
            <Route
              path="/lender"
              element={
                <LenderPage
                  state={state}
                  setMessage={setMessage}
                  lenderAddress={state.accounts[0]}
                />
              }
            />
            <Route
              path="/borrower"
              element={
                <BorrowerPage
                  state={state}
                  setMessage={setMessage}
                  borrowerAddress={state.accounts[1]}
                />
              }
            />
            <Route
              path="/"
              element={
                <div className="text-lg text-gray-700">
                  Welcome to the Lending System!
                </div>
              }
            />
          </Routes>
        </div>

        {message && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            {message}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
