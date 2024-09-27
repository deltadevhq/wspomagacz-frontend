import { Exercise, Workout, WorkoutExerciseStatus } from '../models/Workout';
import { User, UserGender, UserStatus } from '../models/User';

export const user: User = {
    birthday: new Date('2001-08-21'),
    display_name: 'Remigiusz',
    exp: 12,
    height: 0,
    level: 10,
    weights: [],
    id: 1,
    username: 'user1',
    gender: UserGender.Male,
    status: UserStatus.Active,
    created_at: new Date(),
    modified_at: new Date(),
    last_logged_at: new Date(),
};

export const exercises: Exercise[] = [
    {
        exercise_id: 1,
        exercise_name: 'Exercise 1',
        description: 'Exercise 1 description',
        muscle_groups: [],
        equipment: [],
        exercise_type: 'standard',
    },
    {
        exercise_id: 2,
        exercise_name: 'Exercise 2',
        description: 'Exercise 2 description',
        muscle_groups: [],
        equipment: [],
        exercise_type: 'standard',
    },
];

export const workouts: Workout[] = [
    {
        id: 1,
        related_workout_id: null,
        user: user,
        name: 'Workout 1',
        date: new Date('2024-08-26'),
        started_at: new Date('2024-08-21T10:00:00'),
        finished_at: new Date('2024-08-21T11:00:00'),
        exercises: [
            {
                exercise: {
                    exercise_id: 1,
                    exercise_name: 'Exercise 1',
                    description: 'Exercise 1 description',
                    muscle_groups: [],
                    equipment: [
                        {
                            id: 1,
                            name: 'Equipment 1',
                            description: 'Equipment 1 description',
                        },
                    ],
                    exercise_type: 'standard',
                },
                status: WorkoutExerciseStatus.Done,
                sets: [
                    {
                        weight: 10,
                        repetitions: 10,
                        order: 1,
                    },
                    {
                        weight: 20,
                        repetitions: 20,
                        order: 2,
                    },
                ],
                order: 1,
            },
        ],
    },
    {
        id: 2,
        related_workout_id: null,
        user: user,
        name: 'Workout 2',
        date: new Date('2024-08-27'),
        started_at: new Date(),
        finished_at: null,
        exercises: [
            {
                exercise: exercises[0],
                status: WorkoutExerciseStatus.Done,
                sets: [
                    {
                        weight: 10,
                        repetitions: 10,
                        order: 1,
                    },
                    {
                        weight: 20,
                        repetitions: 20,
                        order: 2,
                    },
                ],
                order: 1,
            },
        ],
    },
    {
        id: 3,
        related_workout_id: 1,
        user: user,
        name: 'Workout 3',
        date: new Date('2024-08-28'),
        started_at: null,
        finished_at: null,
        exercises: [
            {
                exercise: exercises[0],
                status: WorkoutExerciseStatus.Done,
                sets: [
                    {
                        weight: 10,
                        repetitions: 10,
                        order: 1,
                    },
                    {
                        weight: 20,
                        repetitions: 20,
                        order: 2,
                    },
                ],
                order: 1,
            },
        ],
    },
    {
        id: 4,
        related_workout_id: null,
        user: user,
        name: 'Workout 4',
        date: new Date('2024-08-29'),
        started_at: null,
        finished_at: null,
        exercises: [
            {
                exercise: exercises[0],
                status: WorkoutExerciseStatus.Planned,
                sets: [],
                order: 1,
            },
        ],
    },
];
