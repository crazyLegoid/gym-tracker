import { getState, setState } from '../state/store.js';
import { createWorkout } from '../models/workout.js';

const container = document.getElementById('workoutContainer');
const { exercises } = getState();

if (!exercises.length) {
  container.innerHTML = '<p>No exercises yet.</p>';
}

exercises.forEach(ex => {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <h3>${ex.name}</h3>
    <input placeholder="Reps" type="number">
    <input placeholder="Weight (kg)" type="number">
    <button>Log Set</button>
  `;

  const [reps, weight] = card.querySelectorAll('input');

  card.querySelector('button').onclick = () => {
    if (!reps.value) return;

    setState(s => ({
      ...s,
      workouts: [
        ...s.workouts,
        createWorkout(ex.id, [{ reps: +reps.value, weight: +weight.value || null }])
      ]
    }));

    reps.value = '';
    weight.value = '';
  };

  container.appendChild(card);
});
