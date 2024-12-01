import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, filter, map, retry, Subject } from 'rxjs';
import { FriendRequest, FriendRequestResponse, transformFriendRequest } from '../models/FriendRequest';
import { Friend, FriendResponse, transformFriend } from '../models/User';
import { AuthService } from './auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';

const FriendRoutes = {
  Add: (userId: number) => `${environment.baseUrl}friends/request/${userId}`,
  Reject: (userId: number) => `${environment.baseUrl}friends/reject/${userId}`,
  Accept: (userId: number) => `${environment.baseUrl}friends/accept/${userId}`,
  Id: (userId: number) => `${environment.baseUrl}friends/${userId}`,
  Default: `${environment.baseUrl}friends`,
  Requests: `${environment.baseUrl}friends/requests`,
};

interface FriendState {
  friendRequests: FriendRequest[];
  friends: Friend[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private authUser$ = toObservable(this.authService.user);

  state = signal<FriendState>({
    friendRequests: [],
    friends: [],
    error: null,
  });

  friendRequests = computed(() => this.state().friendRequests);
  friends = computed(() => this.state().friends);
  error = computed(() => this.state().error);

  friendRequests$ = this.getFriendRequests().pipe(
    retry({
      delay: () => this.authUser$.pipe(filter((user) => !!user)),
    }),
  );

  friends$ = this.getFriends().pipe(
    retry({
      delay: () => this.authUser$.pipe(filter((user) => !!user)),
    }),
  );

  error$ = new Subject<string | null>();

  add$ = new Subject<number>();
  reject$ = new Subject<number>();
  remove$ = new Subject<number>();

  constructor() {
    this.friendRequests$.subscribe(
      (friendRequests) => this.state.update(
        (state) => ({
          ...state,
          friendRequests,
        }),
      ),
    );

    this.friends$.subscribe(
      (friends) => this.state.update(
        (state) => ({
          ...state,
          friends,
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
  }

  getFriends() {
    return this.http.get<FriendResponse[]>(FriendRoutes.Default).pipe(
      map((friends) => friends.map(transformFriend)),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  getFriendRequests() {
    return this.http.get<FriendRequestResponse[]>(FriendRoutes.Requests).pipe(
      map((requests) => requests.map(transformFriendRequest)),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  addFriend(userId: number) {
    return this.http.post<FriendRequestResponse>(FriendRoutes.Add(userId), {}).pipe(
      map(transformFriendRequest),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  rejectFriend(userId: number) {
    return this.http.post<FriendRequestResponse>(FriendRoutes.Reject(userId), {}).pipe(
      map(transformFriendRequest),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  acceptFriend(userId: number) {
    return this.http.post<FriendRequestResponse>(FriendRoutes.Accept(userId), {}).pipe(
      map(transformFriendRequest),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  removeFriend(userId: number) {
    return this.http.delete(FriendRoutes.Id(userId)).pipe(
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }
}
