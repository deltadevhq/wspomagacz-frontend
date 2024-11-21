import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transformUser, User, UserResponse } from '../models/User';
import { environment } from '../../../environments/environment';
import { catchError, EMPTY, map, Subject, tap } from 'rxjs';

const UserRoutes = {
  Id: (id: number) => `${environment.baseUrl}users/${id}`,
} as const;

interface UserState {
  users: User[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  users$ = new Subject<User>();
  error$ = new Subject<string | null>();

  // state
  private state = signal<UserState>({
    users: [],
    error: null,
  });

  // selectors
  users = computed(() => this.state().users);
  error = computed(() => this.state().error);

  constructor() {
    this.error$.subscribe((error) => {
      this.state.update((state) => ({
        ...state,
        error,
      }));
    });

    this.users$.subscribe((user) => {
      this.state.update((state) => ({
        ...state,
        // If the user is already in the state, update it. Otherwise, add it to the state.
        users: state.users.find((u) => u.id === user.id) ? state.users.map((u) => u.id === user.id ? user : u) : [...state.users, user],
      }));
    });
  }

  getUserById(id: number) {
    return this.http.get<UserResponse>(UserRoutes.Id(id)).pipe(
      map(transformUser),
      tap((user) => this.users$.next(user)),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  getUserSearchById(query: string) {
    return this.http.get<UserResponse>(`${environment.baseUrl}users/search?id=${query}`).pipe(
      map(transformUser),
      tap((user) => this.users$.next(user)),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }
}
