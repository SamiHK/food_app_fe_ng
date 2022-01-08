import { Location } from "./loaction";
import { Manager } from "./manager";

export class Branch {
    id: string = '';
    name: string = '';
    code: string = '';
    location?: Location
    branchAddress?: string
    manager?: Manager
    managerId?: string;
    managerEmail?: string;
    managerUsername?: string;
    managerFullName?: string;
}
