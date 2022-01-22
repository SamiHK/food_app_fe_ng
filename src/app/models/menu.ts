export class Menu {
    id: number | null = null;
    title: string | null = null;
    sortOrder: number = 0;
    description: string | null = null;
    primaryImg: string|null = null;
    totalItems: number = 0;
    items: MenuItem[] = [];
    isActive: boolean = true;
    isAvailable: boolean = true;
    updatingAvailability: boolean = false;
}


export class MenuItem {
    id: number | null = null;
    title: string | null = null;
    description: string | null = null;
    menuId: number | null = null;
    primaryImg: string | null = null;
    price: number = 0;
    oldPrice: number | null = null;
    sortOrder: number = 0;
    isMenuAvailable: boolean = true;
    isAvailable: boolean = true;
    updatingAvailability: boolean = false;
    unit?: string;
    unitId?: number;
}

export class MenuItemUnit {
    id: number;
    title: string;

    constructor(id: number, title: string){
        this.id = id;
        this.title = title;
    }
}