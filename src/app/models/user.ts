import { Audit } from "./audit";

export class User extends Audit {
    id:string = '';
    username?:string;
    email?:string;
    firstName?:string;
    lastName?:string;
    fullName?:string;
    private _enabled: boolean = false;
    public get enabled(): boolean {
        return this._enabled;
    }
    public set enabled(value: any) {
        this._enabled = value == 1;
    }
    lastLogin?:string;
    lastPasswordUpdate?:string;
    profilePicture?:string;
    role?:string;
}
