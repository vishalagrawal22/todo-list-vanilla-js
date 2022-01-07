const INITIALIZE_DOM = "DOM: initialize";
// Data: None

const ADD_FORM_TO_DISPLAY = "DOM: add form to display";
// Data: { formSelector, mode }
// formSelector: css selector of the form
// mode: option {add, edit}

// Optional Data: { prefillValues }
// prefillValues: object with keys as name property of input
// and value is the prefill value for name property

const REMOVE_FORM_FROM_DISPLAY = "DOM: remove form from display";
// Data: None

const DOM_ADD_PROJECT_TO_NAV = "DOM: add project to name";
// Data: { name }
// name of the project

export {
  INITIALIZE_DOM,
  ADD_FORM_TO_DISPLAY,
  REMOVE_FORM_FROM_DISPLAY,
  DOM_ADD_PROJECT_TO_NAV,
};
