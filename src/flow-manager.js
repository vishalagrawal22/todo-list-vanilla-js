import {
  INITIALIZE_DOM,
  DOM_ADD_PROJECT_TO_NAV,
  REQUEST_DELETE_PROJECT,
  DOM_REMOVE_PROJECT_FROM_NAV,
  REQUEST_ADD_PROJECT,
  REQUEST_UPDATE_PROJECT,
  DOM_ADD_TODO_TO_DISPLAY,
} from "./topics";

import { subscribe, publish } from "./topic-manager";

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
