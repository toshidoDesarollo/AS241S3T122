// src/app/feature/clientes/clientes.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/services/auth.guard';
import { 
  clientesActivosResolver, 
  clientePorIdResolver 
} from '../../core/resolvers/cliente.resolver';

export const CLIENTES_ROUTES: Routes = [
  {
    path: 'clientes',
    loadComponent: () => 
      import('./cliente-list/cliente-list').then(m => m.ClienteList),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'USUARIO'] },
    resolve: {
      clientesActivos: clientesActivosResolver
    }
  },
  {
    path: 'clientes-form',
    loadComponent: () => 
      import('./cliente-form/cliente-form').then(m => m.ClienteForm),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'USUARIO'] }
  },
  {
    path: 'clientes-form/:id',
    loadComponent: () => 
      import('./cliente-form/cliente-form').then(m => m.ClienteForm),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'USUARIO'] },
    resolve: {
      cliente: clientePorIdResolver
    }
  }
];