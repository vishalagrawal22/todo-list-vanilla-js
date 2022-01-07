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
})();