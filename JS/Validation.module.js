export class Validation {
  constructor() {
    // Initialize jQuery selectors for inputs and alerts
    this.nameInput = $("#nameInput");
    this.emailInput = $("#emailInput");
    this.phoneInput = $("#phoneInput");
    this.ageInput = $("#ageInput");
    this.passwordInput = $("#passwordInput");
    this.repasswordInput = $("#repasswordInput");
    // Alerts
    this.nameAlert = $("#nameAlert");
    this.emailAlert = $("#emailAlert");
    this.phoneAlert = $("#phoneAlert");
    this.ageAlert = $("#ageAlert");
    this.passwordAlert = $("#passwordAlert");
    this.repasswordAlert = $("#repasswordAlert");
    // Button
    this.submitBtn = $("#submitBtn");
    // Flags
    this.nameTouched = false;
    this.emailTouched = false;
    this.phoneTouched = false;
    this.ageTouched = false;
    this.passwordTouched = false;
    this.repasswordTouched = false;

    this.initializeEvents();
    this.submitBtn.attr("disabled", true);
  }

  initializeEvents() {
    this.nameInput.on("input", () => (this.nameInputFocused = true));
    this.emailInput.on("input", () => (this.emailInputFocused = true));
    this.phoneInput.on("input", () => (this.phoneInputFocused = true));
    this.ageInput.on("input", () => (this.ageInputFocused = true));
    this.passwordInput.on("input", () => (this.passwordInputFocused = true));
    this.repasswordInput.on(
      "input",
      () => (this.repasswordInputFocused = true)
    );

    this.nameInput.on("keyup", () => this.validateInputs());
    this.emailInput.on("keyup", () => this.validateInputs());
    this.phoneInput.on("keyup", () => this.validateInputs());
    this.ageInput.on("keyup", () => this.validateInputs());
    this.passwordInput.on("keyup", () => this.validateInputs());
    this.repasswordInput.on("keyup", () => this.validateInputs());
  }
  //
  validateInputs() {
    if (this.nameInputFocused) {
      this.toggleAlert(this.nameAlert, this.validateName());
    }

    if (this.emailInputFocused) {
      this.toggleAlert(this.emailAlert, this.validateEmail());
    }

    if (this.phoneInputFocused) {
      this.toggleAlert(this.phoneAlert, this.validatePhone());
    }

    if (this.ageInputFocused) {
      this.toggleAlert(this.ageAlert, this.validateAge());
    }

    if (this.passwordInputFocused) {
      this.toggleAlert(this.passwordAlert, this.validatePassword());
    }

    if (this.repasswordInputFocused) {
      this.toggleAlert(this.repasswordAlert, this.validateRepassword());
    }

    // Check if form is valid
    if (
      this.validateName() &&
      this.validateEmail() &&
      this.validatePhone() &&
      this.validateAge() &&
      this.validatePassword() &&
      this.validateRepassword()
    ) {
      this.submitBtn.removeAttr("disabled");
    } else {
      this.submitBtn.attr("disabled", true);
    }
  }

  // Validation methods for each input field
  validateName() {
    return /^[a-zA-Z\s]+$/.test(this.nameInput.val());
  }

  validateEmail() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      this.emailInput.val()
    );
  }

  validatePhone() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
      this.phoneInput.val()
    );
  }

  validateAge() {
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(this.ageInput.val());
  }

  validatePassword() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
      this.passwordInput.val()
    );
  }

  validateRepassword() {
    return this.repasswordInput.val() === this.passwordInput.val();
  }

  // Toggle alert visibility based on validity
  toggleAlert(alert, isValid) {
    alert.toggleClass("d-none", isValid);
  }
}
