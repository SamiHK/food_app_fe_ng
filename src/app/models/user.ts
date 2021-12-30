import { Audit } from "./audit";

export class User extends Audit {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    enabled: boolean;
    lastLogin: string;
    profilePicture:string;
    role: string;
}
