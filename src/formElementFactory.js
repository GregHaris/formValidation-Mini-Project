// formUtility.js

export const errorMessageParagragh = () => {
  const para = document.createElement("div");
  para.textContent = "Error: please fill up all required fields";
  para.className = "error-message";
  para.id = "errorMessage";
  return para;
};

export const createInputField = (
  containerID,
  labelText,
  inputType,
  inputId,
  placeholder,
  required = false,
) => {
  const container = document.createElement("div");
  container.id = containerID;
  const label = document.createElement("label");
  label.setAttribute("for", inputId);
  label.textContent = labelText;

  const input = document.createElement("input");
  input.type = inputType;
  input.id = inputId;
  input.name = inputId;
  input.placeholder = placeholder;
  if (required) input.required = true;

  container.append(label, input);
  return container;
};

export const createPhoneNumInputField = (
  containerID,
  defaultCountryCode = "+1",
  placeholder = "e.g +18100043",
) => {
  const container = document.createElement("div");
  container.id = containerID;

  const inputContainer = document.createElement("div");
  inputContainer.id = "selectBox";
  inputContainer.className = "select-box";

  const label = document.createElement("label");
  label.htmlFor = "phoneNumInput";
  label.textContent = "Phone Number: ";

  const selectedOption = document.createElement("div");
  selectedOption.className = "selected-option";
  selectedOption.id = "selectedOption";

  const countryCodeDiv = document.createElement("div");
  const countryCode = document.createElement("strong");
  countryCode.textContent = defaultCountryCode;
  countryCodeDiv.appendChild(countryCode);

  const phoneInput = document.createElement("input");
  phoneInput.type = "tel";
  phoneInput.name = "tel";
  phoneInput.id = "phoneNumInput";
  phoneInput.placeholder = placeholder;

  selectedOption.append(countryCodeDiv, phoneInput);

  const options = document.createElement("div");
  options.className = "options";
  options.id = "options";

  const searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.className = "search-box";
  searchBox.id = "searchBox";
  searchBox.placeholder = "Search Country name";

  const ol = document.createElement("ol");

  options.append(searchBox, ol);

  inputContainer.append(selectedOption, options);

  container.append(label, inputContainer);
  return container;
};

export const createCountryNameInputField = (
  containerID,
  defaultCountryIcon = "flag:gb-4x3",
  placeholder = "e.g United Kingdom",
) => {
  const container = document.createElement("div");
  container.id = containerID;

  const inputContainer = document.createElement("div");
  inputContainer.id = "selectBox";
  inputContainer.className = "select-box";

  const label = document.createElement("label");
  label.htmlFor = "countryNameInput";
  label.textContent = "Country: ";

  const selectedCountry = document.createElement("div");
  selectedCountry.className = "selected-option";
  selectedCountry.id = "selectedCountry";

  const countryIconDiv = document.createElement("div");
  const countryIcon = document.createElement("iconify-icon");
  countryIcon.setAttribute("icon", defaultCountryIcon);
  countryIconDiv.appendChild(countryIcon);

  const countryInput = document.createElement("input");
  countryInput.type = "text";
  countryInput.name = "countryNameInput";
  countryInput.id = "countryNameInput";
  countryInput.placeholder = placeholder;

  selectedCountry.append(countryIconDiv, countryInput);

  const countryOptions = document.createElement("div");
  countryOptions.className = "options";
  countryOptions.id = "countryOptions";

  const ol = document.createElement("ol");

  countryOptions.append(ol);

  inputContainer.append(selectedCountry, countryOptions);

  container.append(label, inputContainer);
  return container;
};

export const createSubmitButton = (containerID, buttonText) => {
  const container = document.createElement("div");
  container.id = containerID;
  const button = document.createElement("button");
  button.textContent = buttonText;
  button.type = "submit";
  button.id = "submit";

  container.append(button);
  return container;
};
