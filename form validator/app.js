const form = document.querySelector('.form');

const username = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('confirm-password');


//Functions
//Show error
const showError = (input, message) => {
    input.parentElement.classList.add('error');
    const small = input.parentElement.querySelector('small');
    small.innerText = message;
}

const showSuccess = (input) => {
    input.parentElement.classList.add('success');
}

//check Email format
const isValidEmail = (input) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

//check required fields
const checkRequired = (inputArray) => {
    inputArray.forEach((input) => {
        if(input.value.trim() === '') {
            showError(input, `${input.id} is required`);
        } else {
            showSuccess(input);
        }
    });
}


//check input length
const checkLength = (input, min, max) => {
    if(input.value.length < min) {
        showError(input, `${input.id} should be at least ${min} characters long`);
    } else if(input.value.length > max) {
        showError(input, `${input.id} should not exceed ${max} characters`);
    } else {
        showSuccess(input);
    }
}


//check passwords match
const checkPasswordsMatch = (input1, input2) => {
    if(input1.value != input2.value) {
        showError(input2, "Passwords do not match");
    }
}

//Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //console.log('submit');
    //console.log(username.value);

    //Putting the below steps in functions as the same needs to be done for all the fields
    // if(username.value === '') {
    //     username.parentElement.classList.add('error');
    //     small.innerText = 'Username is required';
    // } else {
    //     username.parentElement.classList.add('success');
    // }

    //Below way of using ifs is not scalable so we will use a function instead
    // if(username.value === '') {
    //     showError(username, "Username is required");
    // } 
    // else {
    //     showSuccess(username);
    // }

    // if(email.value === '') {
    //     showError(email, "Email is required");
    // } else if(!isValidEmail(email.value)) {
    //     showError(email, "Email is invalid");
    // } 
    // else {
    //     showSuccess(email);
    // }

    // if(password.value === '') {
    //     showError(password, "Password is required");
    // } else {
    //     showSuccess(password);
    // }

    // if(password2.value === '') {
    //     showError(password2, "Confirm Password");
    // } else {
    //     showSuccess(password2);
    // }

    checkRequired([username, email, password, password2]);

    checkLength(username, 3, 15);
    checkLength(password, 6, 15);
    isValidEmail(email);
    checkPasswordsMatch(password, password2);

});

