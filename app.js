let db;
let chart;

const request = indexedDB.open("GymDB", 1);

request.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore("entries", { keyPath: "id", autoIncrement: true });
};

request.onsuccess = e => {
  db = e.target.result;
  loadEntries();
};

function addEntry() {
  const entry = {
    name: name.value,
    weight: Number(weight.value),
    reps: Number(reps.value),
    time: new Date().toISOString()
  };

  const tx = db.transaction("entries", "readwrite");
  tx.objectStore("entries").add(entry);
  tx.oncomplete = loadEntries;
}

function deleteEntry(id) {
  const tx = db.transaction("entries", "readwrite");
  tx.objectStore("entries").delete(id);
  tx.oncomplete = loadEntries;
}

function loadEntries() {
  const tx = db.transaction("entries", "readonly");
  const store = tx.objectStore("entries");
  const req = store.getAll();

  req.onsuccess = () => {
    render(req.result);
    plot(req.result);
  };
}

function render(entries) {
  entriesDiv.innerHTML = "";
  entries.reverse().forEach(e => {
    entriesDiv.innerHTML += `
      <div class="entry">
        <span class="delete" onclick="deleteEntry(${e.id})">✕</span>
        <strong>${e.name}</strong><br>
        ${e.weight} kg × ${e.reps} reps<br>
        <small>${new Date(e.time).toLocaleString()}</small>
      </div>
    `;
  });
}

function plot(entries) {
  const labels = entries.map(e => new Date(e.time).toLocaleDateString());
  const data = entries.map(e => e.weight * e.reps);

  if (chart) chart.destroy();

  chart = new Chart(progressChart, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Volume",
        data,
        borderWidth: 2
      }]
    }
  });
}