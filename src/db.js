function parse(value) {
  return JSON.parse(value);
}

function format(value) {
  return JSON.stringify(value);
}

function getItem(key) {
  return parse(localStorage.getItem(key));
}

function setItem(key, value) {
  localStorage.setItem(key, format(value));
}

function removeItem(key) {
  localStorage.removeItem(key);
}

export { getItem, setItem, removeItem };
