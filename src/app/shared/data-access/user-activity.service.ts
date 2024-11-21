import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, Subject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { transformActivity, UserActivity, UserActivityResponse } from '../models/UserActivity';

const UserActivityRoutes = {
  Default: `${environment.baseUrl}activities`,
  Id: (id: number) => `${environment.baseUrl}activities/${id}`,
  Show: (id: number) => `${environment.baseUrl}activities/${id}/show`,
  Hide: (id: number) => `${environment.baseUrl}activities/${id}/hide`,
  Like: (id: number) => `${environment.baseUrl}activities/${id}/like`,
  Unlike: (id: number) => `${environment.baseUrl}activities/${id}/unlike`,
  Friends: `${environment.baseUrl}activities/friends`,
} as const;

interface UserActivityState {
  activities: UserActivity[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserActivityService {
  private http = inject(HttpClient);

  activities$ = new Subject<UserActivity>();
  hide$ = new Subject<number>();
  show$ = new Subject<number>();
  delete$ = new Subject<number>();
  like$ = new Subject<number>();
  unlike$ = new Subject<number>();
  error$ = new Subject<string | null>();

  // state
  private state = signal<UserActivityState>({
    activities: [],
    error: null,
  });

  // selectors
  activities = computed(() => this.state().activities);
  error = computed(() => this.state().error);

  constructor() {
    this.error$.subscribe((error) => {
      this.state.update((state) => ({
        ...state,
        error,
      }));
    });

    this.hide$.subscribe((id) => {
      this.hideActivity(id).subscribe(() => {
        this.state.update((state) => ({
          ...state,
          activities: state.activities.map((a) => a.id === id ? { ...a, hidden: true } : a),
        }));
      });
    });

    this.show$.subscribe((id) => {
      this.showActivity(id).subscribe(() => {
        this.state.update((state) => ({
          ...state,
          activities: state.activities.map((a) => a.id === id ? { ...a, hidden: false } : a),
        }));
      });
    });

    this.delete$.subscribe((id) => {
      this.deleteActivity(id).subscribe(() => {
        this.state.update((state) => ({
          ...state,
          activities: state.activities.filter((a) => a.id !== id),
        }));
      });
    });

    this.like$.subscribe((id) => {
      this.likeActivity(id).subscribe(() => {
        this.state.update((state) => ({
          ...state,
          activities: state.activities.map((a) => a.id === id ? { ...a, liked: true } : a),
        }));
      });
    });

    this.unlike$.subscribe((id) => {
      this.unlikeActivity(id).subscribe(() => {
        this.state.update((state) => ({
          ...state,
          activities: state.activities.map((a) => a.id === id ? { ...a, liked: false } : a),
        }));
      });
    });

    this.activities$.subscribe((activity) => {
      this.state.update((state) => ({
        ...state,
        activities: state.activities.find((u) => u.id === activity.id) ? state.activities.map((a) => a.id === activity.id ? activity : a) : [...state.activities, activity],
      }));
    });
  }

  getActivities(userId?: number, offset?: number, limit?: number) {
    let url = `${UserActivityRoutes.Default}`;
    const params = new URLSearchParams();

    if (userId) params.append('user_id', userId.toString());
    if (offset) params.append('offset', offset.toString());
    if (limit) params.append('limit', limit.toString());

    url += `?${params.toString()}`;

    return this.http.get<UserActivityResponse[]>(url).pipe(
      map((activities) => activities.map(transformActivity)),
      tap((activities) => activities.forEach((activity) => this.activities$.next(activity))),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  getActivityById(id: number) {
    return this.http.get<UserActivityResponse>(UserActivityRoutes.Id(id)).pipe(
      map(transformActivity),
      tap((activity) => this.activities$.next(activity)),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  getFriendsActivities(offset?: number, limit?: number) {
    let url = `${UserActivityRoutes.Friends}`;

    const params = new URLSearchParams();

    if (offset) params.append('offset', offset.toString());
    if (limit) params.append('limit', limit.toString());

    url += `?${params.toString()}`;

    return this.http.get<UserActivityResponse[]>(url).pipe(
      map((activities) => activities.map(transformActivity)),
      tap((activities) => activities.forEach((activity) => this.activities$.next(activity))),
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  hideActivity(id: number) {
    return this.http.post(UserActivityRoutes.Hide(id), {}).pipe(
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  showActivity(id: number) {
    return this.http.post(UserActivityRoutes.Show(id), {}).pipe(
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  deleteActivity(id: number) {
    return this.http.delete(UserActivityRoutes.Id(id)).pipe(
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  likeActivity(id: number) {
    return this.http.post(UserActivityRoutes.Like(id), {}).pipe(
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }

  unlikeActivity(id: number) {
    return this.http.post(UserActivityRoutes.Unlike(id), {}).pipe(
      catchError((error) => {
        this.error$.next(error.message);
        return EMPTY;
      }),
    );
  }
}
