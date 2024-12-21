document.getElementById("sipAmount").addEventListener("input", function () {
    validateSIPAmount(this);
});

document.getElementById("sipRate").addEventListener("input", function () {
    validateSIPRate(this);
});

document.getElementById("sipPeriod").addEventListener("input", function () {
    validateSIPPeriod(this);
});

document.getElementById("lumpsumAmount").addEventListener("input", function () {
    validateLumpsumAmount(this);
});

document.getElementById("lumpsumRate").addEventListener("input", function () {
    validateLumpsumRate(this);
});

document.getElementById("lumpsumPeriod").addEventListener("input", function () {
    validateLumpsumPeriod(this);
});


function validateSIPAmount(input) {
    const sipAmountError = document.getElementById("sipAmountError");
    if (isNaN(input.value) || input.value < 100 || input.value > 1000000) {
        sipAmountError.style.display = "block";
        sipAmountError.textContent = "Enter a valid SIP amount (₹100 - ₹10,00,000).";
        input.classList.add("shake");
    } else {
        sipAmountError.style.display = "none";
        input.classList.remove("shake");
    }
}

function validateSIPRate(input) {
    const sipRateError = document.getElementById("sipRateError");
    if (isNaN(input.value) || input.value < 1 || input.value > 30) {
        sipRateError.style.display = "block";
        sipRateError.textContent = "Rate should be between 1% and 30%.";
        input.classList.add("shake");
    } else {
        sipRateError.style.display = "none";
        input.classList.remove("shake");
    }
}

function validateSIPPeriod(input) {
    const sipPeriodError = document.getElementById("sipPeriodError");
    if (isNaN(input.value) || input.value < 1 || input.value > 40) {
        sipPeriodError.style.display = "block";
        sipPeriodError.textContent = "Period should be between 1 and 40 years.";
        input.classList.add("shake");
    } else {
        sipPeriodError.style.display = "none";
        input.classList.remove("shake");
    }
}

function validateLumpsumAmount(input) {
    const lumpsumAmountError = document.getElementById("lumpsumAmountError");
    if (isNaN(input.value) || input.value < 1000 || input.value > 10000000) {
        lumpsumAmountError.style.display = "block";
        lumpsumAmountError.textContent = "Enter a valid amount (₹1000 - ₹1 crore).";
        input.classList.add("shake");
    } else {
        lumpsumAmountError.style.display = "none";
        input.classList.remove("shake");
    }
}

function validateLumpsumRate(input) {
    const lumpsumRateError = document.getElementById("lumpsumRateError");
    if (isNaN(input.value) || input.value < 1 || input.value > 30) {
        lumpsumRateError.style.display = "block";
        lumpsumRateError.textContent = "Rate should be between 1% and 30%.";
        input.classList.add("shake");
    } else {
        lumpsumRateError.style.display = "none";
        input.classList.remove("shake");
    }
}

function validateLumpsumPeriod(input) {
    const lumpsumPeriodError = document.getElementById("lumpsumPeriodError");
    if (isNaN(input.value) || input.value < 1 || input.value > 50) {
        lumpsumPeriodError.style.display = "block";
        lumpsumPeriodError.textContent = "Period should be between 1 and 50 years.";
        input.classList.add("shake");
    } else {
        lumpsumPeriodError.style.display = "none";
        input.classList.remove("shake");
    }
}

function showTab(tabName) {
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach((tab) => {
        tab.style.display = "none";
    });

    const tabButton = document.querySelectorAll(".tab-button");
    tabButton.forEach((button) => {
        button.style.backgroundColor = "#007bff";
    });

    document.getElementById(tabName + "Tab").style.display = "block";
    event.target.style.backgroundColor = "#000000";
}

function calculateSIP() {
    const sipAmountInput = document.getElementById("sipAmount");
    const sipRateInput = document.getElementById("sipRate");
    const sipPeriodInput = document.getElementById("sipPeriod");
    const resultDiv = document.getElementById("sipResult");

    const sipAmountError = document.getElementById("sipAmountError");
    const sipRateError = document.getElementById("sipRateError");
    const sipPeriodError = document.getElementById("sipPeriodError");

    sipAmountError.style.display = "none";
    sipRateError.style.display = "none";
    sipPeriodError.style.display = "none";

    const P = parseFloat(sipAmountInput.value);
    const r = parseFloat(sipRateInput.value);
    const n = parseFloat(sipPeriodInput.value) * 12;

    let isValid = true;

    if (isNaN(P) || P < 100 || P > 1000000) {
        isValid = false;
        shakeInput(sipAmountInput, sipAmountError, "Enter a valid SIP amount (₹100 - ₹10,00,000).");
    }
    if (isNaN(r) || r < 1 || r > 30) {
        isValid = false;
        shakeInput(sipRateInput, sipRateError, "Rate should be between 1% and 30%.");
    }
    if (isNaN(n) || n < 12 || n > 480) {
        isValid = false;
        shakeInput(sipPeriodInput, sipPeriodError, "Period should be between 1 and 40 years.");
    }

    if (!isValid) {
        resultDiv.innerHTML = "";
        return;
    }

    const monthlyRate = r / 100 / 12;
    const FV = P * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate);
    const investedAmount = P * n;

    const returns = FV - investedAmount;

    resultDiv.innerHTML = `
      <div class="result-card">
        <h3>SIP Investment Result</h3>
        <p><strong>Total Invested Amount:</strong> ₹${investedAmount.toLocaleString()}</p>
        <p><strong>Total Value After ${sipPeriodInput.value} years:</strong> ₹${FV.toLocaleString()}</p>
        <p><strong>Total Returns:</strong> ₹${returns.toLocaleString()}</p>
      </div>
    `;
}

function calculateLumpsum() {
    const lumpsumAmountInput = document.getElementById("lumpsumAmount");
    const lumpsumRateInput = document.getElementById("lumpsumRate");
    const lumpsumPeriodInput = document.getElementById("lumpsumPeriod");
    const resultDiv = document.getElementById("lumpsumResult");

    const lumpsumAmountError = document.getElementById("lumpsumAmountError");
    const lumpsumRateError = document.getElementById("lumpsumRateError");
    const lumpsumPeriodError = document.getElementById("lumpsumPeriodError");

    lumpsumAmountError.style.display = "none";
    lumpsumRateError.style.display = "none";
    lumpsumPeriodError.style.display = "none";

    const P = parseFloat(lumpsumAmountInput.value);
    const r = parseFloat(lumpsumRateInput.value);
    const n = parseFloat(lumpsumPeriodInput.value);

    let isValid = true;

    if (isNaN(P) || P < 1000 || P > 10000000) {
        isValid = false;
        shakeInput(lumpsumAmountInput, lumpsumAmountError, "Enter a valid amount (₹1000 - ₹1 crore).");
    }
    if (isNaN(r) || r < 1 || r > 30) {
        isValid = false;
        shakeInput(lumpsumRateInput, lumpsumRateError, "Rate should be between 1% and 30%.");
    }
    if (isNaN(n) || n < 1 || n > 50) {
        isValid = false;
        shakeInput(lumpsumPeriodInput, lumpsumPeriodError, "Period should be between 1 and 50 years.");
    }

    if (!isValid) {
        resultDiv.innerHTML = "";
        return;
    }

    const FV = P * Math.pow(1 + r / 100, n);
    const investedAmount = P;

    const returns = FV - investedAmount;

    resultDiv.innerHTML = `
      <div class="result-card">
        <h3>Lumpsum Investment Result</h3>
        <p><strong>Total Invested Amount:</strong> ₹${investedAmount.toLocaleString()}</p>
        <p><strong>Total Value After ${n} years:</strong> ₹${FV.toLocaleString()}</p>
        <p><strong>Total Returns:</strong> ₹${returns.toLocaleString()}</p>
      </div>
    `;
}

function shakeInput(input, errorElement, message) {
    input.classList.add("shake");
    errorElement.style.display = "block";
    errorElement.textContent = message;
}
  