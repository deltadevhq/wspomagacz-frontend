import { Component, inject } from '@angular/core';
import { IonAvatar, IonIcon, IonItem, IonLabel, IonList, IonRouterLink, IonText } from '@ionic/angular/standalone';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import {
  ExpLeaderboardEntry,
  LeaderboardsService,
  WeightLeaderboardEntry,
} from '../../../shared/data-access/leaderboards.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../shared/data-access/auth.service';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-friend-leaderboards',
  templateUrl: './friend-leaderboards.component.html',
  styleUrls: ['./friend-leaderboards.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonText,
    NgForOf,
    IonItem,
    IonLabel,
    IonList,
    IonAvatar,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    IonRouterLink,
  ],
})
export class FriendLeaderboardsComponent {
  expLeaderboard: ExpLeaderboardEntry[] | null = [];
  weightLeaderboard: WeightLeaderboardEntry[] | null = [];

  userExpLeaderboardEntry: ExpLeaderboardEntry | null = null;
  userWeightLeaderboardEntry: WeightLeaderboardEntry | null = null;

  leaderboardsService = inject(LeaderboardsService);
  expLeaderboard$ = toObservable(this.leaderboardsService.expLeaderboard);
  weightLeaderboard$ = toObservable(this.leaderboardsService.weightLeaderboard);

  authService = inject(AuthService);

  constructor() {
    this.expLeaderboard$.subscribe((expLeaderboard) => {
      this.expLeaderboard = expLeaderboard;
      this.userExpLeaderboardEntry = expLeaderboard?.find((entry) => entry.user.id === this.authService.user()?.id) ?? null;
    });

    this.weightLeaderboard$.subscribe((weightLeaderboard) => {
      this.weightLeaderboard = weightLeaderboard;
      this.userWeightLeaderboardEntry = weightLeaderboard?.find((entry) => entry.user.id === this.authService.user()?.id) ?? null;
    });
  }

  protected readonly environment = environment;
}
