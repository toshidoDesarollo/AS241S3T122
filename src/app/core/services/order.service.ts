import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private urlBackEnd = `${environment.urlBackEnd}/v1/api/orders`;

  constructor() {}

  findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.urlBackEnd);
  }

  findById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.urlBackEnd}/${id}`);
  }

  findByEstado(estado: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.urlBackEnd}/status/${estado}`); 
  }

  save(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.urlBackEnd}/save`, order);
  }

  update(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.urlBackEnd}/update`, order);
  }

  changeStatus(id: number, status: string): Observable<string> {
    return this.http.patch(`${this.urlBackEnd}/delete-logico/${id}/${status}`, null, {
      responseType: 'text'
    });
  }


  restoreOrder(id: number, status: string): Observable<string> {
    return this.http.put(`${this.urlBackEnd}/restore/${id}/${status}`, null, {
      responseType: 'text'
    });
  }


  deleteFisico(id: number): Observable<string> {
    return this.http.delete(`${this.urlBackEnd}/delete-fisico/${id}`, {
      responseType: 'text',
    });
  }


  generateOrderReport(orderId: number): Observable<Blob> {
    return this.http.get(`${this.urlBackEnd}/report/${orderId}`, {
      responseType: 'blob', 
    });
  }

  generateTransactionalReport(): Observable<Blob> {
    return this.http.get(`${this.urlBackEnd}/trans`, {
      responseType: 'blob'
    });
  }
}