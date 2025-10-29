// src/app/core/services/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    const isAuthEndpoint = request.url.includes('/v1/api/auth/login') || 
                          request.url.includes('/v1/api/auth/save') || 
                          request.url.includes('/v1/api/auth/register');

    if (isAuthEndpoint) {
      console.log('🔓 Petición a endpoint público (sin token):', request.url);
      return next.handle(request);
    }

    //  Obtener el token SIEMPRE en cada petición 
    const token = this.authService.getToken();

    console.log('🔐 Interceptor - Token actual:', token ? 'Existe ✅' : 'No existe ❌');
    console.log('📡 Petición a:', request.url);

    //  Clonar la petición y agregar el token si existe
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('✅ Token agregado al header Authorization');
    } else {
      console.warn('⚠️ No hay token disponible para esta petición');
    }

    // Manejar la respuesta y errores
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('❌ Error en petición HTTP:', {
          status: error.status,
          url: request.url,
          message: error.message
        });

        if (error.status === 401) {
          console.error('🔴 Error 401: No autorizado - Token inválido o expirado');
          this.authService.logout();
        } else if (error.status === 403) {
          console.error('🔴 Error 403: Sin permisos suficientes');
          alert('No tiene permisos para realizar esta acción');
        } else if (error.status === 0) {
          console.error('🔴 Error de conexión con el servidor');
          alert('No se pudo conectar con el servidor. Verifique su conexión.');
        }
        
        return throwError(() => error);
      })
    );
  }
}