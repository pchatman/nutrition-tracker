import { Routes } from '@angular/router';

// @ts-ignore
export const AUTH_ROUTES: Routes = [
  { path: 'login',    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  // { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) }
];
// import { Routes } from '@angular/router';
//
// export const routes: Routes = [
//   { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) }
// ];
