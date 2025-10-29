import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventory } from '../interfaces/inventory';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InventoryService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBackEnd = `${environment.urlBackEnd}/v1/api/inventory`;

  findAll(): Observable<Inventory[]> { // Añadir tipo de retorno
    return this.http.get<Inventory[]>(this.urlBackEnd);
  }

  save(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(`${this.urlBackEnd}/save`, inventory);
  }

  update(inventory: Inventory): Observable<Inventory> {
    // Usamos PUT para actualizar registros existentes
    return this.http.put<Inventory>(`${this.urlBackEnd}/update`, inventory);
  }

  generateReport(): Observable<Blob> {
    return this.http.get(`${this.urlBackEnd}/pdf`, { responseType: 'blob' });
  }
}
