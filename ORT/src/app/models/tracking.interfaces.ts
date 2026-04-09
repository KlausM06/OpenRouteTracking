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

export enum trackingStatus {
    off,
    on,
    loading
}