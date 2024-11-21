import { Component, effect, inject, OnInit } from '@angular/core';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonProgressBar,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LevelProgressComponent } from '../shared/ui/level-progress/level-progress.component';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { UserActivityFeedComponent } from './ui/user-activity-feed/user-activity-feed.component';
import { User } from '../shared/models/User';
import { AuthService } from '../shared/data-access/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/data-access/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  imports: [
    IonAvatar,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonProgressBar,
    IonSegment,
    IonSegmentButton,
    IonSkeletonText,
    IonText,
    IonTitle,
    IonToolbar,
    LevelProgressComponent,
    NgForOf,
    UserActivityFeedComponent,
    IonBackButton,
    NgClass,
    NgIf,
    AsyncPipe,
  ],
})
export class UserDetailsComponent implements OnInit {
  user$ = new BehaviorSubject<User | undefined>(undefined);

  public authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  collapseHeader = false;

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['/welcome']);
      }
    });
    1;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';

    this.userService.getUserSearchById(id).subscribe((user) => {
      this.user$.next(user);
    });
  }

  onContentScroll(event: any) {
    this.collapseHeader = event.target.scrollTop > 0;
  }
}
