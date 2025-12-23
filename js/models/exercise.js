export function createExercise(name, muscleGroup) {
  return {
    id: crypto.randomUUID(),
    name,
    muscleGroup: muscleGroup || null,
    createdAt: Date.now()
  };
}
