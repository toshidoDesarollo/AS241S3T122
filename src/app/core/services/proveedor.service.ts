import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Proveedor } from '../interfaces/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private http = inject(HttpClient);
  private urlBackEnd = `${environment.urlBackEnd}/v1/api/suppliers`;

  // Obtener todos los proveedores
  findAll(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.urlBackEnd);
  }

  // Obtener proveedor por ID
  findById(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.urlBackEnd}/${id}`);
  }

  // Obtener por estado (A = Activo, I = Inactivo)
  findByEstado(state: string): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.urlBackEnd}/estado/${state}`);
  }

  // Guardar nuevo proveedor
  save(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.urlBackEnd}/save`, proveedor);
  }

  // Actualizar proveedor
  update(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.urlBackEnd}/update`, proveedor);
  }

  // Eliminación lógica
  deleteLogico(id: number): Observable<string> {
    return this.http.patch(`${this.urlBackEnd}/delete-logico/${id}`, {}, { responseType: 'text' });
  }

  // Restaurar proveedor
  restore(id: number): Observable<string> {
    return this.http.patch(`${this.urlBackEnd}/restore/${id}`, {}, { responseType: 'text' });
  }

  // Eliminación física
  deleteFisico(id: number): Observable<string> {
    return this.http.delete(`${this.urlBackEnd}/delete-fisico/${id}`, { responseType: 'text' });
  }
}
