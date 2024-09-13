import { User } from './User';

export interface MuscleGroup {
    id: number;
    name: string;
    description: string;
}

export interface Equipment {
    id: number;
    name: string;
    description: string;
}

export interface Exercise {
    id: number;
    name: string;
    description: string;
    muscle_groups: MuscleGroup[];
    equipment: Equipment[];
}

export interface Workout {
    id: number;
    related_workout_id: number | null;
    user: User;
    name: string;
    date: Date;
    started_at: Date | null;
    finished_at: Date | null;
    exercises: WorkoutExercise[];
}

export enum WorkoutExerciseStatus {
    Planned = 1,
    InProgress = 2,
    Skipped = 3,
    Done = 4,
}

export interface WorkoutExercise {
    exercise: Exercise;
    status: WorkoutExerciseStatus;
    sets: WorkoutExerciseSet[];
    order: number;
}

export interface WorkoutExerciseSet {
    repetitions: number;
    weight: number;
    order: number;
}
