export class Address {
    cityId?: number
    cityName?: string
    cityShortName?:string
    stateId?: number
    stateName?: string
    stateShortName?: string
    countryId?: number
    countryName?: string
    countryShortName?: string
    addressLine1?: string
    formattedAddress?: string
    lat?: number = 0
    lng?: number = 0
    private _latLng?: { lat: number; lng: number}  | undefined
    public get latLng(): { lat: number; lng: number}  | undefined {
        return this._latLng
    }
    public set latLng(value: { lat: number; lng: number}  | undefined) {
        if(value){
            this.lat = value.lat,
            this.lng = value.lng
        }
        this._latLng = value
    }
    addressComponents?: any
}

export class City {
    id?: number
    name?: string
    stateId?: number
    state?: State
}

export class State {
    id?: number
    name?: string
    countryId?: number
    country?: Country
}

export class Country {
    shortName?: string
    name?: string
}