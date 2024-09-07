// forms.js
import {
  createInputField,
  createSubmitButton,
  createPhoneNumInputField,
  createCountryNameInputField,
} from "./formElementFactory.js";
import cacheDOM from "./domUtils.js";

import createPhoneNumInput from "./phoneNumberInput.js";
import createCountryInput from "./countryInput.js";

export default function createSignUpForm() {
  const { formContainer } = cacheDOM();

  const SignUpform = document.createElement("form");
  SignUpform.noValidate = true;

  SignUpform.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const firstNameInput = createInputField(
    "firstNameInputContainer",
    "First Name: ",
    "text",
    "firstNameInput",
    "e.g., Samuel",
    true,
  );

  const lastNameInput = createInputField(
    "lastNameInputContainer",
    "Last Name: ",
    "text",
    "lastNameInput",
    "e.g., John",
    true,
  );

  const emailInput = createInputField(
    "emailInputContainer",
    "Email: ",
    "email",
    "emailInput",
    "e.g., youremail@example.com",
    true,
  );

  const zipcodeInput = createInputField(
    "zipcodeInputContainer",
    "Zipcode: ",
    "zipcode",
    "zipcodeInput",
    "e.g., 12304",
    true,
  );

  const passwordInput = createInputField(
    "passwordInputContainer",
    "Password: ",
    "password",
    "passwordInput",
    "enter your password. mininimum of 8",
    true,
  );

  const confirmPasswordInput = createInputField(
    "confirmPasswordInputContainer",
    "Confirm Password: ",
    "confirmPassword",
    "confirmPasswordInput",
    "confirm your password",
    true,
  );

  const phoneNumberInput = createPhoneNumInputField(
    "phoneNumberInputContainer",
  );

  const countryInput = createCountryNameInputField("countryInputContainer");

  const submitBtn = createSubmitButton("SubmitBtnContainer", "Submit");

  SignUpform.append(
    firstNameInput,
    lastNameInput,
    emailInput,
    phoneNumberInput,
    countryInput,
    zipcodeInput,
    passwordInput,
    confirmPasswordInput,
    submitBtn,
  );

  formContainer.append(SignUpform);

  createPhoneNumInput();
  createCountryInput();
}
