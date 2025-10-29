// src/app/core/resolvers/usuario.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../services/usuario.service';

export const usuariosActivosResolver: ResolveFn<Usuario[]> = (): Observable<Usuario[]> => {
  const usuarioService = inject(UsuarioService);
  console.log('📦 Resolver de usuarios activos ejecutándose...');
  return usuarioService.findByEstado('A');
};

export const usuarioPorIdResolver: ResolveFn<Usuario> = (route): Observable<Usuario> => {
  const usuarioService = inject(UsuarioService);
  const id = Number(route.paramMap.get('id'));
  console.log('📦 Resolver cargando usuario ID:', id);
  return usuarioService.findById(id);
};

export const todosUsuariosResolver: ResolveFn<Usuario[]> = (): Observable<Usuario[]> => {
  const usuarioService = inject(UsuarioService);
  console.log('📦 Resolver cargando todos los usuarios...');
  return usuarioService.findAll();
};

export const usuariosInactivosResolver: ResolveFn<Usuario[]> = (): Observable<Usuario[]> => {
  const usuarioService = inject(UsuarioService);
  console.log('📦 Resolver cargando usuarios inactivos...');
  return usuarioService.findByEstado('I');
};