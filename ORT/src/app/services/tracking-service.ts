import { Injectable } from '@angular/core';
import { RoutePoint, trackingStatus } from '../models/tracking.interfaces';
import { LocationService } from './location-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {

  trackingStatusSubject = new BehaviorSubject<trackingStatus>(trackingStatus.off);
  trackingStatus$ = this.trackingStatusSubject.asObservable();

  private watchID: string | null = null;
  private startTime: number = 0;

  private route: RoutePoint[] = [];

  constructor(private locationService: LocationService) { }

  startTracking() {
    if (this.watchID) return;

    this.route = [];
    this.startTime = Date.now();

    this.locationService.watchPosition((position) => {

      const coords = position.coords;

      const timestamp =
        Math.floor((Date.now() - this.startTime));

      const point: RoutePoint = {
        lat: coords.latitude,
        lng: coords.longitude,
        timestamp
      };

      this.route.push(point);

    }).then((wID) => { this.watchID = wID; this.trackingStatusSubject.next(trackingStatus.on) });
    this.trackingStatusSubject.next(trackingStatus.loading);
  }

  stopTracking() {
    if (!this.watchID || this.trackingStatusSubject.value == trackingStatus.loading) return;

    this.locationService.clearWatch(this.watchID);
    console.log(this.route); // TODO: persist data here
    this.route = []
    this.watchID = null;
    this.trackingStatusSubject.next(trackingStatus.off);
  }

  pauseTracking() {
    // TODO
  }

  getRoute(): RoutePoint[] {
    return this.route;
  }

  getStartTime(): number {
    return this.startTime;
  }
}
