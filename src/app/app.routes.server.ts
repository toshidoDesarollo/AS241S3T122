import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  { path: '', renderMode: RenderMode.Prerender },

 
  { path: 'clientes-form/:id', renderMode: RenderMode.Server },
  { path: 'pedidos-form/:id',  renderMode: RenderMode.Server },
  { path: 'productos-form/:id', renderMode: RenderMode.Server },
  { path: 'usuarios-form/:id',  renderMode: RenderMode.Server },


  { path: '**', renderMode: RenderMode.Prerender }
];
