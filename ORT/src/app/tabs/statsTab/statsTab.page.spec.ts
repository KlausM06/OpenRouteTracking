import { ComponentFixture, TestBed } from '@angular/core/testing';

import { statsTabPage } from './statsTab.page';

describe('statsTabPage', () => {
  let component: statsTabPage;
  let fixture: ComponentFixture<statsTabPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(statsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
