import { publish, subscribe } from "./topic-manager";
import {
  INITIALIZE_DOM,
  ADD_FORM_TO_DISPLAY,
  REMOVE_FORM_FROM_DISPLAY,
  DOM_ADD_PROJECT_TO_NAV,
  REQUEST_DELETE_PROJECT,
  REQUEST_ADD_PROJECT,
  REQUEST_UPDATE_PROJECT,
  DOM_REMOVE_PROJECT_FROM_NAV,
  DOM_ADD_TODO_TO_DISPLAY,
} from "./topics";
import "./style.css";

(function formHandler() {
  function addFormToDOM(topic, data) {
    const overlay = document.querySelector(".overlay");
    const formContainer = document.querySelector(data.formSelector);
    overlay.classList.add("active");
    if ("prefillValues" in data) {
      for (const key of Object.keys(data.prefillValues)) {
        const input = formContainer.querySelector(`[name="${key}"]`);
        if (input.type === "radio") {
          const option = formContainer.querySelector(
            `[name="${key}"][value="${data.prefillValues[key]}"]`
          );
          option.setAttribute("checked", true);
        } else {
          input.value = data.prefillValues[key];
        }
      }
    }
    formContainer.setAttribute("data-mode", data.mode);
    if (data.mode === "edit") {
      formContainer.setAttribute("data-id", data.id);
    }
    formContainer.classList.add("active");
  }
  subscribe(ADD_FORM_TO_DISPLAY, addFormToDOM);

  function removeFormFromDOM(topic) {
    const activeNodeList = document.querySelectorAll(".active");
    activeNodeList.forEach((activeNode) => {
      activeNode.classList.remove("active");
    });

    const formsNodeList = document.querySelectorAll("form");
    formsNodeList.forEach((form) => {
      if (form.hasAttribute("data-mode")) {
        form.removeAttribute("data-mode");
      }

      if (form.hasAttribute("data-id")) {
        form.removeAttribute("data-id");
      }
      form.reset();
    });
  }
  subscribe(REMOVE_FORM_FROM_DISPLAY, removeFormFromDOM);

  function initializeOverlay() {
    const overlay = document.querySelector(".overlay");
    overlay.addEventListener("click", (event) => {
      if (event.target.classList.contains("form-flex-container")) {
        publish(REMOVE_FORM_FROM_DISPLAY);
      }
    });
  }

  function initializeProjectForm() {
    const form = document.querySelector(".project-form");
    form.addEventListener("submit", (Event) => {
      Event.preventDefault();
      const nameInput = form.querySelector("#project-name");
      const mode = form.getAttribute("data-mode");
      if (mode === "edit") {
        const newName = nameInput.value;
        const oldName = form.getAttribute("data-id");
        publish(REQUEST_UPDATE_PROJECT, { oldName, newName });
      } else if (mode === "add") {
        const name = nameInput.value;
        publish(REQUEST_ADD_PROJECT, { name });
      } else {
        console.log(`Unknown Mode: ${data.mode}`);
      }
      publish(REMOVE_FORM_FROM_DISPLAY);
    });
  }

  function initialize(topic) {
    initializeOverlay();
    initializeProjectForm();
  }
  subscribe(INITIALIZE_DOM, initialize);
})();

(function projectManager() {
  const defaultProjectsArray = ["All", "Miscellaneous"];
  const defaultProjects = new Set(defaultProjectsArray);
  function copyFromTemplate() {
    const projectTemplate = document.querySelector(".project-item.template");
    const project = projectTemplate.cloneNode(true);
    project.classList.remove("template");
    return project;
  }

  function removeActionButtons(project) {
    const actionButtons = project.querySelector(".project-actions");
    actionButtons.remove();
  }

  function setupEditButton(project) {
    const editButton = project.querySelector(".edit-button");
    editButton.addEventListener("click", (Event) => {
      const name = project.getAttribute("data-name");
      publish(ADD_FORM_TO_DISPLAY, {
        formSelector: ".project-form",
        mode: "edit",
        id: name,
        prefillValues: { "project-name": name },
      });
    });
  }

  function setupDeleteButton(project) {
    const deleteButton = project.querySelector(".delete-button");
    const name = project.getAttribute("data-name");
    deleteButton.addEventListener("click", (Event) => {
      const confirmDelete = confirm(
        `Are you sure, you want to delete project ${name}?`
      );
      if (confirmDelete) {
        publish(REQUEST_DELETE_PROJECT, { name });
      }
    });
  }

  function setupActionButtons(project) {
    setupEditButton(project);
    setupDeleteButton(project);
  }

  function getProject(name) {
    const project = copyFromTemplate();
    const projectName = project.querySelector("h3 a");
    projectName.innerText = name;
    project.setAttribute("data-name", name);
    if (defaultProjects.has(name)) {
      removeActionButtons(project);
    } else {
      setupActionButtons(project);
    }
    return project;
  }

  function addProjectToNav(topic, data) {
    const projectList = document.querySelector(".projects-section ul");
    const project = getProject(data.name);
    projectList.appendChild(project);
  }
  subscribe(DOM_ADD_PROJECT_TO_NAV, addProjectToNav);

  function removeProjectFromNav(topic, data) {
    const project = document.querySelector(`[data-name="${data.name}"]`);
    project.remove();
  }
  subscribe(DOM_REMOVE_PROJECT_FROM_NAV, removeProjectFromNav);

  function initializeAddProjectButton() {
    const addProjectButton = document.querySelector(
      ".projects-section > button"
    );

    addProjectButton.addEventListener("click", () => {
      publish(ADD_FORM_TO_DISPLAY, {
        formSelector: ".project-form",
        mode: "add",
      });
    });
  }

  function initialize(topic) {
    initializeAddProjectButton();
  }
  subscribe(INITIALIZE_DOM, initialize);
})();

(function todoManager() {
  function initializeAddTodoButton() {
    const addTodoButton = document.querySelector(".float-button");
    addTodoButton.addEventListener("click", () => {
      publish(ADD_FORM_TO_DISPLAY, {
        formSelector: ".todo-form",
        mode: "add",
        prefillValues: { priority: 1 },
      });
    });
  }

  function copyFromTemplate() {
    const todoTemplate = document.querySelector(".todo-item.template");
    const todo = todoTemplate.cloneNode(true);
    todo.classList.remove("template");
    return todo;
  }

  function getTodo(title, description, timeLeft, priority, isCompleted, UUID) {
    const todo = copyFromTemplate();
    todo.id = UUID;
    const titleData = todo.querySelector(
      `[data-type="title"] .todo-data-value`
    );
    const descriptionData = todo.querySelector(
      `[data-type="description"] .todo-data-value`
    );
    const timeLeftData = todo.querySelector(
      `[data-type="time-left"] .todo-data-value`
    );
    const statusData = todo.querySelector(
      `[data-type="status"] .todo-data-value`
    );
    const markAsComplete = todo.querySelector(".mark-as-complete");
    todo.classList.add(`priority-${priority}`);
    titleData.innerText = title;
    descriptionData.innerText = description;
    timeLeftData.innerText = timeLeft;
    if (isCompleted) {
      statusData.innerText = "Completed";
      todo.classList.add("completed");
      markAsComplete.innerText = "Mark as incomplete";
    } else {
      statusData.innerText = "Pending";
      markAsComplete.innerText = "Mark as complete";
    }
    return todo;
  }

  function addTodoToDisplay(topic, data) {
    const todoList = document.querySelector(".todos-section");
    const todo = getTodo(
      data.title,
      data.description,
      data.timeLeft,
      data.priority,
      data.isCompleted,
      data.UUID
    );
    todoList.appendChild(todo);
  }
  subscribe(DOM_ADD_TODO_TO_DISPLAY, addTodoToDisplay);

  function initialize(topic) {
    initializeAddTodoButton();
  }
  subscribe(INITIALIZE_DOM, initialize);
})();

(function tester() {
  publish(INITIALIZE_DOM);
  publish(DOM_ADD_PROJECT_TO_NAV, { name: "All" });
  publish(DOM_ADD_PROJECT_TO_NAV, { name: "Miscellaneous" });
  publish(DOM_ADD_PROJECT_TO_NAV, { name: "Project 1" });
  publish(DOM_ADD_PROJECT_TO_NAV, { name: "Project 2" });
  publish(DOM_ADD_PROJECT_TO_NAV, { name: "Project 3" });
  subscribe(REQUEST_DELETE_PROJECT, (topic, data) => {
    publish(DOM_REMOVE_PROJECT_FROM_NAV, { name: data.name });
    console.log("Deleted Project");
    console.log({ data });
  });
  subscribe(REQUEST_ADD_PROJECT, (topic, data) => {
    console.log("Added Project");
    console.log({ data });
  });
  subscribe(REQUEST_UPDATE_PROJECT, (topic, data) => {
    console.log("Updated Project");
    console.log({ data });
  });

  publish(DOM_ADD_TODO_TO_DISPLAY, {
    UUID: "34862916-1692-49e5-bab9-4630fe47e717",
    description:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    isCompleted: false,
    priority: 1,
    timeLeft: "1 month left",
    title:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  });

  publish(DOM_ADD_TODO_TO_DISPLAY, {
    UUID: "949b74dc-8084-42ec-8ea9-412f534d0b15",
    description:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    isCompleted: false,
    priority: 3,
    timeLeft: "5 months left",
    title: "Quisque porta volutpat erat.",
  });

  publish(DOM_ADD_TODO_TO_DISPLAY, {
    UUID: "20b11a26-66d3-4621-82c7-5a5913aa2112",
    description:
      "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    isCompleted: true,
    priority: 2,
    timeLeft: "13 days left",
    title: "Suspendisse accumsan tortor quis turpis.",
  });

  publish(DOM_ADD_TODO_TO_DISPLAY, {
    UUID: "88f690dc-c413-4440-b113-484cae73ff59",
    description:
      "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    isCompleted: false,
    priority: 4,
    timeLeft: "13 days left",
    title: "Suspendisse potenti.",
  });

  publish(DOM_ADD_TODO_TO_DISPLAY, {
    UUID: "f5079924-22b9-48a6-9d85-f8e0456dd6a6",
    description:
      "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    isCompleted: false,
    priority: 2,
    timeLeft: "13 days left",
    title: "In blandit ultrices enim.",
  });
})();
