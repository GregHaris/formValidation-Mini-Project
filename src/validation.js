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

  inputFields.forEach((inputField) => {
    if (inputField.required === true && inputField.validity.valueMissing) {
      toggleIsInvalid(inputField);
      clearErrorMessage();
      showErrorMessage();
    }
    if (inputField.type === "email" && inputField.validity.typeMismatch) {
      toggleIsInvalid(inputField);
      inputField.value = "";
      inputField.placeholder = "please enter a valid email address";
    }
    if (inputField.type === "tel") {
      if (
        inputField.validity.typeMismatch &&
        inputField.value.startsWith("+")
      ) {
        toggleIsInvalid(inputField);
        inputField.value = "";
        inputField.placeholder = "Invalid Phone Number.";
      }
    }
  });
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
