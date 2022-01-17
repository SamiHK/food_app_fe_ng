import { User } from "./user";

export class AuthUser extends User {
    token?:string;
    error?: {
        code: string,
        type: string,
        name: string,
        message: string
    }
}
