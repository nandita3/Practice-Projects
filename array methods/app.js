const add_user = document.getElementById('add-user');
const double_money = document.getElementById('double-money');
const show_millionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculate_wealth = document.getElementById('calculate-wealth');
const main = document.getElementById('main');

let data = [];

//fetch random user
const getData = async () => {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    
    // console.log(data);

    const user = data.results[0];

    const newUser = {                                   //creating an object with name and money properties
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    // console.log(newUser);

    addData(newUser);

}

getData();
getData();
// getData();

//add new object to data array (so data array will become an array of objects)
const addData = (obj) => {
    data.push(obj);
    
    updateDOM();
}

// console.log(data); //gives an array of objects with just name and money properties


//update DOM

const updateDOM = (providedData = data) => {  //can take default value as data if no param is passed
//clear the  main div
main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${item.money}`;
    main.appendChild(element);

});

}

//Double money
const doubleMoney = () => {

    data = data.map((usr) => {
        return {name: usr.name, money: usr.money * 2};
    });

    updateDOM();

    console.log(data);

}


//I analyzed why the below way of using another variable for altered array didn't work 
// const doubleMoney = () => {

//     const doubledMoneyArr = data.map((usr) => {
//         return {name: usr.name, money: usr.money * 2};
//     });

    
//     updateDOM(doubledMoneyArr);

//     console.log(doubledMoneyArr);
//     // console.log(data);
// }


//console.log(data);


//Sort by richest
const sortMoney = () => {

    data.sort((a,b) => {
        // return a.money - b.money; //sorts in ascending order
        return b.money - a.money; //sorts in descending order 
    });

    updateDOM();
}

//Filter millionaires
const showMillionaires = () => {

    data = data.filter((amt) => {
        return amt.money > 1000000;
    });

    updateDOM();
}


//Calculate wealth
const calculateWealth = () => {

    const wealth = data.reduce((acc, user) => {
        return acc + user.money;
    }, 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total wealth : ${wealth}`;
    main.appendChild(wealthEl);
}


//Event listeners

add_user.addEventListener('click', getData);
double_money.addEventListener('click', doubleMoney);
sort.addEventListener('click', sortMoney);
show_millionaires.addEventListener('click', showMillionaires);
calculate_wealth.addEventListener('click', calculateWealth);

