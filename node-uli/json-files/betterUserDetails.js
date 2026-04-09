const data = [
  {
    "borrowerId": "PADMA12345",
    "personalDetails": {
      "firstName": "Padma",
      "lastName": "Rao",
      "dateOfBirth": "1975-08-15",
      "gender": "female",
      "maritalStatus": "married",
      "address": "Village XYZ, District ABC, State DEF, India",
      "contactNumber": "+919876543210",
      "email": "padma.rao@example.com",
      "panNumber": "ABCDE1234F",
      "aadhaarNumber": "123456789012"
    },
    "bankAccountValidation": {
      "bankName": "State Bank of India",
      "accountNumber": "1234567890",
      "accountType": "savings",
      "accountVerified": true
    },
    "gstnData": {
      "gstin": "29ABCDE1234F1Z5",
      "businessName": "Padma's Agricultural Products",
      "businessType": "Sole Proprietorship",
      "gstRegistered": true
    },
    "landRecordsOwnership": {
      "landArea": "0.7 Hectare",
      "landOwner": "Padma Rao",
      "landUseType": "Agriculture",
      "mortgage": "No",
      "landRecordId": "LR123456789"
    },
    "milkPouringCashFlow": {
      "dairyFarmerName": "Padma Rao",
      "vintage24Months": true,
      "totalMilkPoured2023": "7500 Litres",
      "totalMilkPouringIncome": "Rs. 550,000"
    },
    "satelliteImageryData": {
      "landAreaAnalysis": {
        "cropHealth": "Good",
        "waterAvailability": "Sufficient",
        "landBoundary": "Clear"
      },
      "imageryDate": "2023-11-15"
    },
    "customerFinancialData": {
      "incomeDetails": {
        "employmentType": "self-employed",
        "monthlyIncome": 45000,
        "annualIncome": 540000,
        "incomeSources": [
          {
            "source": "Milk Sales",
            "amount": 450000,
            "frequency": "annual"
          },
          {
            "source": "Crop Sales",
            "amount": 90000,
            "frequency": "annual"
          }
        ],
        "proofOfIncome": ["milk_sales_receipts.pdf", "crop_sales_invoices.pdf"]
      },
      "financialAssets": {
        "bankAccounts": [
          {
            "bankName": "State Bank of India",
            "accountNumber": "1234567890",
            "accountType": "savings",
            "currentBalance": 50000
          }
        ],
        "investments": []
      },
      "physicalAssets": {
        "realEstate": [
          {
            "address": "Village XYZ, District ABC",
            "marketValue": 1000000,
            "ownershipType": "owned"
          }
        ],
        "vehicles": []
      }
    },
    "transliteration": {
      "nameInLocalLanguage": "पद्मा राव",
      "addressInLocalLanguage": "गांव एक्सवाईजेड, जिला एबीसी"
    },
    "panVerification": {
      "panVerified": true
    },
    "ekyc": {
      "ekycVerified": true,
      "ekycProvider": "Aadhaar"
    },
    "esign": {
      "esignVerified": true,
      "esignDocumentId": "ESIGN12345"
    },
    "propertySearchData": {
      "propertyFound": true,
      "propertyDetails": {
        "propertyId": "PROP12345",
        "propertyAddress": "Village XYZ, District ABC"
      }
    },
    "creditGuaranteeMSME": {
      "guaranteeEligible": true,
      "guaranteeAmount": 200000
    },
    "invoiceFingerprintingMSME": {
      "invoiceFingerprints": [
        "INVFP12345",
        "INVFP67890"
      ],
      "invoiceCount": 2
    },
    "digilockerDocuments": [
      {
        "documentType": "Aadhaar Card",
        "documentId": "DL12345"
      },
       {
        "documentType": "Land Record",
        "documentId": "DL67890"
      }
    ],
    "estamp": {
      "estampVerified": true,
      "estampId": "ESTAMP12345"
    },
    "creditHistory":{
      "creditScore": 720,
      "loanHistory":[]
    }
  },
  {
    "borrowerId": "RAHUL67890",
    "personalDetails": {
      "firstName": "Rahul",
      "lastName": "Sharma",
      "dateOfBirth": "1985-12-10",
      "gender": "male",
      "maritalStatus": "single",
      "address": "City PQR, State LMN, India",
      "contactNumber": "+918765432109",
      "email": "rahul.sharma@example.com",
      "panNumber": "FGHIJ5678K",
      "aadhaarNumber": "987654321098"
    },
    "bankAccountValidation": {
      "bankName": "HDFC Bank",
      "accountNumber": "0987654321",
      "accountType": "current",
      "accountVerified": true
    },
    "gstnData": {
      "gstin": "07FGHIJ5678K1Z6",
      "businessName": "Rahul's Tech Solutions",
      "businessType": "Partnership",
      "gstRegistered": true
    },
    "landRecordsOwnership": {
      "landArea": "2 Acres",
      "landOwner": "Rahul Sharma",
      "landUseType": "Commercial",
      "mortgage": "Yes",
      "landRecordId": "LR987654321"
    },
    "milkPouringCashFlow": {
      "dairyFarmerName": "N/A",
      "vintage24Months": false,
      "totalMilkPoured2023": "0 Litres",
      "totalMilkPouringIncome": "Rs. 0"
    },
    "satelliteImageryData": {
      "landAreaAnalysis": {
        "cropHealth": "N/A",
        "waterAvailability": "N/A",
        "landBoundary": "N/A"
      },
      "imageryDate": "2023-10-20"
    },
    "customerFinancialData": {
      "incomeDetails": {
        "employmentType": "business-owner",
        "monthlyIncome": 75000,
        "annualIncome": 900000,
        "incomeSources": [
          {
            "source": "IT Services",
            "amount": 900000,
            "frequency": "annual"
          }
        ],
        "proofOfIncome": ["balance_sheet_2023.pdf"]
      },
      "financialAssets": {
        "bankAccounts": [
          {
            "bankName": "HDFC Bank",
            "accountNumber": "0987654321",
            "accountType": "current",
            "currentBalance": 150000
          }
        ],
        "investments": [
          {
            "type": "Mutual Funds",
            "value": 500000
          }
        ]
      },
      "physicalAssets": {
        "realEstate": [
          {
            "address": "City PQR, State LMN",
            "marketValue": 2500000,
            "ownershipType": "owned"
          }
        ],
        "vehicles": [
          {
            "type": "Car",
            "marketValue": 1000000
          }
        ]
      }
    },
    "transliteration": {
      "nameInLocalLanguage": "राहुल शर्मा",
      "addressInLocalLanguage": "शहर पीक्यूआर, राज्य एलएमएन"
    },
    "panVerification": {
      "panVerified": true
    },
    "ekyc": {
      "ekycVerified": true,
      "ekycProvider": "Aadhaar"
    },
    "esign": {
      "esignVerified": true,
      "esignDocumentId": "ESIGN67890"
    },
    "propertySearchData": {
      "propertyFound": true,
      "propertyDetails": {
        "propertyId": "PROP67890",
        "propertyAddress": "City PQR, State LMN"
      }
    },
    "creditGuaranteeMSME": {
      "guaranteeEligible": false,
      "guaranteeAmount": 0
    },
    "invoiceFingerprintingMSME": {
      "invoiceFingerprints": [
        "INVFP56789",
        "INVFP12345"
      ],
      "invoiceCount": 2
    },
    "digilockerDocuments": [
      {
        "documentType": "Aadhaar Card",
        "documentId": "DL56789"
      },
      {
        "documentType": "Business Registration",
        "documentId": "DL54321"
      }
    ],
    "estamp": {
      "estampVerified": true,
      "estampId": "ESTAMP67890"
    },
    "creditHistory":{
      "creditScore": 680,
      "loanHistory":[
        {
          "loanType": "Business Loan",
          "amount": 500000,
          "status": "Closed"
        }
      ]
    }
  },
  {
    "borrowerId": "RAMESH9876",
    "personalDetails": {
      "firstName": "Ramesh",
      "lastName": "Verma",
      "dateOfBirth": "1980-06-10",
      "gender": "male",
      "maritalStatus": "married",
      "address": "Sector 22, Gurgaon, Haryana, India",
      "contactNumber": "+919812345678",
      "email": "ramesh.verma@example.com",
      "panNumber": "GHJKL6789P",
      "aadhaarNumber": "234567890123"
    },
    "bankAccountValidation": {
      "bankName": "ICICI Bank",
      "accountNumber": "4567891230",
      "accountType": "current",
      "accountVerified": true
    },
    "gstnData": {
      "gstin": "06GHJKL6789P1Z2",
      "businessName": "Verma Electronics",
      "businessType": "Private Limited",
      "gstRegistered": true
    },
    "customerFinancialData": {
      "incomeDetails": {
        "employmentType": "self-employed",
        "monthlyIncome": 75000,
        "annualIncome": 900000,
        "incomeSources": [
          {
            "source": "Electronics Shop",
            "amount": 900000,
            "frequency": "annual"
          }
        ],
        "proofOfIncome": ["sales_reports.pdf", "business_tax_returns.pdf"]
      },
      "financialAssets": {
        "bankAccounts": [
          {
            "bankName": "ICICI Bank",
            "accountNumber": "4567891230",
            "accountType": "current",
            "currentBalance": 200000
          }
        ],
        "investments": ["Mutual Funds", "Fixed Deposits"]
      },
      "physicalAssets": {
        "realEstate": [
          {
            "address": "Gurgaon Commercial Complex",
            "marketValue": 5000000,
            "ownershipType": "owned"
          }
        ],
        "vehicles": [
          {
            "vehicleType": "Car",
            "brand": "Toyota",
            "model": "Innova Crysta",
            "marketValue": 1500000
          }
        ]
      }
    },
    "creditHistory": {
      "creditScore": 780,
      "loanHistory": [
        {
          "loanType": "Business Loan",
          "amount": 500000,
          "status": "Closed"
        }
      ]
    }
  },
  {
    "borrowerId": "SUNITA6543",
    "personalDetails": {
      "firstName": "Sunita",
      "lastName": "Sharma",
      "dateOfBirth": "1985-12-05",
      "gender": "female",
      "maritalStatus": "widowed",
      "address": "Village PQR, District UVW, Rajasthan, India",
      "contactNumber": "+919865432100",
      "email": "sunita.sharma@example.com",
      "panNumber": "JKLMN3456H",
      "aadhaarNumber": "345678901234"
    },
    "landRecordsOwnership": {
      "landArea": "1.2 Hectares",
      "landOwner": "Sunita Sharma",
      "landUseType": "Agriculture",
      "mortgage": "No",
      "landRecordId": "LR987654321"
    },
    "satelliteImageryData": {
      "landAreaAnalysis": {
        "cropHealth": "Moderate",
        "waterAvailability": "Limited",
        "landBoundary": "Clear"
      },
      "imageryDate": "2024-01-10"
    },
    "customerFinancialData": {
      "incomeDetails": {
        "employmentType": "self-employed",
        "monthlyIncome": 25000,
        "annualIncome": 300000,
        "incomeSources": [
          {
            "source": "Crop Sales",
            "amount": 200000,
            "frequency": "annual"
          },
          {
            "source": "Livestock Sales",
            "amount": 100000,
            "frequency": "annual"
          }
        ],
        "proofOfIncome": ["crop_sales_receipts.pdf"]
      },
      "financialAssets": {
        "bankAccounts": [
          {
            "bankName": "Bank of Baroda",
            "accountNumber": "8765432109",
            "accountType": "savings",
            "currentBalance": 15000
          }
        ],
        "investments": []
      },
      "physicalAssets": {
        "realEstate": [
          {
            "address": "Village PQR, District UVW",
            "marketValue": 800000,
            "ownershipType": "owned"
          }
        ],
        "vehicles": []
      }
    },
    "creditHistory": {
      "creditScore": 650,
      "loanHistory": []
    }
  },
  {
    "borrowerId": "AARAV7890",
    "personalDetails": {
      "firstName": "Aarav",
      "lastName": "Desai",
      "dateOfBirth": "1992-04-18",
      "gender": "male",
      "maritalStatus": "single",
      "address": "Koramangala, Bangalore, Karnataka, India",
      "contactNumber": "+917002345678",
      "email": "aarav.desai@example.com",
      "panNumber": "XYZPQ6789L",
      "aadhaarNumber": "567890123456"
    },
    "bankAccountValidation": {
      "bankName": "HDFC Bank",
      "accountNumber": "6543219870",
      "accountType": "savings",
      "accountVerified": true
    },
    "customerFinancialData": {
      "incomeDetails": {
        "employmentType": "salaried",
        "monthlyIncome": 120000,
        "annualIncome": 1440000,
        "incomeSources": [
          {
            "source": "Software Developer Salary",
            "amount": 1440000,
            "frequency": "monthly"
          }
        ],
        "proofOfIncome": ["salary_slips.pdf"]
      },
      "financialAssets": {
        "bankAccounts": [
          {
            "bankName": "HDFC Bank",
            "accountNumber": "6543219870",
            "accountType": "savings",
            "currentBalance": 300000
          }
        ],
        "investments": ["Stocks", "Cryptocurrency"]
      },
      "physicalAssets": {
        "realEstate": [
          {
            "address": "Bangalore, Karnataka",
            "marketValue": 6000000,
            "ownershipType": "owned"
          }
        ],
        "vehicles": [
          {
            "vehicleType": "Bike",
            "brand": "Royal Enfield",
            "model": "Classic 350",
            "marketValue": 200000
          }
        ]
      }
    },
    "creditHistory": {
      "creditScore": 820,
      "loanHistory": [
        {
          "loanType": "Personal Loan",
          "amount": 200000,
          "status": "Active"
        }
      ]
    }
  },
  {
    "borrowerId": "MEENA1122",
    "personalDetails": {
      "firstName": "Meena",
      "lastName": "Iyer",
      "dateOfBirth": "1995-11-22",
      "gender": "female",
      "maritalStatus": "single",
      "address": "Andheri, Mumbai, Maharashtra, India",
      "contactNumber": "+918765432198",
      "email": "meena.iyer@example.com",
      "panNumber": "LMNOP2345G",
      "aadhaarNumber": "678901234567"
    },
    "customerFinancialData": {
      "incomeDetails": {
        "employmentType": "freelancer",
        "monthlyIncome": 65000,
        "annualIncome": 780000,
        "incomeSources": [
          {
            "source": "Freelance Graphic Design",
            "amount": 780000,
            "frequency": "monthly"
          }
        ],
        "proofOfIncome": ["invoice_statements.pdf", "bank_statements.pdf"]
      },
      "financialAssets": {
        "bankAccounts": [
          {
            "bankName": "Axis Bank",
            "accountNumber": "5678912345",
            "accountType": "savings",
            "currentBalance": 120000
          }
        ],
        "investments": ["Mutual Funds"]
      },
      "physicalAssets": {
        "realEstate": [],
        "vehicles": []
      }
    },
    "creditHistory": {
      "creditScore": 750,
      "loanHistory": []
    }
  },
  {
    "borrowerId": "RAJESH9876",
    "personalDetails": {
      "firstName": "Rajesh",
      "lastName": "Kumar",
      "dateOfBirth": "1960-02-15",
      "gender": "male",
      "maritalStatus": "married",
      "address": "Patna, Bihar, India",
      "contactNumber": "+919876543219",
      "email": "rajesh.kumar@example.com",
      "panNumber": "ZXYAB5678M",
      "aadhaarNumber": "890123456789"
    },
    "customerFinancialData": {
      "incomeDetails": {
        "employmentType": "retired",
        "monthlyIncome": 40000,
        "annualIncome": 480000,
        "incomeSources": [
          {
            "source": "Government Pension",
            "amount": 480000,
            "frequency": "monthly"
          }
        ],
        "proofOfIncome": ["pension_statements.pdf"]
      },
      "financialAssets": {
        "bankAccounts": [
          {
            "bankName": "Punjab National Bank",
            "accountNumber": "1239876543",
            "accountType": "savings",
            "currentBalance": 250000
          }
        ],
        "investments": ["Fixed Deposits", "Gold"]
      },
      "physicalAssets": {
        "realEstate": [
          {
            "address": "Patna, Bihar",
            "marketValue": 3000000,
            "ownershipType": "owned"
          }
        ],
        "vehicles": []
      }
    },
    "creditHistory": {
      "creditScore": 780,
      "loanHistory": []
    }
  },
  {
    "borrowerId": "POOJA2023",
    "personalDetails": {
      "firstName": "Pooja",
      "lastName": "Reddy",
      "dateOfBirth": "2004-07-20",
      "gender": "female",
      "maritalStatus": "single",
      "address": "Hyderabad, Telangana, India",
      "contactNumber": "+919765432109",
      "email": "pooja.reddy@example.com",
      "panNumber": "ABCXY6789K",
      "aadhaarNumber": "456789012345"
    },
    "customerFinancialData": {
      "incomeDetails": {
        "employmentType": "student",
        "monthlyIncome": 0,
        "annualIncome": 0,
        "incomeSources": [],
        "proofOfIncome": []
      },
      "financialAssets": {
        "bankAccounts": [
          {
            "bankName": "SBI",
            "accountNumber": "8765432190",
            "accountType": "savings",
            "currentBalance": 15000
          }
        ],
        "investments": []
      },
      "physicalAssets": {
        "realEstate": [],
        "vehicles": []
      }
    },
    "creditHistory": {
      "creditScore": 680,
      "loanHistory": []
    }
  },
  {
    "borrowerId": "AMIT4444",
    "personalDetails": {
      "firstName": "Amit",
      "lastName": "Sharma",
      "dateOfBirth": "1985-03-25",
      "gender": "male",
      "maritalStatus": "married",
      "address": "Pune, Maharashtra, India",
      "contactNumber": "+918765432198",
      "email": "amit.sharma@example.com",
      "panNumber": "ZXCVB6789M",
      "aadhaarNumber": "567890123456"
    },
    "customerFinancialData": {
      "incomeDetails": {
        "employmentType": "self-employed",
        "monthlyIncome": 35000,
        "annualIncome": 420000,
        "incomeSources": [
          {
            "source": "Taxi Services",
            "amount": 420000,
            "frequency": "monthly"
          }
        ],
        "proofOfIncome": ["vehicle_registration.pdf", "earning_statements.pdf"]
      },
      "financialAssets": {
        "bankAccounts": [
          {
            "bankName": "Union Bank",
            "accountNumber": "7654321890",
            "accountType": "savings",
            "currentBalance": 50000
          }
        ],
        "investments": []
      },
      "physicalAssets": {
        "realEstate": [],
        "vehicles": [
          {
            "vehicleType": "Car",
            "brand": "Maruti Suzuki",
            "model": "Swift Dzire",
            "marketValue": 600000
          }
        ]
      }
    },
    "creditHistory": {
      "creditScore": 710,
      "loanHistory": []
    }
  }
  
]

module.exports = data;