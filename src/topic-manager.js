import PubSub from "pubsub-js";

// only for development purpose
PubSub.immediateExceptions = true;

function subscribe(topic, callback) {
  return PubSub.subscribe(topic, callback);
}

function unsubscribe(token) {
  PubSub.unsubscribe(token);
}

function publish(topic, data) {
  return PubSub.publish(topic, data);
}

export { subscribe, unsubscribe, publish };
