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
    const fragment = document.createDocumentFragment();
    for (const country of countries) {
      const option = document.createElement("li");
      option.className = "option";
      option.innerHTML = `
        <div>
          <iconify-icon icon="flag:${country.code.toLowerCase()}-4x3"></iconify-icon>
          <span class="country-name">${country.name}</span>
        </div>
      `;
      option.addEventListener("click", selectOption);
      fragment.appendChild(option);
    }
    selectBox.querySelector("ol").appendChild(fragment);
  }
  createInputOptions();

  const inputOptions = Array.from(
    countryInputContainer.querySelectorAll(".option"),
  );

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
  }

  function removeClassHide() {
    countryOptions
      .querySelectorAll(".hide")
      .forEach((el) => el.classList.remove("hide"));
  }

  function handleFlagUpdate(searchQuery) {
    const matchedOption = findMatchedOption(searchQuery);

    if (matchedOption) {
      const icon = matchedOption.querySelector("iconify-icon").cloneNode(true);
      selectedCountry.innerHTML = "";
      selectedCountry.appendChild(icon);
      hideOptions();
    }
  }

  inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const searchQuery = inputBox.value.toLowerCase();
      handleFlagUpdate(searchQuery);
    }
  });

  inputBox.addEventListener("blur", () => {
    const searchQuery = inputBox.value.toLowerCase();
    handleFlagUpdate(searchQuery);
  });

  function findMatchedOption(searchQuery) {
    return (
      inputOptions.find(
        (inputOption) =>
          inputOption.querySelector(".country-name").innerText.toLowerCase() ===
          searchQuery,
      ) || null
    );
  }
}
