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
    for (const country of countries) {
      const option = ` 
      <li class="option">
        <div>
          <span class="country-name">${country.name}</span>
        </div>
        <strong class="country-code">+${country.phone}</strong>
      </li> `;

      selectBox.querySelector("ol").insertAdjacentHTML("beforeend", option);
    }
  }
  createInputOptions();

  let inputOptions = phoneNumberInputContainer.querySelectorAll(".option");

  inputOptions.forEach((option) => {
    option.addEventListener("click", selectOption);
  });

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
    let searchQuery = searchBox.value.toLowerCase();
    for (const inputOption of inputOptions) {
      let isMatched = inputOption
        .querySelector(".country-name")
        .innerText.toLowerCase()
        .includes(searchQuery);
      inputOption.classList.toggle("hide", !isMatched);
    }
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
    let countryCode;

    if (inputValue.length <= 4) {
      countryCode = inputValue;
    } else if (inputValue.length > 4) {
      hideOptions();
      return;
    } else if (inputValue.length < 4) {
      removeClassHide();
      return;
    }

    for (const inputOption of inputOptions) {
      let isMatched = inputOption
        .querySelector(".country-code")
        .innerText.includes(countryCode);
      inputOption.classList.toggle("hide", !isMatched);
    }
  }
}
