// src/app/feature/pedidos/pedidos.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/services/auth.guard';
import { 
  ordenesPendientesResolver,
  ordenPorIdResolver
} from '../../core/resolvers/order.resolver';

export const PEDIDOS_ROUTES: Routes = [
  {
    path: 'pedidos',
    loadComponent: () => 
      import('./order-list/order-list').then(m => m.OrderList),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'USUARIO'] },
    resolve: {
      ordenesPendientes: ordenesPendientesResolver
    }
  },
  {
    path: 'pedidos-form',
    loadComponent: () => 
      import('./order-form/order-form').then(m => m.OrderForm),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'USUARIO'] }
  },
  {
    path: 'pedidos-form/:id',
    loadComponent: () => 
      import('./order-form/order-form').then(m => m.OrderForm),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'USUARIO'] },
    resolve: {
      orden: ordenPorIdResolver
    }
  },
  {
    path: 'pedidos-dialog',
    loadComponent: () => 
      import('./order-detail-dialog/order-detail-dialog').then(m => m.OrderDetailDialog),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'USUARIO'] }
  }
];