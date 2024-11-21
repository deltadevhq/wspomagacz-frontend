import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserFriendshipActivityComponent } from './user-friendship-activity.component';

describe('UserFriendshipActivityComponent', () => {
  let component: UserFriendshipActivityComponent;
  let fixture: ComponentFixture<UserFriendshipActivityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UserFriendshipActivityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFriendshipActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
