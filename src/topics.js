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

const DOM_ADD_PROJECT_TO_NAV = "DOM: add project to nav";
// Data: { name }
// name: name of the project

const DOM_REMOVE_PROJECT_FROM_NAV = "DOM: remove project from nav";
// Data: { name }
// name: name of the project

const DOM_ADD_TODO_TO_DISPLAY = "DOM: Add TODO to display";
// Data: { UUID, title, description, timeLeft, priority, isCompleted }

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

const DB_INITALISE = "Data Manager: Initalise database";
// Data: None

const DB_ADD_PROJECT = "Data Manager: Add project to database";
// Data: { name }
// name: project name

const DB_UPDATE_PROJECT = "Data Manager: update project to database";
// Data: { UUID, name }
// UUID: project UUID
// name: project name

const DB_DELETE_PROJECT = "Data Manager: delete project from database";
// Data: { UUID }
// UUID: project UUID

const DB_FETCH_PROJECT = "Data Manager: fetch project from DB";
// Data: { UUID, callback }
// UUID: project UUID
// callback: function which called with the data fetched

const DB_FETCH_PROJECT_LIST = "Data Manager: fetch project list from DB";
// Data: { callback }
// callback: function which called with the data fetched

export {
  INITIALIZE_DOM,
  ADD_FORM_TO_DISPLAY,
  REMOVE_FORM_FROM_DISPLAY,
  DOM_ADD_PROJECT_TO_NAV,
  DOM_REMOVE_PROJECT_FROM_NAV,
  REQUEST_DELETE_PROJECT,
  REQUEST_ADD_PROJECT,
  REQUEST_UPDATE_PROJECT,
  DOM_ADD_TODO_TO_DISPLAY,
  DB_INITALISE,
  DB_ADD_PROJECT,
  DB_UPDATE_PROJECT,
  DB_DELETE_PROJECT,
  DB_FETCH_PROJECT,
  DB_FETCH_PROJECT_LIST,
};
