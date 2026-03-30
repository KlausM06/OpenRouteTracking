import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { TrackingViewComponent } from '../../components/trackingView/trackingView.component';

@Component({
  selector: 'app-trackingTab',
  templateUrl: 'trackingTab.page.html',
  styleUrls: ['trackingTab.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, TrackingViewComponent]
})
export class trackingTabPage {

  constructor() {}

}
