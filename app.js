document.addEventListener('DOMContentLoaded', () => {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const bodyMetrics = JSON.parse(localStorage.getItem('bodyMetrics')) || [];

    const workoutList = document.getElementById('workout-list');
    const exerciseList = document.getElementById('exercise-list');
    const bodyMetricList = document.getElementById('body-metric-list');

    // Setze das Datumsfeld auf heute
    const dateInput = document.getElementById('body-metric-date');
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    dateInput.value = today;

    // Workout hinzufügen
    document.getElementById('add-workout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const workoutName = document.getElementById('workout-name').value;
        workouts.push({ name: workoutName, exercises: [] });
        saveWorkouts();
        renderWorkouts();
        e.target.reset();
    });

    // Übung hinzufügen
    document.getElementById('add-exercise-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const exerciseName = document.getElementById('exercise-name').value;
        const exerciseWeight = document.getElementById('exercise-weight').value;
        const exerciseReps = document.getElementById('exercise-reps').value;
        if (workouts.length > 0) {
            workouts[workouts.length - 1].exercises.push({
                name: exerciseName,
                weight: exerciseWeight,
                reps: exerciseReps
            });
            saveWorkouts();
            renderExercises();
        }
        e.target.reset();
    });

    // Körperwert hinzufügen
    document.getElementById('add-body-metric-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('body-metric-date').value;
        const weight = document.getElementById('body-metric-weight').value;
        const unit = document.getElementById('body-metric-unit').value;
        bodyMetrics.push({ date, weight, unit });
        saveBodyMetrics();
        renderBodyMetrics();
        e.target.reset();

        // Setze das Datumsfeld zurück auf heute
        dateInput.value = today;
    });

    // Workouts speichern
    function saveWorkouts() {
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    // Körperwerte speichern
    function saveBodyMetrics() {
        localStorage.setItem('bodyMetrics', JSON.stringify(bodyMetrics));
    }

    // Workouts anzeigen
    function renderWorkouts() {
        workoutList.innerHTML = workouts.map((workout, index) => `
            <li>
                <strong>${workout.name}</strong>
                <ul>
                    ${workout.exercises.map((exercise) => `
                        <li>${exercise.name}: ${exercise.weight}kg x ${exercise.reps}</li>
                    `).join('')}
                </ul>
            </li>
        `).join('');
    }

    // Übungen anzeigen
    function renderExercises() {
        if (workouts.length > 0) {
            const lastWorkout = workouts[workouts.length - 1];
            exerciseList.innerHTML = lastWorkout.exercises.map((exercise) => `
                <li>${exercise.name}: ${exercise.weight}kg x ${exercise.reps}</li>
            `).join('');
        }
    }

    // Körperwerte anzeigen
    function renderBodyMetrics() {
        bodyMetricList.innerHTML = bodyMetrics.map((metric) => `
            <li>${metric.date}: ${metric.weight}${metric.unit}</li>
        `).join('');
    }

    // Initial rendern
    renderWorkouts();
    renderExercises();
    renderBodyMetrics();
});