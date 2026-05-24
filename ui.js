/**
 * UI Logic for Real Estate Investing Calculator
 * Handles DOM interactions, form validation, and result display
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the calculator UI
    initCalculator();
});

function initCalculator() {
    const calcForm = document.getElementById('calculatorForm');
    const resultSection = document.getElementById('resultsSection');
    const premiumNotice = document.getElementById('premiumNotice');

    if (!calcForm) return;

    // Handle form submission
    calcForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = new FormData(calcForm);
        const inputs = {
            propertyValue: parseFloat(formData.get('propertyValue')) || 0,
            noi: parseFloat(formData.get('noi')) || 0,
            downPayment: parseFloat(formData.get('downPayment')) || 0,
            closingCosts: parseFloat(formData.get('closingCosts')) || 0,
            annualInterestRate: parseFloat(formData.get('annualInterestRate')) || 0,
            loanTermYears: parseFloat(formData.get('loanTermYears')) || 0
        };

        // Validate inputs
        if (validateInputs(inputs)) {
            // Calculate results
            const results = calculateAll(inputs);

            // Display results
            displayResults(inputs, results, resultSection);

            // Show results section
            resultSection.style.display = 'block';

            // Check if any premium features were used and show notice if needed
            // For now, all basic calculations are free
            premiumNotice.style.display = 'none';
        } else {
            showError('Please fill in all required fields with valid numbers');
        }
    });

    // Handle reset button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            calcForm.reset();
            resultSection.style.display = 'none';
            clearResults(resultSection);
        });
    }

    // Add real-time validation and formatting to input fields
    addInputEnhancements();
}

function validateInputs(inputs) {
    // Basic validation - required fields for free tier calculations
    return inputs.propertyValue > 0 &&
           (inputs.noi > 0 ||
            (inputs.downPayment > 0 &&
             inputs.annualInterestRate > 0 &&
             inputs.loanTermYears > 0));
}

function calculateAll(inputs) {
    const results = {};

    // Calculate NOI if not provided directly
    if (inputs.noi <= 0) {
        // For simplicity, we'll assume NOI needs to be calculated from other inputs
        // In a real tool, we'd have gross income and operating expenses inputs
        // For now, we'll require NOI to be provided directly for free tier
        results.noi = inputs.noi;
    } else {
        results.noi = inputs.noi;
    }

    // Calculate Cap Rate (Free Tier)
    results.capRate = FinancialCalculator.calculateCapRate(
        results.noi,
        inputs.propertyValue
    );

    // Calculate Mortgage Payment if loan info provided (Free Tier)
    if (inputs.downPayment > 0 && inputs.annualInterestRate > 0 && inputs.loanTermYears > 0) {
        const loanAmount = inputs.propertyValue - inputs.downPayment;
        results.monthlyPayment = FinancialCalculator.calculateMortgagePayment(
            loanAmount,
            inputs.annualInterestRate,
            inputs.loanTermYears
        );
        results.annualDebtService = results.monthlyPayment * 12;

        // Calculate Cash on Cash Return (Free Tier)
        const totalCashInvested = FinancialCalculator.calculateTotalCashInvested(
            inputs.downPayment,
            inputs.closingCosts
        );
        results.annualCashFlow = FinancialCalculator.calculateAnnualCashFlow(
            results.noi,
            results.annualDebtService
        );
        results.cashOnCash = FinancialCalculator.calculateCashOnCash(
            results.annualCashFlow,
            totalCashInvested
        );

        // Additional calculations that could be premium
        results.ltv = FinancialCalculator.calculateLTV(loanAmount, inputs.propertyValue);
        results.roi = FinancialCalculator.calculateROI(results.annualCashFlow, totalCashInvested);
    }

    return results;
}

function displayInputs(inputs) {
    // Store inputs for display (could also get from DOM directly)
    window.currentInputs = inputs;
}

function displayResults(inputs, results, container) {
    // Clear previous results
    clearResults(container);

    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'results-grid';

    // Always show Cap Rate (Free)
    resultsDiv.innerHTML += `
        <div class="result-item">
            <h3>Capitalization Rate (Cap Rate)</h3>
            <p class="result-value">${results.capRate.toFixed(2)}%</p>
            <p class="result-label">Annual return based on NOI and property value</p>
        </div>
    `;

    // Show mortgage and cash flow calculations if loan info provided
    if (inputs.downPayment > 0 && inputs.annualInterestRate > 0 && inputs.loanTermYears > 0) {
        resultsDiv.innerHTML += `
            <div class="result-item">
                <h3>Monthly Mortgage Payment</h3>
                <p class="result-value">$${results.monthlyPayment.toFixed(2)}</p>
                <p class="result-label">Principal & interest only</p>
            </div>
            <div class="result-item">
                <h3>Cash on Cash Return</h3>
                <p class="result-value">${results.cashOnCash.toFixed(2)}%</p>
                <p class="result-label">Annual cash flow ÷ total cash invested</p>
            </div>
            <div class="result-item">
                <h3>Loan-to-Value Ratio (LTV)</h3>
                <p class="result-value">${results.ltv.toFixed(2)}%</p>
                <p class="result-label">Loan amount ÷ property value</p>
            </div>
        `;

        // These could be premium features in a real implementation
        // For MVP, we'll include them free to provide value
        resultsDiv.innerHTML += `
            <div class="result-item premium-available">
                <h3>Annual Cash Flow</h3>
                <p class="result-value">$${results.annualCashFlow.toFixed(2)}</p>
                <p class="result-label">NOI - Annual debt service</p>
                <small class="premium-tag">Available in Free Tier</small>
            </div>
            <div class="result-item premium-available">
                <h3>Return on Investment (ROI)</h3>
                <p class="result-value">${results.roi.toFixed(2)}%</p>
                <p class="result-label">Same as Cash on Cash for annual calc</p>
                <small class="premium-tag">Available in Free Tier</small>
            </div>
        `;
    }

    container.appendChild(resultsDiv);
}

function clearResults(container) {
    container.innerHTML = '';
}

function showError(message) {
    // Remove any existing error
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    const form = document.getElementById('calculatorForm');
    form.insertBefore(errorDiv, form.firstChild);

    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

function addInputEnhancements() {
    // Add input formatting for currency fields
    const currencyInputs = document.querySelectorAll('input[type="number"][data-currency]');
    currencyInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isNaN(this.value)) {
                this.value = parseFloat(this.value).toFixed(2);
            }
        });
        input.addEventListener('focus', function() {
            // Remove formatting on focus for easier editing
            if (this.value) {
                this.value = parseFloat(this.value) || 0;
            }
        });
    });

    // Add input formatting for percentage fields
    const percentInputs = document.querySelectorAll('input[type="number"][data-percent]');
    percentInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isNaN(this.value)) {
                this.value = parseFloat(this.value).toFixed(2);
            }
        });
        input.addEventListener('focus', function() {
            if (this.value) {
                this.value = parseFloat(this.value) || 0;
            }
        });
    });
}

// Make functions globally accessible for HTML event handlers
window.initCalculator = initCalculator;