import { renderProgressChart } from '../charts/progress-chart.js';
import { getWorkouts } from '../state/store.js';

// Wait for window load to ensure canvas exists
window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas');
  if (!canvas) {
    console.warn('No canvas found on this page.');
    return;
  }

  const workouts = getWorkouts();
  if (!workouts || workouts.length === 0) {
    // Clear canvas area and show message
    canvas.parentElement.innerHTML = '<p style="color:#fff;text-align:center;margin-top:20px;">No workouts logged yet.</p>';
    return;
  }

  renderProgressChart(canvas, workouts);
});
