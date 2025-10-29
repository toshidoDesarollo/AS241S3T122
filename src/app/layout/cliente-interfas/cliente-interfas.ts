// src/app/layout/cliente-interfas/cliente-interfas.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cliente-interfas',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cliente-interfas.html',
  styleUrl: './cliente-interfas.scss',
})
export class ClienteInterfas implements OnInit {
  username: string | null = null;
  userRole: string | null = null;
  isCliente: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserInfo();
    this.verificarAcceso();
  }

  /**
   *  Cargar información del usuario desde el AuthService
   */
  loadUserInfo() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.username = currentUser.username;
      this.userRole = currentUser.role;
      this.isCliente = this.authService.hasRole('CLIENTE');
      
      console.log('👤 Usuario cliente cargado:', {
        username: this.username,
        role: this.userRole,
        isCliente: this.isCliente
      });
    }
  }

  /**
   *  Verificar que el usuario actual sea CLIENTE
   */
  verificarAcceso() {
    if (!this.authService.isAuthenticated()) {
      console.error('❌ Usuario no autenticado, redirigiendo a login');
      this.router.navigate(['/login-two']);
      return;
    }

    if (!this.isCliente) {
      console.error('❌ Usuario no es CLIENTE, acceso denegado');
      Swal.fire({
        title: 'Acceso Denegado',
        text: 'Esta sección es solo para clientes.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      }).then(() => {
        this.authService.logout();
      });
    }
  }

  /**
   *  Método de logout mejorado con SweetAlert2
   */
  logout() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Estás a punto de salir de tu cuenta.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('🔹 Cliente cerrando sesión...');
        // El authService.logout() limpia la sesión y redirige automáticamente
        this.authService.logout();
      }
    });
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /**
   *  Verificar si es cliente
   */
  hasClienteRole(): boolean {
    return this.isCliente;
  }
}