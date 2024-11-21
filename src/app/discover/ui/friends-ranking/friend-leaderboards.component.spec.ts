import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FriendLeaderboardsComponent } from './friend-leaderboards.component';

describe('FriendsRankingComponent', () => {
  let component: FriendLeaderboardsComponent;
  let fixture: ComponentFixture<FriendLeaderboardsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FriendLeaderboardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FriendLeaderboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
