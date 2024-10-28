import { Exercise } from './Exercise';

/**
 * Raw workout data from the API.
 */
export interface WorkoutResponse {
  id: number;
  related_workout_id?: number;
  user_id: number;
  name: string;
  exercises: WorkoutExercise[];
  date: string;
  started_at?: string;
  finished_at?: string;
  status: WorkoutStatus;
  notes: string;
  exp: number;
}

export interface Workout {
  id: number;
  related_workout_id?: number | null;
  user_id: number;
  name: string;
  exercises: WorkoutExercise[];
  date: Date;
  started_at?: Date | null;
  finished_at?: Date | null;
  status: WorkoutStatus;
  notes?: string | null;
  exp: number;
}

export interface WorkoutRequest {
  id?: number | null;
  related_workout_id?: number | null;
  name: string;
  exercises: WorkoutExercise[];
  date: string;
  notes?: string | null;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: WorkoutExerciseSet[];
  order: number;
}

export interface WorkoutExerciseSet {
  reps: number;
  weight: number;
  order: number;
}

export const WorkoutStatus = {
  Completed: 'completed',
  InProgress: 'in_progress',
  Planned: 'planned',
  Skipped: 'skipped',
} as const;

export type WorkoutStatus = typeof WorkoutStatus[keyof typeof WorkoutStatus];

export const transformResponseToWorkout = (workout: WorkoutResponse): Workout => ({
  ...workout,
  date: new Date(workout.date),
  started_at: workout.started_at ? new Date(workout.started_at) : undefined,
  finished_at: workout.finished_at ? new Date(workout.finished_at) : undefined,
});

export const transformWorkoutToRequest = (workout: Workout): WorkoutRequest => ({
  id: workout.id,
  related_workout_id: workout.related_workout_id,
  name: workout.name,
  date: workout.date.toLocaleDateString('sv-SE'),
  exercises: workout.exercises,
  notes: workout.notes,
});
