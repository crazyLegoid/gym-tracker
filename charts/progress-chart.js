export function renderProgressChart(canvas, workouts) {
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: workouts.map(w => new Date(w.timestamp).toLocaleDateString()),
      datasets: [{
        data: workouts.map(w =>
          w.sets.reduce((t, s) => t + s.reps * (s.weight || 1), 0)
        ),
        borderColor: '#00e676',
        tension: 0.3
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#9a9a9a' } },
        y: { ticks: { color: '#9a9a9a' } }
      }
    }
  });
}
