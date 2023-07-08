import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpcomingTabPage } from './upcoming-tab.page';

describe('UpcomingTabPage', () => {
  let component: UpcomingTabPage;
  let fixture: ComponentFixture<UpcomingTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpcomingTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
