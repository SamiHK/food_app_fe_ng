import { INavData } from '@coreui/angular';

export const adminNavItems: INavData[] = [
    {
        name: 'Dashboard',
        url: '/admin/dashboard'
    },
    {
        name: 'Manager',
        url: '/admin/manager'
    },
    {
        name: 'Branch',
        url: '/admin/branch'
    },
    {
        name: 'Menu',
        url: '/admin/menu'
    },
]

export const managerNavItems: INavData[] = [
    {
        name: 'Dashboard',
        url: '/manager/dashboard'
    },
    {
        name: 'Salesperson',
        url: '/manager/salesperson'
    },
    {
        name: 'Menu',
        url: '/manager/menu'
    },
]

export const salespersonNavItems: INavData[] = [
    {
        name: 'Dashboard',
        url: '/salesperson/dashboard'
    },
    {
        name: 'Menu',
        url: '/salesperson/menu'
    },
    {
        name: 'Order',
        url: '/salesperson/order'
    },
    {
        name: 'Checkout',
        url: '/salesperson/checkout'
    }
]

export const customerNavItems: INavData[] = [
    {
        name: 'Profile',
        url: '/public/profile'
    },
    {
        name: 'Orders',
        url: '/public/orders'
    },
]
