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

export enum UserStatus {
    Active = 1,
    Inactive = 2,
    Blocked = 3,
    Deleted = 4,
}

export enum UserGender {
    Male = 1,
    Female = 2,
    NotSpecified = 3,
}

export interface User {
    id: number;
    username: string;
    email: string;
    gender: UserGender;
    status: UserStatus;
    last_logged_at: Date | null;
    created_at: Date;
    modified_at: Date | null;
}

export interface Workout {
    id: number;
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
