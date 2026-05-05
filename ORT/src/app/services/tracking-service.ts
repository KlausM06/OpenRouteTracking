import { Injectable } from '@angular/core';
import { RoutePoint, TrackingStatus, Route } from '../models/tracking.interfaces';
import { LocationService } from './location-service';
import { BehaviorSubject } from 'rxjs';
import { PersistenceService } from './persistence-service';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {

  trackingStatusSubject = new BehaviorSubject<TrackingStatus>("off");
  trackingStatus$ = this.trackingStatusSubject.asObservable();

  private watchID: string | null = null;
  private startTime: number = 0;

  private route: RoutePoint[] = [];

  constructor(private locationService: LocationService, private persistanceService: PersistenceService) { }

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
      console.log(point);

      this.route.push(point);

    }).then((wID) => { this.watchID = wID; this.trackingStatusSubject.next("on") });
    this.trackingStatusSubject.next("loading");
  }

  stopTracking() {
    if (!this.watchID || this.trackingStatusSubject.value == "loading") return;

    this.locationService.clearWatch(this.watchID);

    let starttime = Date.now() - this.route[this.route.length - 1].timestamp // current time minus duration of run (timestamp of last point)
    let route: Route = {
      type: "route",
      description: "",
      starttime,
      endtime: Date.now(),
      routePoints: this.route
    }

    this.persistanceService.saveRoute(route).then((doc)=>{
      if(!doc._id) {
        console.error("Error while saving document: "+doc)
      }
      
      this.route = []
      this.watchID = null;
      this.trackingStatusSubject.next("off");

      this.persistanceService.getAllRoutes().then((docs)=>{console.log(docs);})
    });
    this.trackingStatusSubject.next("loading");
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
