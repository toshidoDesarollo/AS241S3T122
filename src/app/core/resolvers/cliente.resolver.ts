// src/app/core/resolvers/cliente.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { ClienteService } from '../services/cliente.service';

export const clientesActivosResolver: ResolveFn<Cliente[]> = (): Observable<Cliente[]> => {
  const clienteService = inject(ClienteService);
  return clienteService.findByEstado('A');
};


export const clientePorIdResolver: ResolveFn<Cliente> = (route): Observable<Cliente> => {
  const clienteService = inject(ClienteService);
  const id = Number(route.paramMap.get('id'));
  return clienteService.findById(id);
};

export const todosClientesResolver: ResolveFn<Cliente[]> = (): Observable<Cliente[]> => {
  const clienteService = inject(ClienteService);
  return clienteService.findAll();
};