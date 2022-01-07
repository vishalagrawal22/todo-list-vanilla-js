import { publish, subscribe } from "./topic-manager";
import {
  INITIALIZE_DOM,
  ADD_FORM_TO_DISPLAY,
  REMOVE_FORM_FROM_DISPLAY,
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

  function initialize(topic) {
    initializeOverlay();
  }
  subscribe(INITIALIZE_DOM, initialize);
})();

(function projectManager() {
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
})();
