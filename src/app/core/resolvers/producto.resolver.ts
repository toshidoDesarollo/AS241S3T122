import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../services/producto.service';

// Resolver: Productos activos
export const productosActivosResolver: ResolveFn<Producto[]> = (): Observable<Producto[]> => {
  const productoService = inject(ProductoService);
  return productoService.findByEstado('A');
};

// Resolver: Todos los productos
export const todosProductosResolver: ResolveFn<Producto[]> = (): Observable<Producto[]> => {
  const productoService = inject(ProductoService);
  return productoService.findAll();
};
