import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserLevelUpActivityComponent } from './user-level-up-activity.component';

describe('UserLevelUpActivityComponent', () => {
  let component: UserLevelUpActivityComponent;
  let fixture: ComponentFixture<UserLevelUpActivityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UserLevelUpActivityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLevelUpActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
