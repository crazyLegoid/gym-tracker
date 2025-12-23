import { state } from './state.js';
import { saveStorage } from './storage.js';

let currentSets = [];

export function addSet(reps, weight) {
  if (!reps) return;
  currentSets.push({ reps, weight: weight || 0 });
  renderSets();
}

export function renderSets() {
  const div = document.getElementById('currentSets');
  div.innerHTML = '';
  currentSets.forEach(s => {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = `${s.reps} reps × ${s.weight} kg`;
    div.appendChild(card);
  });
}

export function saveWorkout(exerciseId) {
  if (!exerciseId || !currentSets.length) return;
  state.workouts.push({ id: crypto.randomUUID(), exerciseId, timestamp: Date.now(), sets: currentSets });
  currentSets = [];
  saveStorage(state);
  renderSets();
}