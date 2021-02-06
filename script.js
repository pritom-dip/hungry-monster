// submit user input data on clicking submit button
const submitUserInput = () => {
    const inputValue = document.getElementById("mealName").value;
    document.getElementById("ingrediendWrapper").style.display = "none";
    if (inputValue !== '') {
        document.getElementById("warningText").innerText = "";
        getAllMealsData(inputValue);
    } else {
        document.getElementById("warningText").innerText = "Please input value first and then submit.";
        document.getElementById("allMeals").innerText = "";
    }
}

// Fetch api data with input value
const getAllMealsData = inputValue => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(res => res.json())
        .then(data => displayMealsToUser(data.meals))
        .catch(err => {
            if (err) {
                const parentDiv = document.getElementById("allMeals");
                showingErrorMsgToUser(parentDiv, "Something went wrong. Please try again later");
            }
        });
};


// Display error message to user
const showingErrorMsgToUser = (parentDiv, message) => {
    const errorMsg = `
        <div class="me-4 mt-4">
            <span class="text-danger">${message}</span>
        </div>
    `;
    parentDiv.innerHTML += errorMsg;
}


// Display meals to user by searched value in parameter
const displayMealsToUser = meals => {
    const parentDiv = document.getElementById("allMeals");
    parentDiv.innerHTML = `<h3 class="mt-5 mb-2">Meals Lists:</h3>`;

    if (meals !== null) {
        meals.forEach(meal => {
            const childElement = `
            <div onclick=getSingleMealDetails('${meal.idMeal}') class="card me-4 mt-4" style="width: 16rem; padding: 0px;">
                <img src="${meal.strMealThumb}">
                <div class="card-body text-center">
                    <h5 class="card-title">${meal.strMeal}</h5>
                </div>
            </div>
        `;
            parentDiv.innerHTML += childElement;
        });
    } else {
        showingErrorMsgToUser(parentDiv, "There are no products with the searched input. Try another one.");
    }
};

// Fetching single meals details information by id

const getSingleMealDetails = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => displaySingleMealData(data.meals[0]))
        .catch(error => {
            const parentDiv = document.getElementById("ingrediendWrapper");
            showingErrorMsgToUser(parentDiv, "There are no products with the searched input. Try another one.");
        });
};

// Display single meal data to all user

const displaySingleMealData = meal => {
    const ingredientParentDiv = document.getElementById("ingrediendWrapper");
    const ingredientImg = document.getElementById("ingredientImage");
    ingredientImg.setAttribute("src", meal.strMealThumb);

    const ingredientList = document.getElementById("ingredientList");
    for (let i = 1; i <= 20; i++) {
        const listItem = `strIngredient${i}`;

        if (meal[listItem] != "") {
            const li = document.createElement("li");
            li.innerText = meal[listItem];
            li.className = "list-group-item";
            ingredientList.appendChild(li);
        }
    }
    ingredientParentDiv.style.display = "block";
}