import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserActivityFeedComponent } from './user-activity-feed.component';

describe('UserActivityFeedComponent', () => {
  let component: UserActivityFeedComponent;
  let fixture: ComponentFixture<UserActivityFeedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UserActivityFeedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserActivityFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
