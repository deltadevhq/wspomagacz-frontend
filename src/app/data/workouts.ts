import {
    Exercise,
    User,
    UserGender,
    UserStatus,
    Workout,
    WorkoutExerciseStatus,
} from '../Workout';

export const user: User = {
    birthday: new Date('2001-08-21'),
    display_name: 'Remigiusz',
    exp: 0,
    height: 0,
    level: 1,
    weights: [],
    id: 1,
    username: 'user1',
    gender: UserGender.Male,
    status: UserStatus.Active,
    created_at: new Date(),
};

export const exercises: Exercise[] = [
    {
        id: 1,
        name: 'Exercise 1',
        description: 'Exercise 1 description',
        muscle_groups: [],
        equipment: [],
    },
    {
        id: 2,
        name: 'Exercise 2',
        description: 'Exercise 2 description',
        muscle_groups: [],
        equipment: [],
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
                    id: 1,
                    name: 'Exercise 1',
                    description: 'Exercise 1 description',
                    muscle_groups: [],
                    equipment: [
                        {
                            id: 1,
                            name: 'Equipment 1',
                            description: 'Equipment 1 description',
                        },
                    ],
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
