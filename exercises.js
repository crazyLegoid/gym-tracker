import { state, initState } from './state.js';
import { saveStorage } from './storage.js';

export function renderExercises() {
  const list = document.getElementById('exerciseList');
  list.innerHTML = '';
  state.exercises.forEach(e => {
    const div = document.createElement('div');
    div.className = 'card list-item';
    div.innerHTML = `<span>${e.name} ${e.muscle ? '('+e.muscle+')' : ''}</span>
                     <button class="danger" onclick="removeExercise('${e.id}')">X</button>`;
    list.appendChild(div);
  });
}

export function addExercise(name, muscle) {
  if (!name) return;
  state.exercises.push({ id: crypto.randomUUID(), name, muscle: muscle || null, createdAt: Date.now() });
  saveStorage(state);
  renderExercises();
}

export function removeExercise(id) {
  if (!confirm("Delete exercise?")) return;
  state.exercises = state.exercises.filter(e => e.id !== id);
  saveStorage(state);
  renderExercises();
}