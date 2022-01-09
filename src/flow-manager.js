import {
  DB_FETCH_PROJECT,
  DB_FETCH_PROJECT_LIST,
  DB_INITIALIZE,
  DOM_ADD_PROJECT_TO_NAV,
  DOM_INITIALIZE,
  DB_ADD_PROJECT,
  REQUEST_ADD_PROJECT,
  REQUEST_DELETE_PROJECT,
  DB_DELETE_PROJECT,
  DOM_REMOVE_PROJECT_FROM_NAV,
  DB_UPDATE_PROJECT,
  REQUEST_UPDATE_PROJECT,
  REQUEST_ADD_TODO,
  DB_ADD_TODO,
  DB_FETCH_TODO,
  DOM_ADD_TODO_TO_DISPLAY,
  REQUEST_ADD_PROJECT_DATA_TO_DISPLAY,
} from "./topics";

import { subscribe, publish } from "./topic-manager";

function addProjectToNav(UUID) {
  publish(DB_FETCH_PROJECT, {
    UUID,
    callback: ({ name }) => {
      publish(DOM_ADD_PROJECT_TO_NAV, { name, UUID });
    },
  });
}

function removeProjectFromNav(UUID) {
  publish(DOM_REMOVE_PROJECT_FROM_NAV, {
    UUID,
  });
}

function addAllProjectsToNav() {
  publish(DB_FETCH_PROJECT_LIST, {
    callback: (allProjectsData) => {
      for (const projectUUID in allProjectsData) {
        if (projectUUID === "defaultProjectUUID") {
          continue;
        }
        addProjectToNav(projectUUID);
      }
    },
  });
}

function handleAddProject(topic, { name }) {
  publish(DB_ADD_PROJECT, {
    name,
    callback: (UUID) => {
      addProjectToNav(UUID);
    },
  });
}
subscribe(REQUEST_ADD_PROJECT, handleAddProject);

function handleDeleteProject(topic, { UUID }) {
  publish(DB_DELETE_PROJECT, {
    UUID,
    callback: () => {
      removeProjectFromNav(UUID);
    },
  });
}
subscribe(REQUEST_DELETE_PROJECT, handleDeleteProject);

function handleUpdateProject(topic, { UUID, name }) {
  publish(DB_UPDATE_PROJECT, {
    UUID,
    name,
    callback: () => {
      removeProjectFromNav(UUID);
      addProjectToNav(UUID);
    },
  });
}
subscribe(REQUEST_UPDATE_PROJECT, handleUpdateProject);

function addTodoToDisplay(todoUUID) {
  publish(DB_FETCH_TODO, {
    UUID: todoUUID,
    callback: ({ title, description, priority, isCompleted, deadline }) => {
      publish(DOM_ADD_TODO_TO_DISPLAY, {
        UUID: todoUUID,
        title,
        description,
        priority,
        isCompleted,
        timeLeft: deadline,
      });
    },
  });
}

function addProjectToDisplay(projectUUID) {
  publish(DB_FETCH_PROJECT, {
    UUID: projectUUID,
    callback: ({ todoList }) => {
      for (const todoUUID in todoList) {
        addTodoToDisplay(todoUUID);
      }
    },
  });
}

function addAllProjectsToDisplay() {
  publish(DB_FETCH_PROJECT_LIST, {
    callback: (projectList) => {
      for (const projectUUID in projectList) {
        if (projectUUID === "defaultProjectUUID") {
          continue;
        }
        addProjectToDisplay(projectUUID);
      }
    },
  });
}

function handleAddProjectData(topic, { UUID }) {
  if (UUID === "all") {
    addAllProjectsToDisplay();
  } else {
    addProjectToDisplay(UUID);
  }
}
subscribe(REQUEST_ADD_PROJECT_DATA_TO_DISPLAY, handleAddProjectData);

function defaultProjectHelper(parentFunction, topic, data) {
  publish(DB_FETCH_PROJECT_LIST, {
    callback: (projectList) => {
      data["projectUUID"] = projectList["defaultProjectUUID"];
      parentFunction(topic, data);
    },
  });
}

function handleAddTodo(
  topic,
  { title, description, deadline, priority, projectUUID }
) {
  if (projectUUID === "all") {
    defaultProjectHelper(handleAddTodo, topic, {
      title,
      description,
      deadline,
      priority,
      projectUUID,
    });
  } else {
    publish(DB_ADD_TODO, {
      title,
      description,
      deadline,
      priority,
      projectUUID,
      callback: (todoUUID) => {
        addTodoToDisplay(todoUUID);
      },
    });
  }
}
subscribe(REQUEST_ADD_TODO, handleAddTodo);

(function startApp() {
  publish(DB_INITIALIZE, {
    callback: () => {
      publish(DOM_INITIALIZE, {});
      addAllProjectsToNav();
    },
  });
})();

(function tester() {})();
