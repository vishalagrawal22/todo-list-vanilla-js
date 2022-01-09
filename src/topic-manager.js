import {
  subscribe as sub,
  unsubscribe as unsub,
  publish as pub,
} from "pubsub-js";

function subscribe(topic, callback) {
  return sub(topic, callback);
}

function unsubscribe(token) {
  unsub(token);
}

function publish(topic, data) {
  return pub(topic, data);
}

export { subscribe, unsubscribe, publish };
