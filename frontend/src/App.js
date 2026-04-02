// import "./App.css";
// import { useState, useEffect } from "react";
// import Web3 from "web3";
// import LendingSystem from "./contracts/SimpleLendingContract.json";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import LenderPage from "./LenderPage";
// import BorrowerPage from "./BorrowerPage";

// function App() {
//   const [state, setState] = useState({
//     web3: null,
//     contract: null,
//     accounts: [],
//     lenderAddress: null,
//     borrowerAddress: null,
//   });

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
//     async function initializeWeb3() {
//       try {
//         const web3 = new Web3(provider);
//         const networkId = await web3.eth.net.getId();
//         const deployedNetwork = LendingSystem.networks[networkId];
//         const contract = new web3.eth.Contract(
//           LendingSystem.abi,
//           deployedNetwork.address
//         );
//         const accounts = await web3.eth.getAccounts();
//         const lenderAddress = accounts[0];
//         const borrowerAddress = accounts[1];

//         setState({
//           web3: web3,
//           contract: contract,
//           accounts: accounts,
//           lenderAddress: lenderAddress,
//           borrowerAddress: borrowerAddress,
//         });
//       } catch (error) {
//         console.error("Could not connect to contract or web3:", error);
//         setMessage("Could not connect to contract or web3.");
//       }
//     }

//     provider && initializeWeb3();
//   }, []);

//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/lender">Lender</Link>
//             </li>
//             <li>
//               <Link to="/borrower">Borrower</Link>
//             </li>
//           </ul>
//         </nav>

//         <Routes>
//           <Route
//             path="/lender"
//             element={<LenderPage state={state} setMessage={setMessage} />}
//           />
//           <Route
//             path="/borrower"
//             element={<BorrowerPage state={state} setMessage={setMessage} />}
//           />
//           <Route path="/" element={<div>Welcome to the Lending System!</div>} />
//         </Routes>

//         {message && <div style={{ color: "green" }}>{message}</div>}
//       </div>
//     </Router>
//   );
// }

// export default App;







// import "./App.css";
// import { useState, useEffect } from "react";
// import Web3 from "web3";
// import LendingSystem from "./contracts/SimpleLendingContract.json";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import LenderPage from "./LenderPage";
// import BorrowerPage from "./BorrowerPage";

// function App() {
//   const [state, setState] = useState({
//     web3: null,
//     contract: null,
//     accounts: [],
//     lenderAddress: null,
//     borrowerAddress: null,
//   });

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
//     async function initializeWeb3() {
//       try {
//         const web3 = new Web3(provider);
//         const networkId = await web3.eth.net.getId();
//         const deployedNetwork = LendingSystem.networks[networkId];
//         const contract = new web3.eth.Contract(
//           LendingSystem.abi,
//           deployedNetwork.address
//         );
//         const accounts = await web3.eth.getAccounts();
//         const lenderAddress = accounts[0];
//         const borrowerAddress = accounts[1];

//         setState({
//           web3: web3,
//           contract: contract,
//           accounts: accounts,
//           lenderAddress: lenderAddress,
//           borrowerAddress: borrowerAddress,
//         });
//       } catch (error) {
//         console.error("Could not connect to contract or web3:", error);
//         setMessage("Could not connect to contract or web3.");
//       }
//     }

//     provider && initializeWeb3();
//   }, []);

//   return (
//     <Router>
//       <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
//         <nav className="bg-white shadow rounded-md p-4 mb-6">
//           <ul className="flex space-x-4">
//             <li>
//               <Link
//                 to="/lender"
//                 className="text-indigo-600 hover:text-indigo-800 font-semibold"
//               >
//                 Lender
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/borrower"
//                 className="text-blue-600 hover:text-blue-800 font-semibold"
//               >
//                 Borrower
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         <div className="bg-white shadow rounded-md p-6">
//           <Routes>
//             <Route
//               path="/lender"
//               element={<LenderPage state={state} setMessage={setMessage} />}
//             />
//             <Route
//               path="/borrower"
//               element={<BorrowerPage state={state} setMessage={setMessage} />}
//             />
//             <Route
//               path="/"
//               element={
//                 <div className="text-lg text-gray-700">
//                   Welcome to the Lending System!
//                 </div>
//               }
//             />
//           </Routes>
//         </div>

//         {message && (
//           <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
//             {message}
//           </div>
//         )}
//       </div>
//     </Router>
//   );
// }

// export default App;




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





















// import "./App.css";
// import { useState, useEffect } from "react";
// import Web3 from "web3";
// import LendingSystem from "./contracts/SimpleLendingContract.json";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import LenderPage from "./LenderPage";
// import BorrowerPage from "./BorrowerPage";

// function App() {
//   const [state, setState] = useState({
//     web3: null,
//     contract: null,
//     accounts: [],
//   });

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
//     async function initializeWeb3() {
//       try {
//         const web3 = new Web3(provider);
//         const networkId = await web3.eth.net.getId();
//         const deployedNetwork = LendingSystem.networks[networkId];

//         let contractAddress;
//         if (deployedNetwork && deployedNetwork.address) {
//           contractAddress = deployedNetwork.address;
//         } else {
//           console.error(
//             "Contract address not found in JSON for network ID:",
//             networkId
//           );
//           setMessage(
//             `Contract address not found for network ID: ${networkId}. Ensure your Ganache network ID matches an entry in LendingSystem.json.`
//           );
//           return;
//         }

//         const contract = new web3.eth.Contract(
//           LendingSystem.abi,
//           contractAddress
//         );
//         const accounts = await web3.eth.getAccounts();

//         setState({
//           web3: web3,
//           contract: contract,
//           accounts: accounts,
//         });
//       } catch (error) {
//         console.error("Could not connect to contract or web3:", error);
//         setMessage("Could not connect to contract or web3.");
//       }
//     }

//     provider && initializeWeb3();
//   }, []);

//   return (
//     <Router>
//       <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
//         <nav className="bg-white shadow rounded-md p-4 mb-6">
//           <ul className="flex space-x-4">
//             <li>
//               <Link
//                 to="/lender"
//                 className="text-indigo-600 hover:text-indigo-800 font-semibold"
//               >
//                 Lender
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/borrower"
//                 className="text-blue-600 hover:text-blue-800 font-semibold"
//               >
//                 Borrower
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         <div className="bg-white shadow rounded-md p-6">
//           <Routes>
//             <Route
//               path="/lender"
//               element={
//                 <LenderPage
//                   state={state}
//                   setMessage={setMessage}
//                   lenderAddress={state.accounts[0]}
//                 />
//               }
//             />
//             <Route
//               path="/borrower"
//               element={
//                 <BorrowerPage
//                   state={state}
//                   setMessage={setMessage}
//                   borrowerAddress={state.accounts[1]}
//                 />
//               }
//             />
//             <Route
//               path="/"
//               element={
//                 <div className="text-lg text-gray-700">
//                   Welcome to the Lending System!
//                 </div>
//               }
//             />
//           </Routes>
//         </div>

//         {message && (
//           <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
//             {message}
//           </div>
//         )}
//       </div>
//     </Router>
//   );
// }

// export default App;