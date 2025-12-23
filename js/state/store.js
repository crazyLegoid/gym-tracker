import { loadState, saveState } from '../data/storage.js';

let state = loadState();
const listeners = [];

export function getState() {
  return structuredClone(state);
}

export function setState(update) {
  state = update(state);
  saveState(state);
  listeners.forEach(fn => fn(state));
}

export function subscribe(fn) {
  listeners.push(fn);
}
