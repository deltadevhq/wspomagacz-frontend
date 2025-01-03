import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { LevelProgressComponent } from '../shared/ui/level-progress/level-progress.component';
import { AuthService } from '../shared/data-access/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserActivityFeedComponent } from '../user-details/ui/user-activity-feed/user-activity-feed.component';
import Swiper from 'swiper';
import { UserAchievementsComponent } from '../user-details/ui/user-achievements/user-achievements.component';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/models/User';
import { UserService } from '../shared/data-access/user.service';
import { environment } from '../../environments/environment';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAvatar, IonLabel, LevelProgressComponent, IonText, IonButton, IonIcon, IonButtons, IonBackButton, IonSegment, IonSegmentButton, UserActivityFeedComponent, IonSkeletonText, UserAchievementsComponent, IonMenuButton, NgOptimizedImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfilePage implements OnInit, AfterViewInit {
  user$ = new BehaviorSubject<User | undefined | null>(undefined);

  public authService = inject(AuthService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private modalController = inject(ModalController);

  @ViewChild('profileSwiper') swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  segments = ['feed', 'achievements'];
  segment = this.segments[0];
  collapseHeader = false;

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['/welcome']);
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.userService.getUserById(Number(id)).subscribe((user) =>
        this.user$.next(user),
      );
    } else {
      this.user$.next(this.authService.user()!);
    }
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

  onContentScroll(event: any) {
    this.collapseHeader = event.target.scrollTop > 0;
  }

  async openSettingsModal() {
    const modal = await this.modalController.create({
      component: SettingsComponent,
    });

    await modal.present();

    await modal.onDidDismiss();
  }

  protected readonly environment = environment;
}
