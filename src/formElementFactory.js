// formUtility.js
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
  input.placeholder = placeholder;
  if (required) input.required = true;

  container.append(label, input);
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
