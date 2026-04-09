import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { trackingStatus } from 'src/app/models/tracking.interfaces';
import { TrackingService } from 'src/app/services/tracking-service';

@Component({
  selector: 'app-tracking-control',
  templateUrl: './trackingControl.component.html',
  styleUrls: ['./trackingControl.component.scss'],
  imports: [IonicModule, AsyncPipe]
})
export class TrackingControlComponent implements OnInit {

  constructor(public trackingService: TrackingService) { }

  ngOnInit() {
    this.trackingService.trackingStatus$.subscribe((v:trackingStatus)=>{console.log(v);
    })
  }


  toggleTracking() {
    if (this.trackingService.trackingStatusSubject.value === trackingStatus.off) {
      this.trackingService.startTracking();
    } else {
      this.trackingService.stopTracking();
    }
  }
}
