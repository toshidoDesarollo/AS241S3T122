import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Inventory } from '../interfaces/inventory';
import { InventoryService } from '../services/inventory.service';

// Resolver: Todos los productos
export const inventarioResolver: ResolveFn<Inventory[]> = (): Observable<Inventory[]> => {
  const inventoryService = inject(InventoryService);
  return inventoryService.findAll();
};
