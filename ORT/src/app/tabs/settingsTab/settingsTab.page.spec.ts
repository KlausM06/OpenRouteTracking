import { ComponentFixture, TestBed } from '@angular/core/testing';

import { settingsTabPage } from './settingsTab.page';

describe('settingsTabPage', () => {
  let component: settingsTabPage;
  let fixture: ComponentFixture<settingsTabPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(settingsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
