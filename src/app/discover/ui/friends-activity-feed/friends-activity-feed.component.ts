import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserActivity } from '../../../shared/models/UserActivity';
import { UserActivityService } from '../../../shared/data-access/user-activity.service';
import { RefresherCustomEvent } from '@ionic/angular';
import {
  InfiniteScrollCustomEvent,
  IonIcon,
  IonInfiniteScroll,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  IonText,
} from '@ionic/angular/standalone';
import { NgForOf } from '@angular/common';
import {
  UserAchievementActivityComponent,
} from '../../../user-details/ui/user-activity-feed/user-achievement-activity/user-achievement-activity.component';
import {
  UserActivityComponent,
} from '../../../user-details/ui/user-activity-feed/user-activity/user-activity.component';
import {
  UserFriendshipActivityComponent,
} from '../../../user-details/ui/user-activity-feed/user-friendship-activity/user-friendship-activity.component';
import {
  UserLevelUpActivityComponent,
} from '../../../user-details/ui/user-activity-feed/user-level-up-activity/user-level-up-activity.component';
import {
  UserWorkoutActivityComponent,
} from '../../../user-details/ui/user-activity-feed/user-workout-activity/user-workout-activity.component';
import {
  UserPersonalBestActivityComponent,
} from '../../../user-details/ui/user-activity-feed/user-personal-best-activity/user-personal-best-activity.component';

@Component({
  selector: 'app-friends-activity-feed',
  templateUrl: './friends-activity-feed.component.html',
  styleUrls: ['./friends-activity-feed.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonInfiniteScroll,
    IonRefresher,
    IonRefresherContent,
    IonSkeletonText,
    IonText,
    NgForOf,
    UserAchievementActivityComponent,
    UserActivityComponent,
    UserFriendshipActivityComponent,
    UserLevelUpActivityComponent,
    UserWorkoutActivityComponent,
    UserPersonalBestActivityComponent,
  ],
})
export class FriendsActivityFeedComponent implements OnInit {
  private activityService = inject(UserActivityService);

  @ViewChild('infiniteScroll') infiniteScroll?: IonInfiniteScroll;

  activities: UserActivity[] = [];

  ngOnInit() {
    this.activityService.getFriendsActivities().subscribe(
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
    this.activityService.getFriendsActivities().subscribe(
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

    this.activityService.getFriendsActivities(offset).subscribe(
      (activities) => {
        this.activities = [...this.activities, ...activities];
        event.target.complete();

        if (activities.length === 0) {
          event.target.disabled = true;
        }
      },
    );
  }
}
