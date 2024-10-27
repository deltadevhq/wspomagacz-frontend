import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, filter, retry, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { webSocket } from 'rxjs/webSocket';
import Notification from '../models/Notification';

const NotificationRoutes = {
  Default: `${environment.baseUrl}notifications`,
  Id: (id: number) => `${environment.baseUrl}notifications/${id}`,
  MarkAsRead: (id: number) => `${environment.baseUrl}notifications/${id}/mark-as-read`,
  MarkAllAsRead: `${environment.baseUrl}notifications/mark-all-as-read`,
} as const;

interface NotificationState {
  notifications: Notification[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationsSocket = webSocket<Notification>('ws://localhost:3030/');

  http = inject(HttpClient);
  authService = inject(AuthService);
  authUser$ = toObservable(this.authService.user);

  // sources
  notifications$ = this.getNotifications().pipe(
    retry({
      delay: () => this.authUser$.pipe(filter((user) => !!user)),
    }),
  );
  error$ = new Subject<string | null>();

  // state
  private state = signal<NotificationState>({
    notifications: [],
    error: null,
  });

  // selectors
  notifications = computed(() => this.state().notifications);
  error = computed(() => this.state().error);

  constructor() {
    // reducers
    this.notifications$
      .pipe(takeUntilDestroyed())
      .subscribe((notifications) =>
        this.state.update((state) => ({
          ...state,
          notifications,
        })),
      );

    this.error$
      .pipe(takeUntilDestroyed())
      .subscribe((error) =>
        this.state.update((state) => ({
          ...state,
          error,
        })),
      );

    this.notificationsSocket.subscribe((notification) => {
      this.state.update((state) => ({
        ...state,
        notifications: [...state.notifications, notification],
      }));
    });
  }

  getNotifications() {
    return this.http.get<Notification[]>(NotificationRoutes.Default).pipe(
      catchError((error) => {
          this.error$.next(error.message);
          return EMPTY;
        },
      ),
    );
  }

  getNotificationById(id: number) {
    return this.http.get<Notification>(NotificationRoutes.Id(id)).pipe(
      catchError((error) => {
          this.error$.next(error.message);
          return EMPTY;
        },
      ),
    );
  }

  markNotificationAsRead(id: number) {
    return this.http.put(NotificationRoutes.MarkAsRead(id), {}).pipe(
      catchError((error) => {
          this.error$.next(error.message);
          return EMPTY;
        },
      ),
    );
  }

  markAllNotificationsAsRead() {
    return this.http.put(NotificationRoutes.MarkAllAsRead, {}).pipe(
      catchError((error) => {
          this.error$.next(error.message);
          return EMPTY;
        },
      ),
    );
  }
}
