import { GeoLocation } from "./location";
import { Manager } from "./manager";

export class Branch {
    id: string = '';
    name: string = '';
    code: string = '';
    address?: string;
    cityId?: string;
    location?: GeoLocation;
    manager?: Manager
    managerId?: string;
    managerEmail?: string;
    managerUsername?: string;
    managerFullName?: string;
}
