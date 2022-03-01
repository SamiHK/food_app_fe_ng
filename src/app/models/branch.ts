import { Address } from "./address";
import { Manager } from "./manager";
import { SalesPerson } from "./sales-person";

export class Branch {
    id: string = '';
    name: string = '';
    code: string = '';
    address?: Address
    branchFullAddress?: string
    branchAddressLine1?: string
    branchFormattedAddress?: string
    branchAddressCityId?: number
    branchAddressCityName?: string
    branchAddressStateId?: number
    branchAddressStateName?: string
    branchAddressCountryId?: number
    branchAddressCountryName?: string
    manager?: Manager
    managerId?: string;
    managerEmail?: string;
    managerUsername?: string;
    managerFullName?: string;
    totalActiveSalespersons: number = 0;
    salespersons?: SalesPerson[]
}
