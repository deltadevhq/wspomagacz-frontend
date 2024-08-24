import {Exercise, User, UserGender, UserStatus, Workout, WorkoutExerciseStatus} from "../Workout";

const today = new Date();

export const user: User = {
    id: 1,
    username: "user1",
    email: "user1@example.com",
    gender: UserGender.Male,
    status: UserStatus.Active,
    last_logged_at: new Date(),
    created_at: new Date(),
    modified_at: new Date(),
}

export const exercises: Exercise[] = [
    {
        id: 1,
        name: "Exercise 1",
        description: "Exercise 1 description",
        muscle_groups: [],
        equipment: [],
    },
    {
        id: 2,
        name: "Exercise 2",
        description: "Exercise 2 description",
        muscle_groups: [],
        equipment: [],
    },
]

export const workouts: Workout[] = [
    {
        id: 1,
        user: user,
        name: "Workout 1",
        date: new Date(),
        started_at: new Date(),
        finished_at: new Date(),
        exercises: [
            {
                exercise: exercises[0],
                status: WorkoutExerciseStatus.Done,
                sets: [
                    {
                        weight: 10,
                        repetitions: 10,
                        order: 1
                    },
                    {
                        weight: 20,
                        repetitions: 20,
                        order: 2
                    },
                ],
                order: 1
            }
        ]
    },
    {
        id: 2,
        user: user,
        name: "Workout 2",
        date: new Date("2024-08-25"),
        started_at: null,
        finished_at: null,
        exercises: [
            {
                exercise: exercises[0],
                status: WorkoutExerciseStatus.Planned,
                sets: [],
                order: 1
            }
        ]
    },
]

