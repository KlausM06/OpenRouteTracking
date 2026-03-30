import { ComponentFixture, TestBed } from '@angular/core/testing';

import { trackingTabPage } from './trackingTab.page';

describe('trackingTabPage', () => {
  let component: trackingTabPage;
  let fixture: ComponentFixture<trackingTabPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(trackingTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
