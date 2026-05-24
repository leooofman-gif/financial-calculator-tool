/**
 * Financial Calculation Engine for Real Estate Investing Calculator
 * Core calculations for the freemium real estate investment tool
 */

/**
 * Calculate Capitalization Rate (Cap Rate)
 * Formula: (Net Operating Income / Property Value) * 100
 * @param {number} noi - Net Operating Income (annual)
 * @param {number} propertyValue - Property value or price
 * @returns {number} Cap rate percentage
 */
function calculateCapRate(noi, propertyValue) {
    if (propertyValue <= 0) return 0;
    return (noi / propertyValue) * 100;
}

/**
 * Calculate Cash on Cash Return
 * Formula: (Annual Pre-tax Cash Flow / Total Cash Invested) * 100
 * @param {number} annualCashFlow - Annual pre-tax cash flow
 * @param {number} totalCashInvested - Total cash invested (down payment + closing costs + rehab)
 * @returns {number} Cash on cash return percentage
 */
function calculateCashOnCash(annualCashFlow, totalCashInvested) {
    if (totalCashInvested <= 0) return 0;
    return (annualCashFlow / totalCashInvested) * 100;
}

/**
 * Calculate Monthly Mortgage Payment
 * Formula: P * [r(1+r)^n] / [(1+r)^n – 1]
 * Where P = principal, r = monthly interest rate, n = total number of payments
 * @param {number} loanAmount - Loan principal amount
 * @param {number} annualInterestRate - Annual interest rate (as percentage, e.g., 5 for 5%)
 * @param {number} loanTermYears - Loan term in years
 * @returns {number} Monthly mortgage payment
 */
function calculateMortgagePayment(loanAmount, annualInterestRate, loanTermYears) {
    if (loanAmount <= 0 || annualInterestRate <= 0 || loanTermYears <= 0) return 0;

    const monthlyRate = annualInterestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    if (monthRate === 0) {
        return loanAmount / totalPayments;
    }

    return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
           (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

/**
 * Calculate Net Operating Income (NOI)
 * Formula: Gross Operating Income - Operating Expenses
 * @param {number} grossIncome - Gross rental income + other income
 * @param {number} operatingExpenses - Operating expenses (maintenance, utilities, property mgmt, etc.)
 * @returns {number} Net Operating Income
 */
function calculateNOI(grossIncome, operatingExpenses) {
    return Math.max(0, grossIncome - operatingExpenses);
}

/**
 * Calculate Total Cash Invested
 * Formula: Down Payment + Closing Costs + Rehab/Purchase Repairs
 * @param {number} downPayment - Down payment amount
 * @param {number} closingCosts - Closing costs amount
 * @param {number} rehabCosts - Rehab or repair costs amount
 * @returns {number} Total cash invested
 */
function calculateTotalCashInvested(downPayment, closingCosts, rehabCosts = 0) {
    return downPayment + closingCosts + rehabCosts;
}

/**
 * Calculate Annual Pre-tax Cash Flow
 * Formula: Net Operating Income - Annual Debt Service
 * @param {number} noi - Net Operating Income
 * @param {number} annualDebtService - Annual mortgage payments (monthly payment * 12)
 * @returns {number} Annual pre-tax cash flow
 */
function calculateAnnualCashFlow(noi, annualDebtService) {
    return noi - annualDebtService;
}

/**
 * Calculate Return on Investment (ROI)
 * Formula: (Annual Cash Flow / Total Cash Invested) * 100
 * Note: This is essentially the same as Cash on Cash Return for annual calculations
 * @param {number} annualCashFlow - Annual pre-tax cash flow
 * @param {number} totalCashInvested - Total cash invested
 * @returns {number} ROI percentage
 */
function calculateROI(annualCashFlow, totalCashInvested) {
    return calculateCashOnCash(annualCashFlow, totalCashInvested);
}

/**
 * Calculate Loan-to-Value Ratio (LTV)
 * Formula: (Loan Amount / Property Value) * 100
 * @param {number} loanAmount - Loan amount
 * @param {number} propertyValue - Property value
 * @returns {number} LTV percentage
 */
function calculateLTV(loanAmount, propertyValue) {
    if (propertyValue <= 0) return 0;
    return (loanAmount / propertyValue) * 100;
}

// Export functions for use in other modules (if using modules)
// In plain JS, we'll attach to window object for simplicity
window.FinancialCalculator = {
    calculateCapRate,
    calculateCashOnCash,
    calculateMortgagePayment,
    calculateNOI,
    calculateTotalCashInvested,
    calculateAnnualCashFlow,
    calculateROI,
    calculateLTV
};