import { Branch } from "./branch";
import { SalesPerson } from "./sales-person";
import { User } from "./user";

export class Manager extends User {
    branchId?: string | null
    branchCode?: string | null
    branchName?: string | null
    branch?: Branch
    salespersons?: SalesPerson[] 
}
