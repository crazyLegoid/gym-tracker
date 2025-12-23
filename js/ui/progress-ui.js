import { renderProgressChart } from '../charts/progress-chart.js';
import { getWorkouts } from '../state/store.js';

window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas');
  if (!canvas) return;

  const workouts = getWorkouts();
  if (!workouts || workouts.length === 0) {
    canvas.parentElement.innerHTML = '<p style="color:#fff;text-align:center;margin-top:20px;">No workouts logged yet.</p>';
    return;
  }

  renderProgressChart(canvas, workouts);
});
