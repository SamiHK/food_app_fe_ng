export interface City {
    placeId?: string | null;
    name?: string | null;
    state?: State | null;
}

export interface State {
    placeId?: string | null;
    name?: string | null;
    country?: Country | null;
}

export interface Country {
    placeId?: string | null;
    name?: string | null;
    shortName?: string | null;
}

export interface GeoLocation {
    address: string | null;
    latLng?: string | null;
    city?: City | null;
}
