import { countries } from "./countriesObject.js";

export default function createCountryInput() {
  const countryInputContainer = document.querySelector(
    "#countryInputContainer",
  );
  const selectBox = countryInputContainer.querySelector("#countryOptions");
  const inputBox = countryInputContainer.querySelector("input[type='text']");
  const selectedCountry = countryInputContainer.querySelector(
    "#selectedCountry div",
  );
  const countryOptions = countryInputContainer.querySelector("#countryOptions");

  selectedCountry.addEventListener("click", () => {
    inputBox.value = "";
    showOptions();
  });

  function createInputOptions() {
    for (const country of countries) {
      const option = ` 
      <li class="option">
        <div>
          <iconify-icon icon="flag:${country.code.toLowerCase()}-4x3"></iconify-icon>
          <span class="country-name">${country.name}</span>
        </div>
      </li> `;

      selectBox.querySelector("ol").insertAdjacentHTML("beforeend", option);
    }
  }
  createInputOptions();

  let inputOptions = countryInputContainer.querySelectorAll(".option");

  inputOptions.forEach((option) => {
    option.addEventListener("click", selectOption);
  });

  function selectOption() {
    const icon = this.querySelector("iconify-icon").cloneNode(true);
    const country = this.querySelector(".country-name").cloneNode(true);

    selectedCountry.innerHTML = "";
    selectedCountry.appendChild(icon);

    inputBox.value = country.innerText;
    hideOptions();
    removeClassHide();
  }

  inputBox.addEventListener("click", () => {
    showOptions();
    searchCountry();
  });

  inputBox.addEventListener("focus", searchCountry);
  inputBox.addEventListener("input", searchCountry);

  function showOptions() {
    selectBox.classList.toggle("active");
    selectedCountry.classList.toggle("active");
  }

  function hideOptions() {
    selectBox.classList.remove("active");
    selectedCountry.classList.remove("active");
  }

  function searchCountry() {
    const searchQuery = inputBox.value.toLowerCase();
    inputOptions.forEach((inputOption) => {
      const isMatched = inputOption
        .querySelector(".country-name")
        .innerText.toLowerCase()
        .includes(searchQuery);

      inputOption.classList.toggle("hide", !isMatched);
    });
    showOptions();
  }

  function removeClassHide() {
    countryOptions
      .querySelectorAll(".hide")
      .forEach((el) => el.classList.remove("hide"));
  }

  // Common function to handle flag update
  function handleFlagUpdate(searchQuery) {
    const matchedOption = findMatchedOption(searchQuery);

    if (matchedOption) {
      const icon = matchedOption.querySelector("iconify-icon").cloneNode(true);
      selectedCountry.innerHTML = "";
      selectedCountry.appendChild(icon);
      hideOptions();
    }
  }

  // Event listener for Enter key
  inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const searchQuery = inputBox.value.toLowerCase();
      handleFlagUpdate(searchQuery);
    }
  });

  // Event listener for input losing focus
  inputBox.addEventListener("blur", () => {
    const searchQuery = inputBox.value.toLowerCase();
    handleFlagUpdate(searchQuery);
  });

  function findMatchedOption(searchQuery) {
    for (const inputOption of inputOptions) {
      if (
        inputOption.querySelector(".country-name").innerText.toLowerCase() ===
        searchQuery
      ) {
        return inputOption;
      }
    }
    return null;
  }
}
