import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, Subject, tap } from 'rxjs';
import { FriendRequest, FriendRequestResponse, transformFriendRequest } from '../models/FriendRequest';
import { AuthService } from './auth.service';

const FriendRoutes = {
  Add: (userId: number) => `/api/friends/request/${userId}`,
  Reject: (userId: number) => `/api/friends/reject/${userId}`,
  Accept: (userId: number) => `/api/friends/accept/${userId}`,
  Id: (userId: number) => `/api/friends/${userId}`,
  Default: '/api/friends',
};

interface FriendState {
  friendRequests: FriendRequest[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  state = signal<FriendState>({
    friendRequests: [],
    error: null,
  });

  friendRequests = computed(() => this.state().friendRequests);
  error = computed(() => this.state().error);

  friends$ = new Subject<FriendRequest>();
  error$ = new Subject<string | null>();

  add$ = new Subject<number>();
  reject$ = new Subject<number>();
  remove$ = new Subject<number>();

  constructor() {
    this.friends$.subscribe(
      (friend) => this.state.update(
        (state) => ({
          ...state,
          friendRequests: [...state.friendRequests, friend],
        }),
      ),
    );

    this.error$.subscribe(
      (error) => this.state.update(
        (state) => ({
          ...state,
          error,
        }),
      ),
    );

    this.getFriends().subscribe();
  }

  getFriends() {
    return this.http.get<FriendRequestResponse[]>(FriendRoutes.Default).pipe(
      map((friends) => friends.map(transformFriendRequest)),
      tap((friends) => friends.forEach((friend) => this.friends$.next(friend))),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  addFriend(userId: number) {
    return this.http.post<FriendRequestResponse>(FriendRoutes.Add(userId), {}).pipe(
      map(transformFriendRequest),
      tap((friend) => this.friends$.next(friend)),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  rejectFriend(userId: number) {
    return this.http.post<FriendRequestResponse>(FriendRoutes.Reject(userId), {}).pipe(
      map(transformFriendRequest),
      tap((friend) => this.friends$.next(friend)),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  acceptFriend(userId: number) {
    return this.http.post<FriendRequestResponse>(FriendRoutes.Accept(userId), {}).pipe(
      map(transformFriendRequest),
      tap((friend) => this.friends$.next(friend)),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  removeFriend(userId: number) {
    return this.http.delete(FriendRoutes.Id(userId));
  }
}
