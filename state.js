export let state = {
  exercises: [],
  workouts: [],
};

export function initState() {
  const data = loadStorage();
  state.exercises = data.exercises || [];
  state.workouts = data.workouts || [];
}