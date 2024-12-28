import { Validation } from "./Validation.module.js";
import { Api } from "./API.module.js";
export class Ui {
  constructor() {
    this.rowData = $("#rowData");
    this.searchContainer = $("#searchContainer");
    this.loading = $(".loading");
    this.innerLoading = $(".innerLoading");
    this.searchContainer = $("#searchContainer");
    this.uiApi = new Api();

    //the original setup
    this.hideLoading();
    this.hideInnerLoading();
  }

  //Methods
  //manipulating the loading screens
  //- show and hide the main loading screen
  showLoading() {
    this.loading.removeClass("d-none");
  }
  hideLoading() {
    this.loading.addClass("d-none");
  }
  showInnerLoading() {
    this.innerLoading.removeClass("d-none");
  }
  hideInnerLoading() {
    this.innerLoading.addClass("d-none");
  }
  //************************************ */
  //display the details
  displayMealDetails(meal) {
    this.rowData.html("");
    let ingredients = this.getIngredientsList(meal);
    let tags = meal.strTags
      ? meal.strTags
          .split(",")
          .map((tag) => `<li class="alert alert-info m-2 p-1">${tag}</li>`)
          .join("")
      : "";

    let content = `
      <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2>${meal.strMeal}</h2>
      </div>
      <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area: </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category: </span>${meal.strCategory}</h3>
        <h3>Recipes:</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
          ${ingredients}
        </ul>
        <h3>Tags:</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
          ${tags}
        </ul>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
      </div>
    `;
    this.rowData.html(content);
  }

  getIngredientsList(meal) {
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients += `<li class="alert alert-info m-2 p-1">${
          meal[`strMeasure${i}`]
        } ${meal[`strIngredient${i}`]}</li>`;
      }
    }
    return ingredients;
  }
  //------------------------------------------

  // displaying data from api
  displayMeals(meals) {
    this.rowData.html("");
    let content = " ";
    meals.forEach((meal) => {
      content += `
       <div class="col-md-3 ">
          <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer " data-id="${meal.idMeal}">
            <img class="w-100" src="${meal.strMealThumb}" alt="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        </div>
      `;
    });
    this.rowData.html(content);
    $(".meal").on("click", async (event) => {
      let mealId = $(event.currentTarget).attr("data-id");
      console.log(mealId);
      this.showInnerLoading();
      const result = await this.uiApi.fetchMealDetail(mealId);
      console.log(result);
      this.displayMealDetails(result.meals[0]);
      this.hideInnerLoading();
    });
  }
  // catagories button
  displayCatagories(catagories) {
    this.rowData.html("");
    let content = " ";
    catagories.forEach((element) => {
      content += `
      <div class="col-md-3">
          <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${element.strCategoryThumb}" alt="">
            <div class="meal-layer position-absolute text-center text-black p-2">
              <h3>${element.strCategory}</h3>
              <p>${element.strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
            </div>
          </div>
        </div>
      `;
    });

    this.rowData.html(content);

    $(".meal").on("click", async (event) => {
      const categoryName = $(event.currentTarget).find("h3").text();
      const result = await this.uiApi.fetchMealsByCategory(categoryName);
      this.displayMeals(result.meals);
    });
  }
  //area button
  displayArea(areas) {
    this.rowData.html("");
    let content = " ";
    areas.forEach((element) => {
      content += ` <div class="col-md-3">
          <div  class="rounded-2 text-center cursor-pointer area">
                    <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                    <h3 class="text-white" >${element.strArea}</h3>
                </div>
            </div>`;
    });
    this.rowData.html(content);
    $(".area").on("click", async (event) => {
      const areaName = $(event.currentTarget).find("h3").text();
      const result = await this.uiApi.fetchMealsByArea(areaName);

      this.displayMeals(result.meals);
    });
  }
  // ingredients button
  displayIngredients(Ingredients) {
    this.rowData.html("");
    let content = "";
    Ingredients.forEach((element) => {
      let description =
        element.strDescription !== null
          ? element.strDescription.split(" ").slice(0, 20).join(" ")
          : " ";
      content += `
<div class="col-md-3 text-white">
                <div  class="rounded-2 text-center cursor-pointer Ingredient">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${element.strIngredient}</h3>
                        <p>${description}</p>
                </div>
        </div>

       `;
    });
    this.rowData.html(content);
    $(".Ingredient").on("click", async (event) => {
      const IngredientName = $(event.currentTarget).find("h3").text();
      const result = await this.uiApi.fetchMealsByIngredient(IngredientName);

      this.displayMeals(result.meals);
    });
  }
  //-----------------------------------------
  //search
  showSearchInputs() {
    this.searchContainer.html(
      `
      <div class="row py-4 ">
        <div class="col-md-6 ">
            <input id="searchByName"  class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input id="searchByLetter"  maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    );
    this.rowData.html("");

    $("#searchByName").on("input", async (event) => {
      console.log(12333);
      const query = event.target.value.trim();
      if (query) {
        this.showInnerLoading();
        const result = await this.uiApi.fetchMealByName(query);
        console.log(result);
        if (result.meals) {
          this.displayMeals(result.meals);
        } else {
          this.rowData.html("<p>No results found.</p>");
        }
        this.hideInnerLoading();
      } else {
        this.rowData.html(""); // Clear the results if input is empty
      }
    });
    $("#searchByLetter").on("input", async (event) => {
      const query = event.target.value.trim();
      if (query) {
        this.showInnerLoading();
        const result = await this.uiApi.fetchMealByFirstLetter(query);
        if (result.meals) {
          this.displayMeals(result.meals);
        } else {
          this.rowData.html("<p>No results found.</p>");
        }
        this.hideInnerLoading();
      } else {
        this.rowData.html("");
      }
    });
  }
  clearSearchInputs() {
    this.searchContainer.html("");
  }
  //----------------------------------------------
  // contact us
  showContactForm() {
    this.searchContainer.html(`
      <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
          <div class="row g-4">
            <div class="col-md-6">
              <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                Special characters and numbers not allowed
              </div>
            </div>
            <div class="col-md-6">
              <input id="emailInput" type="email" class="form-control" placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                Email not valid *example@yyy.zzz
              </div>
            </div>
            <div class="col-md-6">
              <input id="phoneInput"  type="text" class="form-control" placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid Phone Number
              </div>
            </div>
            <div class="col-md-6">
              <input id="ageInput" type="number" class="form-control" placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid age
              </div>
            </div>
            <div class="col-md-6">
              <input id="passwordInput"  type="password" class="form-control" placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
            </div>
            <div class="col-md-6">
              <input id="repasswordInput" type="password" class="form-control" placeholder="Re-enter Your Password">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Passwords do not match
              </div>
            </div>
          </div>
          <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
      </div>
    `);
    this.validator = new Validation();

    this.rowData.html("");
  }
}
