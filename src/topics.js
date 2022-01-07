const INITIALIZE_DOM = "DOM: initialize";
// Data: None

const ADD_FORM_TO_DISPLAY = "DOM: add form to display";
// Data: { formSelector, mode, id }
// formSelector: css selector of the form
// mode: option {add, edit}
// if mode == "edit" the id of edited item else it is optional

// Optional Data: { prefillValues }
// prefillValues: object with keys as name property of input
// and value is the prefill value for name property

const REMOVE_FORM_FROM_DISPLAY = "DOM: remove form from display";
// Data: None

const DOM_ADD_PROJECT_TO_NAV = "DOM: add project to name";
// Data: { name }
// name: name of the project

const REQUEST_DELETE_PROJECT = "Controller: handle project deletion";
// Data: { name }
// name: name of the project

const REQUEST_UPDATE_PROJECT = "Controller: handle project name update";
// Data: { oldName, newName }
// oldName: old name of the project
// newName: new name of the project

const REQUEST_ADD_PROJECT = "Controller: handle add project";
// Data: { name }
// name: name of the project

export {
  INITIALIZE_DOM,
  ADD_FORM_TO_DISPLAY,
  REMOVE_FORM_FROM_DISPLAY,
  DOM_ADD_PROJECT_TO_NAV,
  REQUEST_DELETE_PROJECT,
  REQUEST_ADD_PROJECT,
  REQUEST_UPDATE_PROJECT,
};
