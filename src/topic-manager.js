import { subscribe as sub, publish as pub } from "pubsub-js";

function subscribe(topic, callback) {
  return sub(topic, callback);
}

function publish(topic, data) {
  return pub(topic, data);
}

export { subscribe, publish };
