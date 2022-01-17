import { Location } from "./loaction";
import { Manager } from "./manager";
import { SalesPerson } from "./sales-person";

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
    totalActiveSalespersons: number = 0;
    salespersons?: SalesPerson[]
}
