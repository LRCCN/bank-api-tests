# Bank API Tests

Automated API testing suite for a banking system using Node.js, Mocha, and Chai.

## 📋 Overview

This project contains automated tests for a banking API, covering authentication and financial transfer operations. The tests validate API endpoints, request/response structures, and business rules.

**Language**: JavaScript (Node.js)

## 🧪 Tests Implemented

### Login Tests
- **POST /login**: Validates successful authentication with valid credentials and token generation

### Transfer Tests
- **POST /transferencias**: 
  - Validates successful transfer creation (amount ≥ R$ 10.00) - returns 201
  - Validates rejection of transfers below minimum amount (< R$ 10.00) - returns 422
  
- **GET /transferencias/{id}**: 
  - Validates retrieval of specific transfer by ID
  - Verifies correct data structure and values in response

- **GET /transferencias**: 
  - Validates pagination functionality
  - Verifies limit parameter correctly restricts returned results

## 🛠️ Technologies Used

- **[Node.js](https://nodejs.org/)**: JavaScript runtime environment
- **[Mocha](https://mochajs.org/)**: Test framework for running test suites
- **[Chai](https://www.chaijs.com/)**: Assertion library for BDD/TDD assertions
- **[SuperTest](https://github.com/ladjs/supertest)**: HTTP assertions library for testing APIs
- **[Mochawesome](https://github.com/adamgruber/mochawesome)**: HTML/CSS reporter for generating test reports
- **[dotenv](https://github.com/motdotla/dotenv)**: Environment variable management

## 🔗 Related Repositories

This testing project is part of a complete banking system. The following repositories are essential for running the tests:

1. **[banco-api](https://github.com/juliodelimas/banco-api)** - Backend API that provides the endpoints being tested
2. **[banco-web](https://github.com/juliodelimas/banco-web)** - Frontend web application for the banking system

Make sure to set up and run the `banco-api` before executing these tests, and configure the `BASE_URL` in your `.env` file to point to the running API instance.

## 📁 Project Structure

```
bank-api-tests/
├── test/                    # Test files
│   ├── login.test.js       # Login endpoint tests
│   └── transfer.test.js    # Transfer endpoint tests
├── helpers/                 # Helper functions
│   └── authentication.js   # Authentication helper for token generation
├── fixtures/                # Test data
│   ├── postLogin.json      # Login request payload
│   └── postTransfers.json  # Transfer request payload
├── mochawesome-report/      # Generated HTML test reports
├── package.json             # Project dependencies and scripts
└── .env                     # Environment variables (not included in repo)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LRCCN/bank-api-tests_.git
cd bank-api-tests
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
BASE_URL=<your-api-base-url>
```

### Running Tests

Execute all tests with HTML report generation:
```bash
npm test
```

The test results will be generated in the `mochawesome-report/` directory. Open `mochawesome-report/mochawesome.html` in a browser to view the detailed test report.

## 📊 Test Reports

After running tests, Mochawesome generates an interactive HTML report containing:
- Test execution summary (passed/failed/pending)
- Detailed test results with execution time
- Visual charts and statistics
- Stack traces for failed tests

**Viewing the Report:**
Open `mochawesome-report/mochawesome.html` in your browser to access the full interactive report with charts, filters, and detailed test information.

## 🔑 Authentication

The project uses Bearer token authentication. The `authentication.js` helper automatically handles token generation for tests that require authorization.

## 📝 Notes

- Tests include a 200-second timeout to accommodate slower API responses
- Authentication token is automatically generated before each transfer test using the `beforeEach` hook
- Test data is stored in JSON fixtures for easy maintenance and reusability

## 🐛 Issues Found

During testing, the following API inconsistencies were identified:

1. **GET /transferencias/{id}** - Data Type Issue:
   - **Expected**: Transfer value should be returned as a float/number
   - **Actual**: Value is sometimes returned as a string instead of float
   - **Impact**: May cause type validation issues in frontend applications
   - **Example**: `valor` field should be `5001.00` (number) not `"5001.00"` (string)

2. **GET /transferencias?limit={n}** - Pagination Issue:
   - **Expected**: When limit parameter is set to 10, API should return exactly 10 elements
   - **Actual**: API returns more than 10 elements even when limit=10 is specified
   - **Impact**: Pagination functionality is not working as expected
   - **Test**: The test validates that `response.body.transferencias` array length matches the specified limit

## 📄 License

ISC
