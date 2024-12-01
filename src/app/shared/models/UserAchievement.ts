import { Achievement } from './Achievement';

export interface UserAchievementResponse {
  user_id: number;
  achievement_id: number;
  achievement: Achievement;
  current_value: number;
  achieved_at: string | null;
  started_at: string;
  achieved: boolean;
  exercise_id: number | null;
}

export interface UserAchievement {
  user_id: number;
  achievement_id: number;
  achievement: Achievement;
  current_value: number;
  achieved_at: Date | null;
  started_at: Date;
  achieved: boolean;
  exercise_id: number | null;
}

export interface UserAchievementAchieved extends UserAchievement {
  experience_history: {}
}

export const transformUserAchievement = (userAchievement: UserAchievementResponse): UserAchievement => {
  const { achieved_at, started_at, ...rest } = userAchievement;

  return {
    ...rest,
    achieved_at: achieved_at ? new Date(achieved_at) : null,
    started_at: new Date(started_at),
  };
};
