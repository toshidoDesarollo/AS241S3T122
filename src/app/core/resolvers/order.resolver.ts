// src/app/core/resolvers/order.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.model';
import { OrderService } from '../services/order.service';


export const todasOrdenesResolver: ResolveFn<Order[]> = (): Observable<Order[]> => {
  const orderService = inject(OrderService);
  console.log('🔧 Resolver de órdenes ejecutándose...');
  return orderService.findAll();
};


export const ordenPorIdResolver: ResolveFn<Order> = (route): Observable<Order> => {
  const orderService = inject(OrderService);
  const id = Number(route.paramMap.get('id'));
  console.log('🔧 Resolver cargando orden ID:', id);
  return orderService.findById(id);
};


export const ordenesPorEstadoResolver: ResolveFn<Order[]> = (route): Observable<Order[]> => {
  const orderService = inject(OrderService);
  const estado = route.paramMap.get('estado') || 'P';
  console.log('🔧 Resolver cargando órdenes con estado:', estado);
  return orderService.findByEstado(estado);
};


export const ordenesCompletadasResolver: ResolveFn<Order[]> = (): Observable<Order[]> => {
  const orderService = inject(OrderService);
  console.log('🔧 Resolver cargando órdenes completadas...');
  return orderService.findByEstado('E');
};

export const ordenesPendientesResolver: ResolveFn<Order[]> = (): Observable<Order[]> => {
  const orderService = inject(OrderService);
  return orderService.findByEstado('P');
};


export const ordenesCanceladasResolver: ResolveFn<Order[]> = (): Observable<Order[]> => {
  const orderService = inject(OrderService);
  console.log('🔧 Resolver cargando órdenes canceladas...');
  return orderService.findByEstado('C');
};