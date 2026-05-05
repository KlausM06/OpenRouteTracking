import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TrackingService } from 'src/app/services/tracking-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tracking-control',
  templateUrl: './trackingControl.component.html',
  styleUrls: ['./trackingControl.component.scss'],
  imports: [IonicModule, AsyncPipe, CommonModule]
})
export class TrackingControlComponent implements OnInit {

buttonStyles = {
  on: {
    text: 'Stop Tracking',
    color: 'danger'
  },
  off: {
    text: 'Start Tracking',
    color: 'success'
  },
  loading: {
    text: 'Loading...',
    color: 'medium'
  }
};

  constructor(public trackingService: TrackingService) { }

  ngOnInit() {

  }


  toggleTracking() {
    if (this.trackingService.trackingStatusSubject.value === "off") {
      this.trackingService.startTracking();
    } else {
      this.trackingService.stopTracking();
    }
  }
}
