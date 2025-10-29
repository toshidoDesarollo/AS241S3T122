// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { ClienteInterfas } from './layout/cliente-interfas/cliente-interfas';
import { AuthGuard } from './core/services/auth.guard';

import { usuariosActivosResolver } from './core/resolvers/usuario.resolver';


// PRODUCTOS
import { todosProductosResolver } from './core/resolvers/producto.resolver';

// PROVEEDOR
import { proveedorResolver } from './core/resolvers/proveedores.resolver';

// INVENTARIO
import { inventarioResolver } from './core/resolvers/inventario.resolver';

export const routes: Routes = [
  // ========== RUTAS PÚBLICAS ==========
  {
    path: 'login',
    loadComponent: () => import('./feature/login-two/login-two').then((m) => m.LoginTwo),
  },
  {
    path: 'login-two',
    loadComponent: () => import('./feature/login-two/login-two').then((m) => m.LoginTwo),
  },
  {
    path: '',
    redirectTo: 'login-two',
    pathMatch: 'full',
  },

  // ========== RUTAS ADMINISTRATIVAS (ADMIN y USUARIO) ==========
  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'USUARIO'] },
    children: [
      // ✅ Dashboard - Solo ADMIN
      {
        path: 'dashboard',
        loadComponent: () => import('./feature/dashboard/dashboard').then((m) => m.Dashboard),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },

      // ✅ CLIENTES - Lazy Loading Module
      {
        path: '',
        loadChildren: () =>
          import('./feature/clientes/clientes.routes').then((m) => m.CLIENTES_ROUTES),
      },

      // Pedido Proveedor - Solo ADMIN
      {
        path: 'supplier_product',
        loadComponent: () =>
          import('./feature/supplier_product/supplier-product-list/supplier-product-list').then(
            (m) => m.SupplierProductList
          ),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },

      // Inventario - ADMIN y USUARIO
      {
        path: 'inventario',
        loadComponent: () =>
          import('./feature/inventario/inventory-list/inventory-list').then((m) => m.InventoryList),
        resolve: {
          inventario: inventarioResolver,
        },
      },

      {
        path: 'inventario-form',
        loadComponent: () =>
          import('./feature/inventario/inventory-form/inventory-form').then((m) => m.InventoryForm),
      },

      // ✅ PEDIDOS - Lazy Loading Module
      {
        path: '',
        loadChildren: () => import('./feature/order/pedidos.routes').then((m) => m.PEDIDOS_ROUTES),
      },

      // Productos
      {
        path: 'productos',
        loadComponent: () =>
          import('./feature/producto/producto-list/producto-list').then((m) => m.ProductoList),
        resolve: {
          productos: todosProductosResolver
        },
      },
      {
        path: 'productos-form',
        loadComponent: () =>
          import('./feature/producto/producto-form/producto-form').then((m) => m.ProductoForm),
      },
      {
        path: 'productos-form/:id',
        loadComponent: () =>
          import('./feature/producto/producto-form/producto-form').then((m) => m.ProductoForm),
      },

      // PROVEEDORES
      {
        path: 'proveedores',
        loadComponent: () =>
          import('./feature/proveedores/proveedor-list/proveedor-list').then((m) => m.ProveedorList),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
        resolve: { proveedores: proveedorResolver },
      },
      {
        path: 'proveedores-form',
        loadComponent: () =>
          import('./feature/proveedores/proveedor-form/proveedor-form').then((m) => m.ProveedorForm),
      },
      // ✅ Usuarios
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./feature/usuario/user-list/user-list').then((m) => m.UserList),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
        resolve: {
          usuarios: usuariosActivosResolver,
        },
      },
      {
        path: 'usuarios-form',
        loadComponent: () =>
          import('./feature/usuario/user-form/user-form').then((m) => m.UserForm),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'usuarios-form/:id',
        loadComponent: () =>
          import('./feature/usuario/user-form/user-form').then((m) => m.UserForm),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },

      {
        path: '',
        redirectTo: 'productos',
        pathMatch: 'full',
      },
    ],
  },

  // ========== RUTAS DE CLIENTE ==========
  {
    path: 'cliente',
    component: ClienteInterfas,
    canActivate: [AuthGuard],
    data: { roles: ['CLIENTE'] },
    children: [
      {
        path: 'client-product',
        loadComponent: () =>
          import('./feature/client-product/client-product').then((m) => m.ClientProduct),
      },
      {
        path: 'client-profile',
        loadComponent: () =>
          import('./feature/client-profile/client-profile').then((m) => m.ClientProfile),
      },
      {
        path: '',
        redirectTo: 'client-product',
        pathMatch: 'full',
      },
    ],
  },

  // ========== RUTA POR DEFECTO ==========
  {
    path: '**',
    redirectTo: 'login-two',
  },
];
