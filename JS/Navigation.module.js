import { Ui } from "./UI.module.js";

export class Navigation {
  constructor() {
    //select DOM elements
    this.sideNav = $(".side-nav-menu");
    this.icon = $(".open-close-icon");
    this.links = $(".links li");
    this.boxWidth = $(".side-nav-menu .nav-tab").outerWidth(true);
    // the original set up
    this.closeSideNav();
    this.icon.on("click", () => {
      this.toggleNav();
    });
    //ui
    this.ui = new Ui();
    this.siteStarter();
    this.initializeNavLinks();
  }

  //Methods

  // open nav

  openSideNav() {
    // in the open nav we need to do 3 tasks
    //1- show the side nav
    this.sideNav.animate({ left: 0 }, 500);
    //2-chande the icon to x
    this.icon.removeClass("fa-align-justify").addClass("fa-x");
    //3- animate the links to the top
    this.links.each((index, link) => {
      $(link).animate({ top: 0 }, (index + 5) * 100);
    });
  }

  // close nav

  closeSideNav() {
    //in the close we need to do three tasks :
    // 1- hide the side nav
    this.sideNav.animate({ left: -this.boxWidth }, 500);
    //2- change the icon from x to the align ustify icon
    this.icon.removeClass("fa-x").addClass("fa-align-justify");
    //3- animate the links back to the bottom
    this.links.animate({ top: 300 }, 500);
  }

  // toggle nav

  toggleNav() {
    if (this.sideNav.css("left") == "0px") {
      this.closeSideNav();
    } else {
      this.openSideNav();
    }
  }
  //initialize nav links
  initializeNavLinks() {
    $("#categories").on("click", async () => {
      this.ui.clearSearchInputs();
      this.closeSideNav();
      this.ui.showLoading();
      const result = await this.ui.uiApi.fetchCatagories();
      this.ui.displayCatagories(result.categories);
      this.ui.hideLoading();
    });

    $("#areas").on("click", async () => {
      this.ui.clearSearchInputs();
      this.closeSideNav();
      this.ui.showLoading();
      const result = await this.ui.uiApi.fetchArea();
      this.ui.displayArea(result.meals);
      this.ui.hideLoading();
    });

    $("#Ingredients").on("click", async () => {
      this.ui.clearSearchInputs();
      this.closeSideNav();
      this.ui.showLoading();
      const result = await this.ui.uiApi.fetchIngredients();
      this.ui.displayIngredients(result.meals);
      this.ui.hideLoading();
    });

    $("#search").on("click", () => {
      this.closeSideNav();
      this.ui.clearSearchInputs();
      this.ui.showLoading();
      this.ui.showSearchInputs();
      this.ui.hideLoading();
    });
    $("#contact").on("click", () => {
      this.closeSideNav();
      this.ui.clearSearchInputs();
      this.ui.showLoading();
      this.ui.showContactForm();
      this.ui.hideLoading();
    });
  }
  //opening
  async siteStarter() {
    this.ui.showLoading();
    const result = await this.ui.uiApi.fetchMeals();
    this.ui.displayMeals(result.meals);
    this.ui.hideLoading();
  }
}
