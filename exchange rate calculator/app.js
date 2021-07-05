const currencyElOne = document.getElementById('currency-one');
const amountElOne = document.getElementById('amount-one');
const currencyElTwo = document.getElementById('currency-two');
const amountElTwo = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swapEl = document.getElementById('swap');

//function to fetch exchange rate and update the DOM
const calculate = () => {
  fetch(`https://v6.exchangerate-api.com/v6/fed175f158659a5b13d35e1f/latest/${currencyElOne.value}`)    
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        const rate = data.conversion_rates[currencyElTwo.value]; //conversion_rates is received in the response    
        rateEl.innerText = `1 ${currencyElOne.value} = ${rate} ${currencyElTwo.value}`;

        amountElTwo.value = amountElOne.value * rate;
    }); 
}

//Event listeners
currencyElOne.addEventListener('change', calculate);
amountElOne.addEventListener('input', calculate);
currencyElTwo.addEventListener('change', calculate);
amountElTwo.addEventListener('input', calculate);

swapEl.addEventListener('click', () => {
    const temp = currencyElOne.value;
    currencyElOne.value = currencyElTwo.value;
    currencyElTwo.value = temp;
    calculate();
});

//runs the function on every page load
calculate();

