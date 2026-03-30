import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settingsTab',
  templateUrl: 'settingsTab.page.html',
  styleUrls: ['settingsTab.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class settingsTabPage {
  constructor() {}
}
