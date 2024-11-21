export interface UserActivityResponse {
  id: number;
  user_id: number;
  user: {
    id: number;
    display_name: string;
  }
  type: string;
  data: any;
  hidden: boolean;
  created_by: number;
  creator: {
    id: number;
    display_name: string;
  }
  created_at: string;
  updated_at: string;
  likes: number;
  liked: boolean;
}

export interface UserActivity {
  id: number;
  user_id: number;
  user: {
    id: number;
    display_name: string;
  }
  type: UserActivityType;
  data: any;
  hidden: boolean;
  created_by: number;
  creator: {
    id: number;
    display_name: string;
  }
  created_at: Date;
  updated_at: Date;
  likes: number;
  liked: boolean;
}

export const UserActivityType = {
  Workout: 'workout',
  LevelUp: 'level_up',
  Achievement: 'achievement',
  Friendship: 'friendship',
  PersonalBest: 'personal_best',
} as const;

export type UserActivityType = typeof UserActivityType[keyof typeof UserActivityType];

export const transformActivity = (activity: UserActivityResponse): UserActivity => {
  const { type, created_at, updated_at, ...rest } = activity;

  return ({
    ...rest,
    type: type as UserActivityType,
    created_at: new Date(created_at),
    updated_at: new Date(updated_at),
  });
};
