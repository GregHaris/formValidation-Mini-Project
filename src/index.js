import "./style.css";
import "iconify-icon";

import createSignUpForm from "./form.js";
import { countries } from "./countriesObject.js";

createSignUpForm();

const phoneNumInput = document.querySelector("#selectBox");

const selectBox = phoneNumInput.querySelector("#options");
const searchBox = phoneNumInput.querySelector("#searchBox");
const inputBox = phoneNumInput.querySelector("input[type='tel']");
const selectedOption = phoneNumInput.querySelector("#selectedOption div");

selectedOption.addEventListener("click", () => {
  inputBox.value = "";
  showOptions();
});

searchBox.addEventListener("input", searchCountry);

function createInputOptions() {
  for (const country of countries) {
    const option = ` 
      <li class="option">
        <div>
          <iconify-icon icon="flag:${country.code.toLowerCase()}-4x3"></iconify-icon>
          <span class="country-name">${country.name}</span>
        </div>
        <strong>+${country.phone}</strong>
      </li> `;

    selectBox.querySelector("ol").insertAdjacentHTML("beforeend", option);
  }
}
createInputOptions();

let inputOptions = phoneNumInput.querySelectorAll(".option");

inputOptions.forEach((option) => {
  option.addEventListener("click", selectOption);
});

function selectOption() {
  const icon = this.querySelector("iconify-icon").cloneNode(true);
  const phoneCode = this.querySelector("strong").cloneNode(true);

  selectedOption.innerHTML = "";
  selectedOption.append(icon, phoneCode);

  inputBox.value = `${phoneCode.innerText}-`;
  hideOptions();
  clearSearchBox();
  removeClassHide();
}

function showOptions() {
  selectBox.classList.toggle("active");
  selectedOption.classList.toggle("active");
}

function hideOptions() {
  selectBox.classList.remove("active");
  selectedOption.classList.remove("active");
}

function searchCountry() {
  let searchQuery = searchBox.value.toLowerCase();
  for (const inputOption of inputOptions) {
    let isMatched = inputOption
      .querySelector(".country-name")
      .innerText.toLowerCase()
      .includes(searchQuery);
    inputOption.classList.toggle("hide", !isMatched);
  }
}

function clearSearchBox() {
  searchBox.value = "";
}

function removeClassHide() {
  searchBox
    .querySelectorAll(".hide")
    .forEach((el) => el.classList.remove("hide"));
}
