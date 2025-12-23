import { getState } from '../state/store.js';
import { renderProgressChart } from '../charts/progress-chart.js';

const { workouts } = getState();
const canvas = document.getElementById('progressChart');

if (!workouts.length) {
  canvas.replaceWith(document.createTextNode('No data yet.'));
} else {
  renderProgressChart(canvas, workouts);
}
