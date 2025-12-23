const KEY = 'gym-tracker-v1';

export function loadState() {
  return JSON.parse(localStorage.getItem(KEY)) || {
    version: 1,
    exercises: [],
    workouts: []
  };
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
