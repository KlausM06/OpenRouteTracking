import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from '../../services/location-service';
import { Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-tracking-map',
  templateUrl: './trackingMap.component.html',
  styleUrls: ['./trackingMap.component.scss'],
})
export class TrackingMapComponent implements OnInit {

  constructor(private locationService: LocationService) { }

  ngOnInit() { }

  @Input()
  livePosition: boolean = false;

  map: any;
  userPosition!: L.LatLng;
  userMarker!: L.Marker;
  userMarkerIcon!: L.Icon;
  followMarker: boolean = false;
  watchId: string | null = null;

  async ngAfterViewInit() {
    this.userMarkerIcon = L.icon({
      iconUrl: 'assets/icons/user-marker.svg',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    if (this.livePosition) {
      this.locationService.watchPosition((c) => { this.updateUserPosition(c) }).then((wID) => { this.watchId = wID });
    }

    this.loadMap();
    setTimeout(() => {
      this.map.invalidateSize();
    }, 100); // resize map after DOM loads

    this.addFollowButton();
  }

  ngOnDestroy() {
    if (this.watchId) {
      this.locationService.clearWatch(this.watchId);
    }
  }

  private loadMap() {
    const mapSettings: L.MapOptions = {
      zoomControl: false,
      center: this.livePosition && this.userPosition ? [this.userPosition.lat, this.userPosition.lng] : [0, 0],
      zoom: 16,
    }
    this.map = L.map('map', mapSettings);

    const observer = new ResizeObserver(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    });

    observer.observe(document.getElementById('map')!);

    this.map.on('dragstart', () => {
      // no longer auto-follow user marker when user drags away
      this.followMarker = false;
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  private addFollowButton() {
    const FollowControl = L.Control.extend({
      onAdd: (map: L.Map) => {
        const btn = L.DomUtil.create('button', 'follow-button');
        btn.innerHTML = '📍';
        btn.title = 'Zum User zentrieren';
        btn.style.width = '40px';
        btn.style.height = '40px';
        btn.style.border = 'none';
        btn.style.borderRadius = '8px';
        btn.style.background = 'white';
        btn.style.cursor = 'pointer';
        btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';

        btn.onclick = () => {
          this.followMarker = true;

          if (this.userPosition) {
            this.map.flyTo(this.userPosition, 18);
          }
        };

        return btn;
      }
    });

    new FollowControl({ position: 'bottomleft' }).addTo(this.map);
  }

  private updateUserPosition(pos: Position) {
    this.userPosition = L.latLng(pos.coords.latitude, pos.coords.longitude);
    console.log(this.userPosition);

    if (!this.userMarker) {
      this.userMarker = L.marker(this.userPosition, { icon: this.userMarkerIcon }).addTo(this.map);
      this.map.setView(this.userPosition, this.map.getZoom());
    } else {
      this.userMarker.setLatLng(this.userPosition);
      if (this.followMarker) {
        this.map.flyTo(this.userPosition, this.map.getZoom(), { duration: 0.5 });
      }
    }
  }
}
