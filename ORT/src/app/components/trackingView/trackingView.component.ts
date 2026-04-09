import { Component, OnInit } from '@angular/core';
import { TrackingMapComponent } from '../trackingMap/trackingMap.component';
import { TrackingControlComponent } from '../trackingControl/trackingControl.component';

@Component({
  selector: 'app-tracking-view',
  templateUrl: './trackingView.component.html',
  styleUrls: ['./trackingView.component.scss'],
  imports: [TrackingMapComponent, TrackingControlComponent]
})
export class TrackingViewComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
