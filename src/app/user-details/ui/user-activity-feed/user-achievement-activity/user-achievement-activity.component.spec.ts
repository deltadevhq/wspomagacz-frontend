import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserAchievementActivityComponent } from './user-achievement-activity.component';

describe('UserAchievementActivityComponent', () => {
  let component: UserAchievementActivityComponent;
  let fixture: ComponentFixture<UserAchievementActivityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UserAchievementActivityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAchievementActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
