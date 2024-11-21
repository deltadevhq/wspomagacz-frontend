import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthService } from '../shared/data-access/auth.service';
import { Router } from '@angular/router';
import { AvatarLevelProgressComponent } from '../shared/ui/avatar-level-progress/avatar-level-progress.component';
import { LevelProgressComponent } from '../shared/ui/level-progress/level-progress.component';
import { NotificationsComponent } from '../shared/ui/notifications/notifications.component';
import { WorkoutSummaryComponent } from '../shared/ui/workout-summary/workout-summary.component';
import { WorkoutsCalendarComponent } from '../shared/ui/calendar/workouts-calendar/workouts-calendar.component';
import { FriendsActivityFeedComponent } from './ui/friends-activity-feed/friends-activity-feed.component';
import { FriendLeaderboardsComponent } from './ui/friends-ranking/friend-leaderboards.component';
import { FriendsComponent } from './ui/friends/friends.component';
import Swiper from 'swiper';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AvatarLevelProgressComponent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonSpinner, IonText, LevelProgressComponent, NotificationsComponent, WorkoutSummaryComponent, WorkoutsCalendarComponent, IonLabel, IonSegment, IonSegmentButton, IonButton, FriendsActivityFeedComponent, FriendLeaderboardsComponent, FriendsComponent],
})
export class DiscoverPage implements AfterViewInit {
  public authService = inject(AuthService);
  private router = inject(Router);


  @ViewChild('discoverSwiper') swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  segments = ['feed', 'ranking', 'friends'];
  segment = this.segments[0];
  collapseHeader = false;

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['/welcome']);
      }
    });
  }

  ngAfterViewInit() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  slideChanged(event: any) {
    this.segment = this.segments[this.swiper?.realIndex || 0];

    const activeSlide = this.swiper?.slides[this.swiper.realIndex];

    if (activeSlide) {
      this.collapseHeader = activeSlide.scrollTop > 0;
    }
  }

  segmentChanged(event: CustomEvent) {
    this.segment = event.detail.value;
    this.swiper?.slideTo(this.segments.indexOf(this.segment));
  }
}
