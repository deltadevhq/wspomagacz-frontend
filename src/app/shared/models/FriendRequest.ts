export interface FriendRequestResponse {
  sender_id: number;
  receiver_id: number;
  requested_at: string;
  modified_at: string;
  status: string;
}

export interface FriendRequest {
  sender_id: number;
  receiver_id: number;
  requested_at: Date;
  modified_at: Date;
  status: FriendRequestStatus;
}

export const FriendRequestStatus = {
  Pending: 'pending',
  Accepted: 'accepted',
  Rejected: 'rejected',
} as const;

export type FriendRequestStatus = typeof FriendRequestStatus[keyof typeof FriendRequestStatus];

export const transformFriendRequest = (request: FriendRequestResponse): FriendRequest => {
  const { requested_at, modified_at, status, ...rest } = request;

  return {
    requested_at: new Date(requested_at),
    modified_at: new Date(modified_at),
    status: FriendRequestStatus[status as keyof typeof FriendRequestStatus],
    ...rest,
  };
};
