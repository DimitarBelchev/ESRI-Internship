import { dispatchLocalStorageUpdate } from "./events";

export function setLocalStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  dispatchLocalStorageUpdate();
}

export function getLocalStorageItem(key, defaultValue = "[]") {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : JSON.parse(defaultValue);
  } catch (err) {
    return JSON.parse(defaultValue);
  }
}
