const DOM_INITIALIZE = "DOM: initialize";
// Data: None

const ADD_FORM_TO_DISPLAY = "DOM: add form to display";
// Data: { formSelector, mode, id }
// formSelector: css selector of the form
// mode: option {add, edit}
// id should be provided for add todo (project UUID), edit todo (todo UUID), edit project (project UUID)

// Optional Data: { prefillValues }
// prefillValues: object with keys as name property of input
// and value is the prefill value for name property

const REMOVE_FORM_FROM_DISPLAY = "DOM: remove form from display";
// Data: None

const DOM_ADD_PROJECT_TO_NAV = "DOM: add project to nav";
// Data: { name, UUID, focus }

const DOM_REMOVE_PROJECT_FROM_NAV = "DOM: remove project from nav";
// Data: { UUID }

const DOM_ADD_TODO_TO_DISPLAY = "DOM: Add TODO to display";
// Data: { UUID, title, description, timeLeft, priority, isCompleted }

const DOM_DELETE_TODO_FROM_DISPLAY = "DOM: Delete TODO from display";
// Data: { UUID }

const REQUEST_DELETE_PROJECT = "Controller: handle project deletion";
// Data: { UUID }

const REQUEST_UPDATE_PROJECT = "Controller: handle project name update";
// Data: { UUID, name }

const REQUEST_ADD_PROJECT = "Controller: handle add project";
// Data: { name }
// name: name of the project

const REQUEST_ADD_TODO = "Controller: handle add todo";
// Data: { title, description, deadline, priority, projectUUID }

const REQUEST_UPDATE_TODO = "Controller: handle update todo";
// Data: UUID
// Optional Data: { title, description, deadline, priority, isCompleted }

const REQUEST_DELETE_TODO = "Controller: handle delete todo";
// Data: { UUID }

const REQUEST_ADD_PROJECT_DATA_TO_DISPLAY =
  "Controller: handle add project data to display";
// Data: { UUID }

const REQUEST_TODO_DATA =
  "Controller: handle retrieving data from database and callback with it";
// Data: { UUID, callback }

const DB_INITIALIZE = "Data Manager: Initalise database";
// Data: None
// Optional Data: { callback }

const DB_ADD_PROJECT = "Data Manager: Add project to database";
// Data: { name }
// Optional Data: { callback }
// name: project name

const DB_UPDATE_PROJECT = "Data Manager: update project to database";
// Data: { UUID, name }
// Optional Data: { callback }
// UUID: project UUID
// name: project name

const DB_DELETE_PROJECT = "Data Manager: delete project from database";
// Data: { UUID }
// Optional Data: { callback }
// UUID: project UUID

const DB_FETCH_PROJECT = "Data Manager: fetch project from DB";
// Data: { UUID, callback }
// UUID: project UUID
// callback: function which called with the data fetched

const DB_FETCH_PROJECT_LIST = "Data Manager: fetch project list from DB";
// Data: { callback }
// callback: function which called with the data fetched

const DB_ADD_TODO = "Data Manager: add todo to database";
// Data: { title, description, priority, projectUUID, deadline }
// Optional Data: { callback }
// title: title of todo
// description: description of todo
// priority: priority of todo
// projectUUID: projectUUID of the parent project of todo
// deadline: deadline of todo

const DB_DELETE_TODO = "Data Manager: delete todo from database";
// UUID
// Optional Data: { callback }
// UUID: UUID of todo

const DB_UPDATE_TODO = "Data Manager: update todo from database";
// Data: { UUID }
// Optional Data: { title, description, priority, deadline, isCompleted, callback }
// UUID: UUID of todo
// isCompleted: is todo completed
// title: title of todo
// description: description of todo
// priority: priority of todo
// deadline: deadline of todo

const DB_FETCH_TODO = "Data Manager: fetch todo from database";
// Data: { UUID, callback }
// UUID of todo
// callback: function which called with the data fetched

export {
  DOM_INITIALIZE,
  ADD_FORM_TO_DISPLAY,
  REMOVE_FORM_FROM_DISPLAY,
  DOM_ADD_PROJECT_TO_NAV,
  DOM_REMOVE_PROJECT_FROM_NAV,
  REQUEST_DELETE_PROJECT,
  REQUEST_ADD_PROJECT,
  REQUEST_UPDATE_PROJECT,
  REQUEST_ADD_TODO,
  REQUEST_UPDATE_TODO,
  REQUEST_DELETE_TODO,
  REQUEST_ADD_PROJECT_DATA_TO_DISPLAY,
  REQUEST_TODO_DATA,
  DOM_ADD_TODO_TO_DISPLAY,
  DB_INITIALIZE,
  DB_ADD_PROJECT,
  DB_UPDATE_PROJECT,
  DB_DELETE_PROJECT,
  DB_FETCH_PROJECT,
  DB_FETCH_PROJECT_LIST,
  DB_ADD_TODO,
  DB_DELETE_TODO,
  DB_UPDATE_TODO,
  DB_FETCH_TODO,
  DOM_DELETE_TODO_FROM_DISPLAY,
};
