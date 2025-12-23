export function createWorkout(exerciseId, sets) {
  return {
    id: crypto.randomUUID(),
    exerciseId,
    sets,
    timestamp: Date.now()
  };
}
