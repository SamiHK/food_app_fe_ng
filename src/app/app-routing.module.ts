import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { WebLayoutComponent } from './containers/web-layout/web-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public/menu',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'public',
    component: WebLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule) }
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'admin', data: { title: 'Admin' },
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule)
      },
      {
        path: 'manager', data: { title: 'Manager' },
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/manager/manager.module').then((m) => m.ManagerModule)
      },
      {
        path: 'salesperson', data: { title: 'Salesperson' },
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/salesperson/salesperson.module').then((m) => m.SalespersonModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
