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



//fetch meal details by ID
const getMealById = (mealID) => {
    fetch('www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}')
    .then(res => res.json())
    .then(data => {
        console.log(data);

        const meal = data.meals[0];

        addMealToDom(meal);
    });
}

//Fetch Random meal
const getRandomMeal = () => {
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch('www.themealdb.com/api/json/v1/1/randomselection.php')
    .then(res => res.json())
    .then(data => {
        console.log(data);

        const meal = data.meals[0];

        addMealToDom(meal);
    })
}


//Add meal details to DOM
const addMealToDom = () => {
    const ingredients = [];

// Below we are creating an array of ingredients and their quantities in the format ingredient - quantity, max number of ingredients is 20 for any meal

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}



//Event listeners

submit.addEventListener('submit', searchMeal);

random.addEventListener('click', getRandomMeal);

// event listener to get hold of the mealID attribute (that is equal to idMeal) from the mealsEl element. That mealID will be passed in a function that will be used to fetch the meal details by ID (there is an API that gives meal details by its ID)
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