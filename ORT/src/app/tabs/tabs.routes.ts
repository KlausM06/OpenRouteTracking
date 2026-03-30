import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'statsTab',
        loadComponent: () =>
          import('./statsTab/statsTab.page').then((m) => m.statsTabPage),
      },
      {
        path: 'trackingTab',
        loadComponent: () =>
          import('./trackingTab/trackingTab.page').then((m) => m.trackingTabPage),
      },
      {
        path: 'settingsTab',
        loadComponent: () =>
          import('./settingsTab/settingsTab.page').then((m) => m.settingsTabPage),
      },
      {
        path: '',
        redirectTo: '/tabs/trackingTab',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/statsTab',
    pathMatch: 'full',
  },
];
