let db;
let currentExercise = null;
let chart;

const request = indexedDB.open("GymDB", 1);

request.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore("entries", { keyPath: "id", autoIncrement: true });
};

request.onsuccess = e => {
  db = e.target.result;
  preloadDummy();
  loadHome();
};

function preloadDummy() {
  const tx = db.transaction("entries", "readwrite");
  const store = tx.objectStore("entries");

  store.add({ name: "Manas vs Shreyas", weight: 40, reps: 10, time: new Date("2024-01-01") });
  store.add({ name: "Manas vs Shreyas", weight: 45, reps: 8, time: new Date("2024-02-01") });
  store.add({ name: "Manas vs Shreyas", weight: 50, reps: 6, time: new Date("2024-03-01") });
}

function loadHome() {
  showHome();
  const list = document.getElementById("exerciseList");
  list.innerHTML = "";

  const tx = db.transaction("entries", "readonly");
  const store = tx.objectStore("entries");
  store.getAll().onsuccess = e => {
    const exercises = [...new Set(e.target.result.map(x => x.name))];
    exercises.forEach(name => {
      list.innerHTML += `
        <div class="exercise-card" onclick="openExercise('${name}')">
          <strong>${name}</strong>
        </div>
      `;
    });
  };
}

function openExercise(name) {
  currentExercise = name;
  document.getElementById("exerciseTitle").innerText = name;
  showScreen("exercise");

  const list = document.getElementById("entryList");
  list.innerHTML = "";

  const tx = db.transaction("entries", "readonly");
  tx.objectStore("entries").getAll().onsuccess = e => {
    e.target.result
      .filter(x => x.name === name)
      .forEach(x => {
        list.innerHTML += `
          <div class="entry">
            ${x.weight} kg × ${x.reps} reps<br>
            <small>${new Date(x.time).toLocaleString()}</small>
          </div>
        `;
      });
  };
}

function showProgress() {
  showScreen("progress");
  drawChart();
}

function drawChart() {
  const ctx = document.getElementById("chart");

  const tx = db.transaction("entries", "readonly");
  tx.objectStore("entries").getAll().onsuccess = e => {
    const data = e.target.result.filter(x => x.name === "Manas vs Shreyas");

    const labels = data.map(x => new Date(x.time).toLocaleDateString());
    const volumes = data.map(x => x.weight * x.reps);

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Volume Progress",
          data: volumes,
          borderWidth: 3
        }]
      }
    });
  };
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function showHome() { showScreen("home"); }
function goHome() { loadHome(); }