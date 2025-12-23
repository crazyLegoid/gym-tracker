export function renderProgressChart(canvas, workouts) {
  if (!canvas || !workouts || workouts.length === 0) return;

  const labels = workouts.map(w => {
    const d = new Date(w.timestamp);
    return `${d.getDate()}/${d.getMonth()+1}`;
  });

  const data = workouts.map(w =>
    w.sets.reduce((sum, s) => sum + s.reps * (s.weight || 1), 0)
  );

  if (canvas.chartInstance) {
    canvas.chartInstance.destroy();
  }

  canvas.chartInstance = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Total Volume',
        data,
        borderColor: '#00e676',
        backgroundColor: 'rgba(0,230,118,0.2)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
        y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
      }
    }
  });
}
