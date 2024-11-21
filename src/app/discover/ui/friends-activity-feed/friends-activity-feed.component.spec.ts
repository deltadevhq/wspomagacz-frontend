import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FriendsActivityFeedComponent } from './friends-activity-feed.component';

describe('FriendsActivityFeedComponent', () => {
  let component: FriendsActivityFeedComponent;
  let fixture: ComponentFixture<FriendsActivityFeedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FriendsActivityFeedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FriendsActivityFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
