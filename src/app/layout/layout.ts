// src/app/layout/layout.ts
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule, MatSidenavModule, MatIconModule, MatButtonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {
  sidebarOpen = false;
  isScreenSmall = false;
  isBrowser = false;
  userRole: string | null = null;
  username: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.checkScreen();
      this.loadUserInfo();
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    if (this.isBrowser) {
      this.checkScreen();
    }
  }

  checkScreen() {
    if (this.isBrowser && typeof window !== 'undefined') {
      this.isScreenSmall = window.innerWidth < 768;
      if (!this.isScreenSmall) {
        this.sidebarOpen = false;
      }
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  loadUserInfo() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.username = currentUser.username;
      this.userRole = currentUser.role;
    }
  }

  logout() {

    const confirmar = confirm('¿Está seguro que desea cerrar sesión?');

    if (confirmar) {
      this.authService.logout();
    }
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  hasAnyRole(roles: string[]): boolean {
    return this.authService.hasAnyRole(roles);
  }
}