import { Component, inject, input, OnInit, ViewChild } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  IonActionSheet,
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  IonText,
  RefresherCustomEvent,
} from '@ionic/angular/standalone';
import { UserActivity, UserActivityType } from '../../../shared/models/UserActivity';
import { UserActivityComponent } from './user-activity/user-activity.component';
import { UserWorkoutActivityComponent } from './user-workout-activity/user-workout-activity.component';
import { UserActivityService } from '../../../shared/data-access/user-activity.service';
import { NgForOf, NgIf } from '@angular/common';
import { UserAchievementActivityComponent } from './user-achievement-activity/user-achievement-activity.component';
import { UserLevelUpActivityComponent } from './user-level-up-activity/user-level-up-activity.component';
import { UserFriendshipActivityComponent } from './user-friendship-activity/user-friendship-activity.component';
import { UserPersonalBestActivityComponent } from './user-personal-best-activity/user-personal-best-activity.component';

@Component({
  selector: 'app-user-activity-feed',
  templateUrl: './user-activity-feed.component.html',
  styleUrls: ['./user-activity-feed.component.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonButton,
    IonButtons,
    IonIcon,
    IonProgressBar,
    IonText,
    IonBadge,
    UserActivityComponent,
    UserWorkoutActivityComponent,
    IonRefresher,
    IonRefresherContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSkeletonText,
    NgIf,
    NgForOf,
    UserAchievementActivityComponent,
    UserLevelUpActivityComponent,
    UserFriendshipActivityComponent,
    IonActionSheet,
    UserPersonalBestActivityComponent,
  ],
})
export class UserActivityFeedComponent implements OnInit {
  userId = input.required<number>();

  @ViewChild('infiniteScroll') infiniteScroll?: IonInfiniteScroll;

  private activityService = inject(UserActivityService);

  activities: UserActivity[] = [];

  ngOnInit() {
    this.activityService.getActivities(this.userId()).subscribe(
      (activities) => {
        this.activities = activities;

        if (this.infiniteScroll && activities.length === 0) {
          this.infiniteScroll.disabled = true;
        }
      },
    );

    this.activityService.like$.subscribe((id) => {
      this.activities = this.activities.map((a) => a.id === id ? { ...a, likes: a.likes + 1, liked: true } : a);
    });

    this.activityService.unlike$.subscribe((id) => {
      this.activities = this.activities.map((a) => a.id === id ? { ...a, likes: a.likes - 1, liked: false } : a);
    });

    this.activityService.hide$.subscribe((id) => {
      this.activities = this.activities.map((a) => a.id === id ? { ...a, hidden: true } : a);
    });

    this.activityService.show$.subscribe((id) => {
      this.activities = this.activities.map((a) => a.id === id ? { ...a, hidden: false } : a);
    });
  }

  onIonRefresh(event: RefresherCustomEvent) {
    this.activityService.getActivities(this.userId()).subscribe(
      (activities) => {
        this.activities = activities;
        event.target.complete();

        if (this.infiniteScroll && activities.length > 0) {
          this.infiniteScroll.disabled = false;
        }
      },
    );
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    const offset = this.activities.length + 1;

    this.activityService.getActivities(this.userId(), offset).subscribe(
      (activities) => {
        this.activities = [...this.activities, ...activities];
        event.target.complete();

        if (activities.length === 0) {
          event.target.disabled = true;
        }
      },
    );
  }

  protected readonly UserActivityType = UserActivityType;
}
