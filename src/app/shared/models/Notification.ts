export default interface Notification {
  id: number;
  user_id: number;
  user: {
    id: number;
    display_name: string;
    //avatar: string;
  }
  creator: {
    id: number;
    display_name: string;
    //avatar: string;
  }
  type: string;
  read: boolean;
  created_by: number;
  created_at: Date;
  updated_at: Date;
  data: any;
}

export interface NotificationResponse {
  id: number;
  user_id: number;
  user: {
    id: number;
    display_name: string;
    //avatar: string;
  }
  creator: {
    id: number;
    display_name: string;
    //avatar: string;
  }
  type: string;
  read: boolean;
  created_by: number;
  created_at: string;
  updated_at: string;
  data: any;
}

export const NotificationType = {
  FriendRequest: 'friend_request',
  FriendRequestAccepted: 'friend_request_accepted',
  LevelUp: 'level_up',
  Workout: 'workout',
  System: 'system',
  WorkoutClosedByJob: 'workout_closed_by_job',
} as const;

export type NotificationType = typeof NotificationType[keyof typeof NotificationType];

export const transformNotification = (notification: NotificationResponse): Notification => {
  const { created_at, updated_at, type, ...rest } = notification;

  return {
    ...rest,
    type: type as NotificationType,
    created_at: new Date(created_at),
    updated_at: new Date(updated_at),
  };
};
