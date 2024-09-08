import createSignUpForm from "./form";

const { signUpform } = createSignUpForm();
const errorMessage = signUpform.querySelector("#errorMessage");

export default function formValidation() {
  signUpform.addEventListener("submit", (e) => {
    e.preventDefault();
    validate();
  });
}

function validate() {
  const inputFields = Array.from(signUpform.querySelectorAll("input")).filter(
    (input) => input.id !== "searchBox",
  );
  let password;
  // Flag to track overall form validity
  let isValid = true;

  inputFields.forEach((inputField) => {
    if (inputField.required && inputField.validity.valueMissing) {
      toggleIsInvalid(inputField);
      clearErrorMessage();
      showErrorMessage();
      isValid = false;
    }
    if (inputField.type === "email" && inputField.validity.typeMismatch) {
      toggleIsInvalid(inputField);
      inputField.value = "";
      inputField.placeholder = "please enter a valid email address";
      isValid = false;
    }
    if (inputField.type === "tel") {
      if (
        inputField.validity.typeMismatch &&
        inputField.value.startsWith("+")
      ) {
        toggleIsInvalid(inputField);
        inputField.value = "";
        inputField.placeholder = "Invalid Phone Number.";
        isValid = false;
      }
    }
    if (inputField.name === "passwordInput") {
      password = inputField.value;
      if (!validatePassword(inputField.value) && inputField.value !== "") {
        toggleIsInvalid(inputField);
        inputField.value = "";
        alert(
          "Invalid password. Must be at least 8 characters with a mix of upper/lowercase, numbers, and symbols.",
        );
        isValid = false;
      }
    }
    if (inputField.name === "confirmPasswordInput") {
      if (inputField.value !== password) {
        alert("Password mismatch");
        isValid = false;
      }
    }
  });

  if (isValid) {
    alert("Congratulations. We will get in touch with you");
    signUpform.submit();
  }
}

function showErrorMessage() {
  errorMessage.classList.toggle("active");
}

function clearErrorMessage() {
  errorMessage.classList.remove("active");
}

function toggleIsInvalid(inputField) {
  inputField.classList.toggle("isInvalid");
}

function validatePassword(password) {
  // Regular expression to check for at least one uppercase letter, one lowercase letter, one digit, and one symbol
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Test the password against the regular expression
  return passwordRegex.test(password);
}
