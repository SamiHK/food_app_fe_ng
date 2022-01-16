export class Menu {
    id: number | null = null;
    title: string | null = null;
    sortOrder: number = 0;
    description: string | null = null;
    totalItems: number = 0;
    items: MenuItem[] = []
}


export class MenuItem {
    id: number | null = null;
    title: string | null = null;
    description: string | null = null;
    menuId: number | null = null;
    price: number = 0;
    oldPrice: number | null = null;
    sortOrder: number = 0;
}
