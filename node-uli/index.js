// uli-api/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const borrowers = require("./json-files/betterUserDetails")
// console.log(borrowers)

function getUserByBorrowerId(borrowerId) {
  return borrowers.find((user) => user.borrowerId === borrowerId);
}

console.log(getUserByBorrowerId("PADMA12345"));

// function evaluateBorrower(borrower) {
//   const creditScore = borrower.creditHistory.creditScore;
//   const income = borrower.customerFinancialData.annualIncome;
//   const ekyc = borrower.ekyc.ekycVerified;
//   const pan = borrower.panVerification.panVerified;
//   const esign = borrower.esign.esignVerified;
//   const noMortgage =
//     borrower.landRecordsOwnership.mortgage.toLowerCase() === "no";

//   return (
//     creditScore >= 700 && income >= 250000 && ekyc && pan && esign && noMortgage
//   );
// }


// function evaluateBorrower(borrower) {
//   const {
//     creditScore,
//     income,
//     ekycVerified,
//     panVerified,
//     esignVerified,
//     mortgage,
//   } = borrower;

//   return (
//     creditScore >= 700 &&
//     income >= 250000 &&
//     ekycVerified &&
//     panVerified &&
//     esignVerified &&
//     mortgage.toLowerCase() === "no"
//   );
// }




function evaluateBorrower(borrower) {
  const income = borrower.customerFinancialData.incomeDetails.annualIncome || 0;
  const creditScore = borrower.creditHistory?.creditScore || 0;
  const landOwned =
    borrower.landRecordsOwnership?.landArea &&
    borrower.landRecordsOwnership?.landUseType === "Agriculture";
  const milkIncome =
    borrower.milkPouringCashFlow?.totalMilkPouringIncome?.includes("Rs.")
      ? parseInt(
          borrower.milkPouringCashFlow.totalMilkPouringIncome.replace(
            /[^\d]/g,
            ""
          )
        )
      : 0;
  const vintageValid = borrower.milkPouringCashFlow?.vintage24Months === true;
  const ekyc = borrower.ekyc?.ekycVerified === true;
  const estamp = borrower.estamp?.estampVerified === true;
  const panVerified = borrower.panVerification?.panVerified === true;
  const creditEligible = creditScore >= 680;

  const hasAgriAndDairyStrongProfile =
    landOwned && vintageValid && milkIncome >= 400000;

  return (
    (income >= 500000 || hasAgriAndDairyStrongProfile) &&
    ekyc &&
    estamp &&
    panVerified &&
    creditEligible
  );
}



app.post("/check-uli", (req, res) => {
  const { borrowerId } = req.body;
  console.log(borrowerId);

  const borrower = getUserByBorrowerId(borrowerId)
  // console.log(borrower)

  if (!borrower) {
    return res
      .status(404)
      .json({ approved: false, reason: "Borrower not found" });
  }

  const approved = evaluateBorrower(borrower);
  res.json({
    approved,
    message: approved
      ? "Loan Approved Automatically"
      : "Loan Rejected Automatically",
  });
});

app.listen(port, () => {
  console.log(`ULI API listening at http://localhost:${port}`);
});
