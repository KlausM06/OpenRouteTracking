import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-statsTab',
  templateUrl: 'statsTab.page.html',
  styleUrls: ['statsTab.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class statsTabPage {
  constructor() {}
}
