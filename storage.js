const STORAGE_KEY = "gymTrackerV1";

export function loadStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { exercises: [], workouts: [] };
  const data = JSON.parse(raw);
  if (!data.version) data.version = 1;
  return data;
}

export function saveStorage(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, version: 1 }));
}