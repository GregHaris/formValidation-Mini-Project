import { countries } from "./countriesObject.js";

export default function createPhoneNumInput() {
  const phoneNumberInputContainer = document.querySelector(
    "#phoneNumberInputContainer",
  );
  const selectBox = phoneNumberInputContainer.querySelector("#options");
  const searchBox = phoneNumberInputContainer.querySelector("#searchBox");
  const inputBox = phoneNumberInputContainer.querySelector("input[type='tel']");
  const selectedOption = phoneNumberInputContainer.querySelector(
    "#selectedOption div",
  );

  selectedOption.addEventListener("click", () => {
    inputBox.value = "";
    showOptions();
  });

  searchBox.addEventListener("input", searchCountry);
  inputBox.addEventListener("click", showOptions);
  inputBox.addEventListener("input", searchCountryCode);

  function createInputOptions() {
    const fragment = document.createDocumentFragment();
    for (const country of countries) {
      const option = document.createElement("li");
      option.className = "option";
      option.innerHTML = `
        <div>
          <span class="country-name">${country.name}</span>
        </div>
        <strong class="country-code">+${country.phone}</strong>
      `;
      option.addEventListener("click", selectOption);
      fragment.appendChild(option);
    }
    selectBox.querySelector("ol").appendChild(fragment);
  }
  createInputOptions();

  function selectOption() {
    const phoneCode = this.querySelector("strong").cloneNode(true);
    selectedOption.innerHTML = "";
    selectedOption.appendChild(phoneCode);
    inputBox.value = phoneCode.innerText;
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
    const searchQuery = searchBox.value.toLowerCase();
    Array.from(selectBox.querySelectorAll(".option")).forEach((option) => {
      const isMatched = option
        .querySelector(".country-name")
        .innerText.toLowerCase()
        .includes(searchQuery);
      option.classList.toggle("hide", !isMatched);
    });
    showOptions();
  }

  function clearSearchBox() {
    searchBox.value = "";
  }

  function removeClassHide() {
    searchBox
      .querySelectorAll(".hide")
      .forEach((el) => el.classList.remove("hide"));
  }

  function searchCountryCode() {
    const inputValue = inputBox.value;
    const countryCode = inputValue.length <= 4 ? inputValue : "";

    Array.from(selectBox.querySelectorAll(".option")).forEach((option) => {
      const isMatched = option
        .querySelector(".country-code")
        .innerText.includes(countryCode);
      option.classList.toggle("hide", !isMatched);
    });

    if (inputValue.length > 4) {
      hideOptions();
    } else if (inputValue.length < 4) {
      removeClassHide();
    }
  }
}
