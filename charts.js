function renderProgressChart(canvasId, exerciseId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const data = Store.state.workouts
        .filter(w => w.exerciseId === exerciseId)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(w => new Date(w.timestamp).toLocaleDateString()),
            datasets: [{
                label: 'Volume (kg)',
                data: data.map(w => w.totalVolume),
                borderColor: '#0A84FF',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(10, 132, 255, 0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: '#38383A' } },
                x: { display: false }
            }
        }
    });
}
