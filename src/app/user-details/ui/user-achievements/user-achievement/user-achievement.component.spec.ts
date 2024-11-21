import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserAchievementComponent } from './user-achievement.component';

describe('UserAchievementComponent', () => {
  let component: UserAchievementComponent;
  let fixture: ComponentFixture<UserAchievementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UserAchievementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
