export class Api {
  constructor() {
    this.baseUrl = `https://www.themealdb.com/api/json/v1/1/`;
  }

  //Methods:
  // method to handel all the fetch
  async fetchData(endPoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`);
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      let result = await response.json();

      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  // meal by name
  async fetchMealByName(name) {
    return this.fetchData(`search.php?s=${name}`);
  }
  // meal by first letter
  async fetchMealByFirstLetter(letter) {
    return this.fetchData(`search.php?f=${letter}`);
  }
  // Detail by id
  async fetchMealDetail(mealId) {
    return this.fetchData(`lookup.php?i=${mealId}`);
  }

  // list all Catagories

  async fetchCatagories() {
    return this.fetchData("categories.php");
  }
  // list all area
  async fetchArea() {
    return this.fetchData("list.php?a=list");
  }
  // list all ingredients
  async fetchIngredients() {
    return this.fetchData("list.php?i=list");
  }
  //filter by catagory
  async fetchMealsByCategory(category) {
    return this.fetchData(`filter.php?c=${category}`);
  }
  //filter by area
  async fetchMealsByArea(area) {
    return this.fetchData(`filter.php?a=${area}`);
  }
  //filter by ingredient
  async fetchMealsByIngredient(ingredient) {
    return this.fetchData(`filter.php?i=${ingredient}`);
  }
  // single random meal
  async fetchMealRandom() {
    return this.fetchData("random.php");
  }
  async fetchMeals() {
    return this.fetchData("search.php?s");
  }
}
