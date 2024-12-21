function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function calculatePremium(age, years, plan) {
    const basePremium = 500; // Base premium amount
    const ageFactor = age * 100; // Premium increases by Rs 100 per year of age
    const coverageFactor = years * 200; // Premium increases by Rs 200 per year of coverage

    let planFactor = 1; // Default factor for Basic plan
    if (plan === 'premium') {
        planFactor = 1.5;
    } else if (plan === 'gold') {
        planFactor = 2;
    }

    return (basePremium + ageFactor + coverageFactor) * planFactor;
}

function calculateCoverage() {
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const years = parseInt(document.getElementById('years').value);
    const plan = document.getElementById('plan').value;

    if (!name || !dob || isNaN(years) || !plan) {
        document.getElementById('result').innerHTML = '<p>Please fill in all fields correctly.</p>';
        return;
    }

    const age = calculateAge(dob);
    const premium = calculatePremium(age, years, plan);

    document.getElementById('result').innerHTML = `
        <table>
            <tr>
                <th>Name</th>
                <td>${name}</td>
            </tr>
            <tr>
                <th>Age</th>
                <td>${age}</td>
            </tr>
            <tr>
                <th>Years of Coverage</th>
                <td>${years}</td>
            </tr>
            <tr>
                <th>Type of Plan</th>
                <td>${plan.charAt(0).toUpperCase() + plan.slice(1)}</td>
            </tr>
            <tr>
                <th>Estimated Premium</th>
                <td>₹. ${premium.toFixed(2)}</td>
            </tr>
        </table>
    `;
}