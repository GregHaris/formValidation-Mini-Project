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

  inputBox.addEventListener("click", showOptions);
  inputBox.addEventListener("input", searchCountryCode);
  inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchCountryCode();
    }
  });
  searchBox.addEventListener("input", searchCountry);
  searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      assignCountryCodeFromSearch();
    }
  });

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
    updateSelectedOption(phoneCode);
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
    filterOptions(searchQuery, ".country-name");
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

    filterOptions(countryCode, ".country-code");

    if (inputValue.length > 4) {
      hideOptions();
    } else if (inputValue.length < 4) {
      removeClassHide();
    }

    assignMatchedCountryCode(countryCode);
  }

  function assignCountryCodeFromSearch() {
    const searchQuery = searchBox.value.toLowerCase();
    const matchedOption = findMatchedOption(searchQuery, ".country-name");

    if (matchedOption) {
      const phoneCode = matchedOption.querySelector("strong").cloneNode(true);
      updateSelectedOption(phoneCode);
      hideOptions();
      clearSearchBox();
      removeClassHide();
    }
  }

  function filterOptions(query, selector) {
    Array.from(selectBox.querySelectorAll(".option")).forEach((option) => {
      const isMatched = option
        .querySelector(selector)
        .innerText.toLowerCase()
        .includes(query);
      option.classList.toggle("hide", !isMatched);
    });
  }

  function findMatchedOption(query, selector) {
    return Array.from(selectBox.querySelectorAll(".option")).find(
      (option) =>
        option.querySelector(selector).innerText.toLowerCase() === query,
    );
  }

  function assignMatchedCountryCode(countryCode) {
    const matchedOption = findMatchedOption(`+${countryCode}`, ".country-code");

    if (matchedOption) {
      const phoneCode = matchedOption.querySelector("strong").cloneNode(true);
      updateSelectedOption(phoneCode);
      hideOptions();
      clearSearchBox();
      removeClassHide();
    }
  }

  function updateSelectedOption(phoneCode) {
    selectedOption.innerHTML = "";
    selectedOption.appendChild(phoneCode);
    inputBox.value = phoneCode.innerText;
    inputBox.focus();
  }
}
