import { getItem, setItem, removeItem } from "./db";
import {
  DB_INITALISE,
  DB_ADD_PROJECT,
  DB_UPDATE_PROJECT,
  DB_DELETE_PROJECT,
  DB_FETCH_PROJECT,
  DB_FETCH_PROJECT_LIST,
} from "./topics";
import { subscribe } from "./topic-manager";
import { generateUUID } from "./uuid-generator";

function initalise() {
  if (getItem("projects") === null) {
    const miscellaneousUUID = generateUUID();
    setItem("projects", {
      [miscellaneousUUID]: true,
    });

    setItem(miscellaneousUUID, {
      name: "miscellaneous",
      todoList: {},
      lastModified: new Date(),
    });
  }
}
subscribe(DB_INITALISE, initalise);

function addProject(topic, data) {
  let projects = getItem("projects");
  const projectUUID = generateUUID();
  projects[projectUUID] = true;
  setItem("projects", projects);
  setItem(projectUUID, {
    name: data.name,
    todoList: {},
    lastModified: new Date(),
  });
}
subscribe(DB_ADD_PROJECT, addProject);

function updateProject(topic, data) {
  let project = getItem(data.UUID);
  project["name"] = data.name;
  project["lastModified"] = new Date();
  setItem(data.UUID, project);
}
subscribe(DB_UPDATE_PROJECT, updateProject);

function deleteProject(topic, data) {
  let projects = getItem("projects");
  removeItem(data.UUID);
  delete projects[data.UUID];
  setItem("projects", projects);
}
subscribe(DB_DELETE_PROJECT, deleteProject);

function fetchProject(topic, data) {
  let project = getItem(data.UUID);
  data.callback(project);
}
subscribe(DB_FETCH_PROJECT, fetchProject);

function fetchProjectList(topic, data) {
  let projectList = getItem("projects");
  data.callback(projectList);
}
subscribe(DB_FETCH_PROJECT_LIST, fetchProjectList);
