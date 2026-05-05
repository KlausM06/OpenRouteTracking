export interface RoutePoint {
    lat: number;
    lng: number;
    timestamp: number;
}

export interface Route {
    _id: string,
    starttime: number,
    endtime: number,
    routePoints: RoutePoint[]
}

export type TrackingStatus = 'on' | 'off' | 'loading';