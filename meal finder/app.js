const search = document.getElementById('search'),
submit = document.getElementById('submit'),
random = document.getElementById('random'),
mealsEl = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
single_mealEl = document.getElementById('single-meal');


//search meal and fetch from API
const searchMeal = (e) => {
    e.preventDefault();

    //clear single meal
    single_mealEl.innerHTML = '';

    //get search term
    const term = search.value;

    console.log(term);



    // The below API returns an object having a property called meals (data.meals) which is an array. That array again contains objects (each object represents a meal)

    //check for empty 
    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

            if(data.meals === null) {
                resultHeading.innerHTML = `<p>There are no results, try again</p>`;
            } else {
                mealsEl.innerHTML = data.meals.map(meal => {
                    `<div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class='meal-info' data-mealID="${meal.idMeal}">  
                    <h3>${meal.strMeal}</h3>

                    </div>
                    
                    </div>
                    `
                })
                .join(''); //to convert it into a string
            }
        });


        //clear search text
        search.value = "";  

    } else {
        alert('please enter a meal');
    }
}



//fetch meal by ID
const getMealById = (mealID) => {
    fetch('www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}')
    .then(res => res.json())
    .then(data => {
        console.log(data);

        const meal = data.meals[0];

        addMealToDom(meal);
    });
}


//Add recipe to DOM
const addMealToDom = () => {

}



//Event listeners

submit.addEventListener('submit', searchMeal);


mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        console.log(item);
        if(item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });

    console.log(mealInfo);
    
    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        console.log(mealID);
        getMealById(mealID);
    }
});