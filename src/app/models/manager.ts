import { Branch } from "./branch";
import { User } from "./user";

export class Manager extends User {
    branchId?: string | null
    branchCode?: string | null
    branchName?: string | null
    branch: Branch = new Branch()
}
