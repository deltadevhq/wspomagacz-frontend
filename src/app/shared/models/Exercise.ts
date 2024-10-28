import { Equipment } from './Equipment';
import { Muscle } from './Muscle';

export interface Exercise {
  exercise_id: number;
  exercise_name: string;
  equipment: Equipment[];
  muscles: Muscle[];
  user_id: number | null;
  exercise_type: ExerciseType;
}

export const ExerciseType = {
  Standard: 'standard',
  Custom: 'custom',
  All: 'all',
} as const;

export type ExerciseType = typeof ExerciseType[keyof typeof ExerciseType];
