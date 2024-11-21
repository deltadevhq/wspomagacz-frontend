import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserAchievementsComponent } from './user-achievements.component';

describe('UserAchievementsComponent', () => {
  let component: UserAchievementsComponent;
  let fixture: ComponentFixture<UserAchievementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UserAchievementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
