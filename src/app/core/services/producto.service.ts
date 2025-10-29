import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private urlBackEnd = `${environment.urlBackEnd}/v1/api/products`;

  // Obtener todos
  findAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlBackEnd);
  }

  // Obtener por ID
  findById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlBackEnd}/${id}`);
  }

  // Obtener por estado (A=Activo, I=Inactivo, etc.)
  findByEstado(estado: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlBackEnd}/estado/${estado}`);
  }

  // Guardar
  save(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.urlBackEnd}/save`, producto);
  }

  // Actualizar
  update(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.urlBackEnd}/update`, producto);
  }

  // Eliminación lógica
  deleteLogico(id: number): Observable<string> {
    return this.http.patch(`${this.urlBackEnd}/delete-logico/${id}`, {}, { responseType: 'text' });
  }

  // Restaurar producto
  restore(id: number): Observable<string> {
    return this.http.patch(`${this.urlBackEnd}/restore/${id}`, {}, { responseType: 'text' });
  }

  // Reporte PDF
  reportPdf(): Observable<Blob> {
    return this.http.get(`${this.urlBackEnd}/pdf`, { responseType: 'blob' });
  }
}