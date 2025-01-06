import { computed, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, filter, map, Observable, retry, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import Notification, { NotificationResponse, transformNotification } from '../models/Notification';

const NotificationRoutes = {
  Default: `${environment.baseUrl}notifications`,
  Events: `${environment.baseUrl}notifications/events`,
  Id: (id: number) => `${environment.baseUrl}notifications/${id}`,
  MarkAsRead: (id: number) => `${environment.baseUrl}notifications/${id}/mark-as-read`,
  MarkAllAsRead: `${environment.baseUrl}notifications/mark-as-read`,
} as const;

interface NotificationState {
  notifications: Notification[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  private eventSource?: EventSource;

  http = inject(HttpClient);
  authService = inject(AuthService);
  authUser$ = toObservable(this.authService.user);

  // sources
  notifications$ = this.getNotifications().pipe(
    retry({
      delay: () => this.authUser$.pipe(filter((user) => !!user)),
    }),
  );
  read$ = new Subject<number>();
  readAll$ = new Subject<void>();
  error$ = new Subject<string | null>();
  logout$ = this.authUser$.pipe(filter((user) => !user));

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
      .subscribe((notifications) => {
          this.state.update((state) => ({
            ...state,
            notifications,
          }));
        },
      );

    this.read$.pipe(takeUntilDestroyed()).subscribe((id) => {
      this.markNotificationAsRead(id).subscribe(() => {
        this.state.update((state) => ({
          ...state,
          notifications: state.notifications.map((notification) => {
            if (notification.id === id) {
              return {
                ...notification,
                read: true,
              };
            }

            return notification;
          }),
        }));
      });
    });

    this.readAll$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.markAllNotificationsAsRead().subscribe(() => {
          this.state.update((state) => ({
            ...state,
            notifications: state.notifications.map((notification) => ({
              ...notification,
              read: true,
            })),
          }));
        });
      });

    this.error$
      .pipe(takeUntilDestroyed())
      .subscribe((error) => {
          this.state.update((state) => ({
            ...state,
            error,
          }));
        },
      );

    this.getNotificationsEvents().subscribe((notification) => {
      this.state.update((state) => ({
        ...state,
        notifications: [notification, ...state.notifications],
      }));
    });

    this.logout$.subscribe(() => {
      this.state.update((state) => ({
        ...state,
        notifications: [],
        error: null,
      }));
    });
  }

  ngOnDestroy() {
    this.eventSource?.close();
  }

  getNotifications() {
    return this.http.get<NotificationResponse[]>(NotificationRoutes.Default).pipe(
      map((notifications) => notifications.map(transformNotification)),
      catchError((error) => {
          this.error$.next(error.message);
          return EMPTY;
        },
      ),
    );
  }

  getNotificationsEvents() {
    return new Observable<Notification>((observer) => {
      this.eventSource = new EventSource(NotificationRoutes.Events, { withCredentials: true });

      this.eventSource.onmessage = (event) => {
        const notification = JSON.parse(JSON.parse(event.data));

        observer.next(transformNotification(notification));
      };

      this.eventSource.onerror = (error) => {
        observer.error(error);
      };

      return () => {
        this.eventSource?.close();
      };
    });
  }

  getNotificationById(id: number) {
    return this.http.get<NotificationResponse>(NotificationRoutes.Id(id)).pipe(
      map(transformNotification),
      catchError((error) => {
          this.error$.next(error.message);
          return EMPTY;
        },
      ),
    );
  }

  markNotificationAsRead(id: number) {
    return this.http.post<NotificationResponse>(NotificationRoutes.MarkAsRead(id), {}).pipe(
      map(transformNotification),
      catchError((error) => {
          this.error$.next(error.message);
          return EMPTY;
        },
      ),
    );
  }

  markAllNotificationsAsRead() {
    return this.http.post<NotificationResponse[]>(NotificationRoutes.MarkAllAsRead, {}).pipe(
      map((notifications) => notifications.map(transformNotification)),
      catchError((error) => {
          this.error$.next(error.message);
          return EMPTY;
        },
      ),
    );
  }
}
