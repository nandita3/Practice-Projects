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
    //console.log(data);

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    //console.log(newUser);
    addData(newUser);

}

getData();
getData();
getData();

//add new object to data arr
const addData = (obj) => {
    data.push(obj);
    
    updateDOM();
}

//console.log(data);


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


//Event listeners

add_user.addEventListener('click', getData);