// forms.js
import { createInputField, createSubmitButton } from "./formElementFactory.js";
import cacheDOM from "./domUtils.js";

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
    "nameInput",
    "e.g., Samuel",
    true,
  );

  const lastNameInput = createInputField(
    "lastNameInputContainer",
    "Last Name: ",
    "text",
    "nameInput",
    "e.g., John",
    true,
  );

  const emailInput = createInputField(
    "emailInputContainer",
    "email: ",
    "email",
    "emailInput",
    "e.g., youremail@example.com",
    true,
  );

  const submitBtn = createSubmitButton("SubmitBtnContainer", "Submit");

  SignUpform.append(firstNameInput, lastNameInput, emailInput, submitBtn);
  formContainer.append(SignUpform);
}
