const Store = {
    state: {
        exercises: JSON.parse(localStorage.getItem('exercises')) || [],
        workouts: JSON.parse(localStorage.getItem('workouts')) || []
    },

    save() {
        localStorage.setItem('exercises', JSON.stringify(this.state.exercises));
        localStorage.setItem('workouts', JSON.stringify(this.state.workouts));
    },

    addExercise(name, muscle) {
        const newEx = { id: Date.now().toString(), name, muscle };
        this.state.exercises.push(newEx);
        this.save();
        return newEx;
    },

    addWorkout(exerciseId, sets) {
        const workout = {
            id: Date.now().toString(),
            exerciseId,
            timestamp: new Date().toISOString(),
            sets, // [{reps, weight}]
            totalVolume: sets.reduce((acc, s) => acc + (s.reps * s.weight), 0)
        };
        this.state.workouts.push(workout);
        this.save();
    }
};
