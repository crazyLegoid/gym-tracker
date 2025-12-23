const Store = {
    state: {
        exercises: JSON.parse(localStorage.getItem('exercises')) || [],
        workouts: JSON.parse(localStorage.getItem('workouts')) || []
    },
    save() {
        localStorage.setItem('exercises', JSON.stringify(this.state.exercises));
        localStorage.setItem('workouts', JSON.stringify(this.state.workouts));
    },
    addExercise(name) {
        this.state.exercises.push({ id: Date.now().toString(), name });
        this.save();
    }
};
