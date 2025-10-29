import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Proveedor } from '../interfaces/proveedor';
import { ProveedorService } from '../services/proveedor.service';

// Resolver: Todos los productos
export const proveedorResolver: ResolveFn<Proveedor[]> = (): Observable<Proveedor[]> => {
  const proveedorService = inject(ProveedorService);
  return proveedorService.findAll();
};