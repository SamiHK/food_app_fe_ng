import { Manager } from "./manager";

export class Branch {
    id: string = '';
    name: string = '';
    code: string = '';
    address?: string;
    managerId?: string;
    managerEmail?: string;
    managerUsername?: string;
    managerFullName?: string;
}
