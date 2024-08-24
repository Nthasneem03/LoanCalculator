document.getElementById('loan_form').addEventListener('submit',function(e){
    e.preventDefault();
    document.getElementById('results').style.display='none';
    document.getElementById('loading').style.display='block';
    setTimeout(calculate,500);
});

function calculate(){

    const amount=document.getElementById('loan_amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthly_payment = document.getElementById('monthly_payment');
    const total_interest = document.getElementById('total_interest');
    const total_payment = document.getElementById('total_payment');

    // console.log(amount);     gets element
    // console.log(amount.value); gets value as string
    // console.log(parseFloat(amount.value)); gets value as number


    // Parse input values
    const principal = parseFloat(amount.value);
    const annualInterestRate = parseFloat(interest.value);
    const loanTermYears = parseFloat(years.value);


    // Calculate monthly interest rate and number of payments
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;


    // Calculate monthly payment
    const x = Math.pow(1 + monthlyInterestRate, numberOfPayments)
    const monthlyPay = (principal * monthlyInterestRate * x ) / (x-1);
    
    if (isFinite(monthlyPay)) {

        // Calculate total amount paid and total interest
        const totalAmount = monthlyPay * numberOfPayments;
        const totalInterest = totalAmount - principal;

        // Update the calculated values
        monthly_payment.value = monthlyPay.toFixed(2);
        total_payment.value = totalAmount.toFixed(2);
        total_interest.value = totalInterest.toFixed(2);

        document.getElementById('results').style.display='block';
        document.getElementById('loading').style.display='none';

    }
    else {
        document.getElementById('loading').style.display='none';
        showAlert('Please fill out all fields correctly')
    }

    function showAlert(error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger col-md-4';
        errorDiv.appendChild(document.createTextNode(error));

        const card = document.querySelector('.card');
        const heading = document.querySelector('h1')

        card.insertBefore(errorDiv,heading);

        // Clear error after 3 seconds
        setTimeout(()=> document.querySelector('.alert').remove(),3000);
        
    }
    
}