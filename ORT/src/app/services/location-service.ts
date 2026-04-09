import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  async getCurrentLocation() {
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    });
    
    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  }

  watchPosition(callback: (position: any) => void) {

    const watchId = Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (position, err) => {
        if (position) {
          callback(position);
        }
      }
    );

    return watchId;
  }

  clearWatch(id: string) {
    Geolocation.clearWatch({ id });
  }
}
