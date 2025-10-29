// src/app/core/services/auth.guard.ts
import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  UrlTree, 
  Router,
  CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    //  Verificar si está autenticado
    if (!this.authService.isAuthenticated()) {
      console.log('❌ Usuario no autenticado, redirigiendo a login');
      this.router.navigate(['/login-two']);
      return false;
    }

    //  Obtener roles esperados de la ruta
    const expectedRoles = route.data['roles'] as string[];
    
    if (expectedRoles && expectedRoles.length > 0) {
      const hasRole = this.authService.hasAnyRole(expectedRoles);
      const userRole = this.authService.getUserRole();
      
      console.log('🔍 Verificando acceso a:', state.url);
      console.log('🔍 Roles requeridos:', expectedRoles);
      console.log('🔍 Rol del usuario:', userRole);
      console.log('🔍 Tiene permiso:', hasRole ? 'SÍ ✅' : 'NO ❌');
      
      if (!hasRole) {
        //  Redirigir según el rol del usuario
        if (userRole === 'ADMIN') {
          console.log('➡️ ADMIN sin permiso, redirigiendo a /dashboard');
          this.router.navigate(['/dashboard']);
        } else if (userRole === 'USUARIO') {
          console.log('➡️ USUARIO sin permiso, redirigiendo a /productos');
          this.router.navigate(['/productos']);
        } else if (userRole === 'CLIENTE') {
          console.log('➡️ CLIENTE sin permiso, redirigiendo a /cliente/client-product');
          this.router.navigate(['/cliente/client-product']);
        } else {
          console.log('➡️ Rol desconocido, redirigiendo a /login-two');
          this.router.navigate(['/login-two']);
        }
        
        return false;
      }
    }

    console.log(' Acceso permitido a:', state.url);
    return true;
  }
}