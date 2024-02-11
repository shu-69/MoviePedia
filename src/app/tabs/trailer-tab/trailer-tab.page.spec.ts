import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrailerTabPage } from './trailer-tab.page';

describe('TrailerTabPage', () => {
  let component: TrailerTabPage;
  let fixture: ComponentFixture<TrailerTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TrailerTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
