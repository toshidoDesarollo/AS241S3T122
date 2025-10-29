// src/app/core/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserInfo {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.urlBackEnd}/v1/api/auth`;
  private tokenKey = 'auth_token';
  private userInfoKey = 'user_info';
  
  private currentUserSubject: BehaviorSubject<UserInfo | null>;
  public currentUser: Observable<UserInfo | null>;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    const storedUser = this.isBrowser ? localStorage.getItem(this.userInfoKey) : null;
    this.currentUserSubject = new BehaviorSubject<UserInfo | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<AuthResponse> {
    console.log('🔹 Iniciando proceso de login...');
    
    //  Limpiar cualquier sesión anterior antes de hacer login
    this.clearSession();
    
    const authRequest: AuthRequest = { username, password };
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, authRequest)
      .pipe(
        tap(response => {
          console.log('🔹 Token recibido del backend');
          
          // Guardar el token INMEDIATAMENTE
          this.setToken(response.token);
          
          // Verificar que se guardó correctamente
          const tokenGuardado = this.getToken();
          console.log('✅ Token guardado correctamente:', tokenGuardado ? 'SÍ' : 'NO');
          
          //  Decodificar y guardar información del usuario
          const userInfo = this.decodeToken(response.token);
          console.log('🔹 UserInfo decodificado:', userInfo);
          
          if (userInfo) {
            this.setItem(this.userInfoKey, JSON.stringify(userInfo));
            this.currentUserSubject.next(userInfo);
            console.log('✅ Usuario autenticado:', userInfo);
          } else {
            console.error('❌ Error: No se pudo decodificar el token');
          }
        })
      );
  }

  /**
   *  Método mejorado para cerrar sesión y FORZAR recarga
   */
  logout(): void {
    console.log('🔹 Cerrando sesión...');
    this.clearSession();
    
    // FORZAR recarga completa de la página para resetear Angular
    if (this.isBrowser) {
      window.location.href = '/login-two';
    } else {
      this.router.navigate(['/login-two']);
    }
  }

  /**
   * Método para limpiar la sesión sin redirigir
   */
  clearSession(): void {
    console.log('🧹 Limpiando sesión...');
    this.removeItem(this.tokenKey);
    this.removeItem(this.userInfoKey);
    this.currentUserSubject.next(null);
    
    //  Verificar que se limpió correctamente
    const tokenDespues = this.getToken();
    console.log('🧹 Sesión limpiada. Token existe:', tokenDespues ? 'SÍ ❌' : 'NO ✅');
  }

  /**
   *  Método PÚBLICO para obtener el token
   */
  getToken(): string | null {
    const token = this.getItem(this.tokenKey);
    return token;
  }

  /**
   *  Método PÚBLICO para guardar el token
   */
  setToken(token: string): void {
    console.log('💾 Guardando token en localStorage...');
    this.setItem(this.tokenKey, token);
    
    // Verificar inmediatamente
    const verificacion = this.getItem(this.tokenKey);
    if (verificacion === token) {
      console.log('✅ Token guardado y verificado correctamente');
    } else {
      console.error('❌ Error: El token NO se guardó correctamente');
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    
    if (!token) {
      console.log('❌ No hay token - Usuario NO autenticado');
      return false;
    }
    
    // Verificar si el token está expirado
    if (this.isTokenExpired(token)) {
      console.log('⚠️ Token expirado, limpiando sesión');
      this.clearSession();
      return false;
    }
    
    console.log(' Usuario autenticado con token válido');
    return true;
  }

  getCurrentUser(): UserInfo | null {
    return this.currentUserSubject.value;
  }

  getUserRole(): string | null {
    const user = this.getCurrentUser();
    const role = user ? user.role : null;
    console.log('🔍 Rol del usuario actual:', role);
    return role;
  }

  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getUserRole();
    return userRole !== null && roles.includes(userRole);
  }

  private decodeToken(token: string): UserInfo | null {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      
      console.log('🔍 Payload del token:', decoded);
      
      const role = this.extractRoleFromToken(decoded);
      console.log('🔍 Rol extraído:', role);
      
      return {
        username: decoded.sub,
        role: role
      };
    } catch (error) {
      console.error('❌ Error al decodificar token:', error);
      return null;
    }
  }

  private extractRoleFromToken(decoded: any): string {
    //  PRIORIDAD 1: Campo 'role' directo
    if (decoded.role) {
      const role = decoded.role.replace('ROLE_', '').toUpperCase();
      console.log('✅ Rol encontrado en campo "role":', role);
      return role;
    }
    
    // PRIORIDAD 2: Campo 'authorities' como array
    if (decoded.authorities && Array.isArray(decoded.authorities)) {
      const roleAuth = decoded.authorities.find((auth: string) => 
        auth.startsWith('ROLE_')
      );
      if (roleAuth) {
        const role = roleAuth.replace('ROLE_', '').toUpperCase();
        console.log('✅ Rol encontrado en authorities:', role);
        return role;
      }
    }

    // PRIORIDAD 3: Campo 'scope'
    if (decoded.scope) {
      if (decoded.scope.includes('ADMIN')) return 'ADMIN';
      if (decoded.scope.includes('CLIENTE')) return 'CLIENTE';
      if (decoded.scope.includes('USUARIO')) return 'USUARIO';
    }

    console.warn('⚠️ No se encontró rol en el token, usando USUARIO por defecto');
    return 'USUARIO';
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      const exp = decoded.exp;
      
      if (!exp) return false;
      
      const now = Math.floor(Date.now() / 1000);
      const isExpired = exp < now;
      
      if (isExpired) {
        console.log('⏰ Token expirado:', new Date(exp * 1000));
      }
      
      return isExpired;
    } catch (error) {
      console.error('❌ Error al verificar expiración del token:', error);
      return true;
    }
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  // Métodos seguros para SSR
  private getItem(key: string): string | null {
    if (this.isBrowser) {
      const value = localStorage.getItem(key);
      return value;
    }
    return null;
  }

  private setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  private removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }
}