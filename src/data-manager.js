import { getItem, setItem, removeItem } from "./db";
import {
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
} from "./topics";
import { publish, subscribe } from "./topic-manager";
import { generateUUID } from "./uuid-generator";

function initalise(topic, data) {
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
  if ("callback" in data) {
    data.callback();
  }
}
subscribe(DB_INITIALIZE, initalise);

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
  if ("callback" in data) {
    data.callback();
  }
}
subscribe(DB_ADD_PROJECT, addProject);

function updateProject(topic, data) {
  let project = getItem(data.UUID);
  project["name"] = data.name;
  project["lastModified"] = new Date();
  setItem(data.UUID, project);
  if ("callback" in data) {
    data.callback();
  }
}
subscribe(DB_UPDATE_PROJECT, updateProject);

function deleteProject(topic, data) {
  let projects = getItem("projects");
  const project = getItem(data.UUID);
  removeItem(data.UUID);
  for (const todoUUID in project.todoList) {
    console.log(todoUUID);
    publish(DB_DELETE_TODO, {
      UUID: todoUUID,
    });
  }
  delete projects[data.UUID];
  setItem("projects", projects);
  if ("callback" in data) {
    data.callback();
  }
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

function addTodo(topic, data) {
  const todoUUID = generateUUID();
  setItem(todoUUID, {
    title: data.title,
    description: data.description,
    priority: data.priority,
    isCompleted: false,
    projectUUID: data.projectUUID,
    deadline: data.deadline,
  });

  let project = getItem(data.projectUUID);
  project["lastModified"] = new Date();
  project["todoList"][todoUUID] = true;
  setItem(data.projectUUID, project);
  if ("callback" in data) {
    data.callback();
  }
}
subscribe(DB_ADD_TODO, addTodo);

function deleteTodo(topic, data) {
  const todo = getItem(data.UUID);
  removeItem(data.UUID);
  const projectUUID = todo.projectUUID;
  let project = getItem(projectUUID);
  if (project !== null) {
    // when deleteProject triggers deleteTodo
    project["lastModified"] = new Date();
    delete project["todoList"][data.UUID];
    setItem(projectUUID, project);
  }
  if ("callback" in data) {
    data.callback();
  }
}
subscribe(DB_DELETE_TODO, deleteTodo);

function updateTodo(topic, data) {
  const todo = getItem(data.UUID);
  for (const key in data) {
    if (key === "UUID") {
      continue;
    }
    todo[key] = data[key];
  }
  setItem(data.UUID, todo);

  let project = getItem(todo.projectUUID);
  project["lastModified"] = new Date();
  setItem(todo.projectUUID, project);
  if ("callback" in data) {
    data.callback();
  }
}
subscribe(DB_UPDATE_TODO, updateTodo);

function fetchTodo(topic, data) {
  // UUID, callback
  const todo = getItem(data.UUID);
  data.callback(todo);
}
subscribe(DB_FETCH_TODO, fetchTodo);
