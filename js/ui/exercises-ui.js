import { getState, setState, subscribe } from '../state/store.js';
import { createExercise } from '../models/exercise.js';

const list = document.getElementById('exerciseList');
const form = document.getElementById('exerciseForm');

function render(exercises) {
  list.innerHTML = '';
  exercises.forEach(ex => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <h3>${ex.name}</h3>
      <p>${ex.muscleGroup || ''}</p>
      <button>Delete</button>
    `;

    div.querySelector('button').onclick = () => {
      if (!confirm('Delete exercise?')) return;
      setState(s => ({
        ...s,
        exercises: s.exercises.filter(e => e.id !== ex.id)
      }));
    };

    list.appendChild(div);
  });
}

form.onsubmit = e => {
  e.preventDefault();
  setState(s => ({
    ...s,
    exercises: [...s.exercises, createExercise(exerciseName.value, muscleGroup.value)]
  }));
  form.reset();
};

subscribe(s => render(s.exercises));
render(getState().exercises);
