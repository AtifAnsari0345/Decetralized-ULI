// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import './SafeMath.sol';

contract SimpleLendingContract {

    using SafeMath for uint;

    // Enum to represent the state of the loan
    enum LoanState { Requested, Funded, Repaid, Defaulted }

    // Struct to represent the loan details
    struct Loan {
        address borrower;
        uint requestedAmount;
        uint repayAmount;
        uint interestRate; // in percentage
        LoanState state;
        uint requestedDate;
        address fundedBy; // Track who funded this loan
    }

    // Mapping to store loans by borrower address
    mapping(address => Loan) public loans;

    // Mapping to track each lender's balance in the pool
    mapping(address => uint) public lenderBalances;

    // Variable to store the available balance in the contract
    uint public availableBalance;

    // Function to add funds to the contract
    function addFunds() public payable {
        availableBalance = availableBalance.add(msg.value);
        lenderBalances[msg.sender] = lenderBalances[msg.sender].add(msg.value);
    }

    // Function for lenders to withdraw their money
    function withdrawFunds(uint amount) public {
        require(amount <= lenderBalances[msg.sender], "Insufficient balance to withdraw");
        require(amount <= availableBalance, "Insufficient pool liquidity");

        lenderBalances[msg.sender] = lenderBalances[msg.sender].sub(amount);
        availableBalance = availableBalance.sub(amount);
        
        payable(msg.sender).transfer(amount);
    }

    // Function to request a loan
    // function requestLoan(uint amount) public {
    //     require(amount > 0, "Loan amount must be greater than 0");

    //     // Calculate repay amount based on the loan details
    //     uint repayAmount = calculateRepayAmount(amount);

    //     // Create a new loan
    //     loans[msg.sender] = Loan({
    //         borrower: msg.sender,
    //         requestedAmount: amount,
    //         repayAmount: repayAmount,
    //         interestRate: 2,
    //         state: LoanState.Requested,
    //         requestedDate: block.timestamp
    //     });
    // }

    function requestLoan(uint amount) public {
        require(amount > 0, "Loan amount must be greater than 0");
        require(loans[msg.sender].state == LoanState(0), "Previous loan must be closed"); // Optional: restrict multiple loans

        // Calculate repay amount
        uint repayAmount = calculateRepayAmount(amount);

        // Create a new loan
        loans[msg.sender] = Loan({
            borrower: msg.sender,
            requestedAmount: amount,
            repayAmount: repayAmount,
            interestRate: 2,
            state: LoanState.Requested,
            requestedDate: block.timestamp,
            fundedBy: address(0) // Not funded yet
        });

        // Auto fund the loan if enough balance
        if (availableBalance >= amount) {
            // Transfer the loan amount to borrower
            payable(msg.sender).transfer(amount);

            // Update state
            loans[msg.sender].state = LoanState.Funded;
            loans[msg.sender].fundedBy = address(this); // Funded by the general pool

            // Reduce from pool
            availableBalance = availableBalance.sub(amount);
        }
    }





    // Function to get loan details in a more readable format
    function getLoanDetails(address borrower) external view returns (Loan memory) {
        Loan storage loan = loans[borrower];
        return Loan({
            borrower: loan.borrower,
            requestedAmount: loan.requestedAmount,
            repayAmount: loan.repayAmount,
            interestRate: loan.interestRate,
            state: loan.state,
            requestedDate: loan.requestedDate,
            fundedBy: loan.fundedBy
        });
    }

    // Function to fund a loan
    function fundLoan(address borrower) public {
        // Get the loan details
        Loan storage loan = loans[borrower];

        // Check if the loan is in the requested state
        require(loan.state == LoanState.Requested, "Loan is not in the requested state");

        // Check if there are sufficient funds to fund the loan
        require(availableBalance >= loan.requestedAmount, "Insufficient funds to fund the loan");

        // Transfer funds from contract to borrower
        payable(loan.borrower).transfer(loan.requestedAmount);

        // Update loan state to funded
        loan.state = LoanState.Funded;
        loan.fundedBy = msg.sender; // Mark this lender as the funder

        // Deduct the funded amount from available balance
        availableBalance = availableBalance.sub(loan.requestedAmount);
    }

    // Function to get the repay amount for a loan
    function getRepayAmount(address borrower) external view returns (uint) {
        Loan storage loan = loans[borrower];
        return loan.repayAmount;
    }

    // Function to repay a loan
    function repayLoan() public payable {
        // Get the loan details
        Loan storage loan = loans[msg.sender];

        // Check if the loan is in the funded state
        require(loan.state == LoanState.Funded, "Loan is not in the funded state");

        // Check if the repayment amount is sufficient
        require(msg.value == loan.repayAmount, "Incorrect repayment amount");

        // Return money to the pool
        availableBalance = availableBalance.add(msg.value);

        // If it was funded by a specific lender, credit them with the repayment + interest
        if (loan.fundedBy != address(0) && loan.fundedBy != address(this)) {
            lenderBalances[loan.fundedBy] = lenderBalances[loan.fundedBy].add(msg.value);
        }

        // Update loan state to repaid
        loan.state = LoanState.Repaid;
    }

    // Function to calculate the repay amount based on loan details
    function calculateRepayAmount(uint amount) internal pure returns (uint) {
        // Add the amount and a constant interest of 2 ethers
        return amount + 2 ether;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
