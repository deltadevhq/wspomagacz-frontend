import { Exercise } from './Exercise';
import { UserAchievement } from './UserAchievement';

/**
 * Raw workout data from the API.
 */
export interface WorkoutResponse {
  /**
   * Unique identifier of the workout.
   */
  id: number;

  /**
   * Identifier of the related workout.
   */
  related_workout_id?: number;

  /**
   * Identifier of the user who created the workout.
   */
  user_id: number;

  /**
   * Name of the workout.
   */
  name: string;

  /**
   * List of exercises in the workout along with sets.
   */
  exercises: WorkoutExercise[];

  /**
   * Date of the workout.
   */
  date: string;

  /**
   * Time when the workout was started.
   */
  started_at?: string;

  /**
   * Time when the workout was finished.
   */
  finished_at?: string;

  /**
   * Status of the workout.
   */
  status: string;

  /**
   * Notes about the workout.
   */
  notes: string;

  /**
   * Duration of the workout in seconds.
   */
  exp: number;
}

/**
 * Object representing a workout.
 */
export interface Workout {

  /**
   * Unique identifier of the workout.
   */
  id: number;

  /**
   * Identifier of the related workout.
   */
  related_workout_id?: number | null;

  /**
   * Identifier of the user who created the workout.
   */
  user_id: number;

  /**
   * Name of the workout.
   */
  name: string;

  /**
   * List of exercises in the workout along with sets.
   */
  exercises: WorkoutExercise[];

  /**
   * Date of the workout.
   */
  date: Date;

  /**
   * Time when the workout was started.
   */
  started_at?: Date | null;

  /**
   * Time when the workout was finished.
   */
  finished_at?: Date | null;

  /**
   * Status of the workout.
   */
  status: WorkoutStatus;

  /**
   * Notes about the workout.
   */
  notes?: string | null;
}

/**
 * Object representing a workout request used to create or update a workout.
 * @remarks User ID is not included in the request data as it is determined by the authentication token.
 */
export interface WorkoutRequest {
  /**
   * Unique identifier of the workout. Present when updating a workout.
   */
  id?: number | null;

  /**
   * Identifier of the related workout.
   */
  related_workout_id?: number | null;

  /**
   * Name of the workout.
   */
  name: string;

  /**
   * Name of the workout.
   */
  exercises: WorkoutExercise[];

  /**
   * List of exercises in the workout.
   */
  date: string;

  /**
   * Notes about the workout.
   */
  notes?: string | null;
}

/**
 * Object representing an exercise in a workout.
 */
export interface WorkoutExercise {
  /**
   * Exercise object.
   */
  exercise: Exercise;

  /**
   * List of sets for the exercise.
   */
  sets: WorkoutExerciseSet[];

  /**
   * Order of the exercise in the workout.
   */
  order: number;
}


/**
 * Object representing a set of an exercise in a workout.
 */
export interface WorkoutExerciseSet {
  /**
   * Number of repetitions in the set.
   */
  reps: number;

  /**
   * Weight used in the set.
   */
  weight: number;

  /**
   * Order of the set in the exercise.
   */
  order: number;
}

/**
 * Enum representing the status of a workout.
 */
export const WorkoutStatus = {
  /**
   * Workout is completed.
   */
  Completed: 'completed',

  /**
   * Workout is in progress.
   */
  InProgress: 'in_progress',

  /**
   * Workout is planned.
   */
  Planned: 'planned',

  /**
   * Workout is skipped due to not completing it in time.
   */
  Skipped: 'skipped',
} as const;

/**
 * Type representing the status of a workout.
 */
export type WorkoutStatus = typeof WorkoutStatus[keyof typeof WorkoutStatus];

/**
 * Object representing a workout summary response from the API.
 */
export interface WorkoutSummaryResponse {
  /**
   * Unique identifier of the workout.
   */
  id: number;

  /**
   * Identifier of the related workout.
   */
  related_workout_id?: number;

  /**
   * Identifier of the user who created the workout.
   */
  user_id: number;

  /**
   * Name of the workout.
   */
  name: string;

  /**
   * List of exercises in the workout along with sets
   */
  exercises: WorkoutExercise[];

  /**
   * Date of the workout.
   */
  date: string;

  /**
   * Time when the workout was started.
   */
  started_at?: string;

  /**
   * Time when the workout was finished.
   */
  finished_at?: string;

  /**
   * Status of the workout.
   */
  status: WorkoutStatus;

  /**
   * Notes about the workout.
   */
  notes: string;

  /**
   * Duration of the workout in seconds.
   */
  duration: number;

  /**
   * Total weight lifted in the workout.
   */
  total_weight: number;

  /**
   * Experience points before the workout.
   */
  exp_before: number;

  /**
   * Experience points after the workout.
   */
  exp_after: number;

  /**
   * Experience points granted by the workout.
   */
  exp_granted: number;

  /**
   * Level before the workout.
   */
  lvl_before: number;

  /**
   * Level after the workout.
   */
  lvl_after: number;

  /**
   * List of achievements unlocked by the workout.
   */
  achievements: UserAchievement[];
}

/**
 * Object representing a workout summary.
 */
export interface WorkoutSummary {
  /**
   * Unique identifier of the workout.
   */
  id: number;

  /**
   * Identifier of the related workout.
   */
  related_workout_id?: number;

  /**
   * Identifier of the user who created the workout.
   */
  user_id: number;

  /**
   * Name of the workout.
   */
  name: string;

  /**
   * List of exercises in the workout along with sets.
   */
  exercises: WorkoutExercise[];

  /**
   * Date of the workout.
   */
  date: Date;

  /**
   * Time when the workout was started.
   */
  started_at?: Date;

  /**
   * Time when the workout was finished.
   */
  finished_at?: Date;

  /**
   * Status of the workout.
   */
  status: WorkoutStatus;

  /**
   * Notes about the workout.
   */
  notes: string;

  /**
   * Duration of the workout in seconds.
   */
  duration: number;

  /**
   * Total weight lifted in the workout.
   */
  total_weight: number;

  /**
   * Experience points before the workout.
   */
  exp_before: number;

  /**
   * Experience points after the workout.
   */
  exp_after: number;

  /**
   * Experience points granted by the workout.
   */
  exp_granted: number;

  /**
   * Level before the workout.
   */
  lvl_before: number;

  /**
   * Level after the workout.
   */
  lvl_after: number;

  /**
   * List of achievements unlocked by the workout.
   */
  achievements: UserAchievement[];
}

/**
 * Transform a workout response from the API to a workout object.
 * @param workoutResponse - Workout response from the API.
 */
export const transformResponseToWorkout = (workoutResponse: WorkoutResponse): Workout => {
  const { date, started_at, finished_at, status, ...rest } = workoutResponse;

  return {
    ...rest,
    date: new Date(date),
    status: status as WorkoutStatus,
    started_at: started_at ? new Date(started_at) : undefined,
    finished_at: finished_at ? new Date(finished_at) : undefined,
  };
};

/**
 * Transform a workout object to a workout request.
 * @param workout - Workout object.
 */
export const transformWorkoutToRequest = (workout: Workout): WorkoutRequest => ({
  id: workout.id,
  related_workout_id: workout.related_workout_id,
  name: workout.name,
  date: workout.date.toLocaleDateString('sv-SE'),
  exercises: workout.exercises,
  notes: workout.notes,
});

/**
 * Transform a workout summary response from the API to a workout summary object.
 * @param summary - Workout summary response from the API.
 */
export const transformWorkoutSummary = (summary: WorkoutSummaryResponse): WorkoutSummary => {
  const { date, started_at, finished_at, ...rest } = summary;

  return {
    ...rest,
    date: new Date(date),
    started_at: started_at ? new Date(started_at) : undefined,
    finished_at: finished_at ? new Date(finished_at) : undefined,
  };
};
