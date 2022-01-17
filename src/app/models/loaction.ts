export class Location {
    cityId?: number
    cityName?: string
    stateId?: number
    stateName?: string
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