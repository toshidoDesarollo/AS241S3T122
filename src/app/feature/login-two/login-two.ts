// src/app/feature/login-two/login-two.ts
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-two',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-two.html',
  styleUrl: './login-two.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LoginTwo {
  selectedRole: 'cliente' | 'admin' = 'cliente';
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // ✅ Verificar si ya está autenticado al cargar el componente
    if (this.isBrowser && this.authService.isAuthenticated()) {
      console.log('⚠️ Usuario ya autenticado, limpiando sesión para permitir nuevo login');
      this.authService.clearSession();
    }
  }

  selectRole(role: 'cliente' | 'admin') {
    // ✅ Evitar cambios innecesarios si ya está en ese rol
    if (this.selectedRole === role) {
      return;
    }
    
    // ✅ Limpiar completamente el estado anterior
    this.selectedRole = role;
    this.errorMessage = '';
    this.email = '';
    this.password = '';
    this.isLoading = false;
    
    console.log('🔄 Cambiado a rol:', role);
  }

  onSubmit() {
    // ✅ Validación de campos
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos';
      return;
    }

    // ✅ Prevenir múltiples envíos
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    console.log('🔹 Intentando login con:', this.email);
    console.log('🔹 Rol seleccionado:', this.selectedRole);

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('✅ Login exitoso, token recibido');
        
        // ✅ Esperar a que el token sea procesado completamente
        setTimeout(() => {
          const userRole = this.authService.getUserRole();
          console.log('🔍 Rol del usuario después del login:', userRole);
          
          // ✅ Validar según el rol seleccionado
          if (this.selectedRole === 'cliente') {
            if (userRole !== 'CLIENTE') {
              console.error('❌ Validación fallida: Usuario no es CLIENTE');
              this.errorMessage = 'Estas credenciales no corresponden a un cliente. Por favor, use la pestaña Admin/Usuario.';
              this.authService.logout();
              this.isLoading = false;
              this.password = '';
              return;
            }
          } else if (this.selectedRole === 'admin') {
            if (userRole !== 'ADMIN' && userRole !== 'USUARIO') {
              console.error('❌ Validación fallida: Usuario no es ADMIN ni USUARIO');
              this.errorMessage = 'Estas credenciales no corresponden a un administrador o usuario. Por favor, use la pestaña Cliente.';
              this.authService.logout();
              this.isLoading = false;
              this.password = '';
              return;
            }
          }

          console.log('✅ Validación exitosa, redirigiendo...');
          this.redirectByRole();
        }, 100);
      },
      error: (error) => {
        console.error('❌ Error en login:', error);
        this.isLoading = false;
        this.password = '';
        
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Verifique su usuario y contraseña.';
        } else if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión.';
        } else {
          this.errorMessage = 'Error al iniciar sesión. Intente nuevamente.';
        }
      }
    });
  }

  private redirectByRole() {
    const userRole = this.authService.getUserRole();
    console.log('🔹 Redirigiendo usuario con rol:', userRole);
    
    if (userRole === 'CLIENTE') {
      console.log('➡️ Redirigiendo a /cliente/client-product');
      this.router.navigate(['/cliente/client-product']);
    } else if (userRole === 'ADMIN') {
      console.log('➡️ Redirigiendo a /dashboard (ADMIN)');
      this.router.navigate(['/dashboard']);
    } else if (userRole === 'USUARIO') {
      console.log('➡️ Redirigiendo a /productos (USUARIO)');
      this.router.navigate(['/productos']);
    } else {
      console.error('❌ Rol no reconocido:', userRole);
      this.errorMessage = 'Rol no reconocido. Contacte al administrador.';
      this.authService.logout();
      this.isLoading = false;
    }
  }
}