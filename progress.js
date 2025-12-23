import { state } from './state.js';
import Chart from '../libs/chart.min.js';

let chart;

export function renderChart(exerciseId, range = 'daily') {
  const data = state.workouts.filter(w => w.exerciseId === exerciseId);
  const labels = data.map(w => new Date(w.timestamp).toLocaleDateString());
  const volumes = data.map(w => w.sets.reduce((t, s) => t + s.reps * s.weight, 0));

  if(chart) chart.destroy();
  chart = new Chart(document.getElementById('progressChart'), {
    type: 'line',
    data: { labels, datasets: [{ label: 'Volume', data: volumes, borderWidth: 2, tension: 0.4 }] },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}