import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // ✅ NUEVO
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip'; // ✅ CORREGIDO: MatTooltipModule ya estaba, pero se asegura su uso.
import { MatDialog } from '@angular/material/dialog';
import { parseISO, isValid } from 'date-fns';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../../core/services/usuario.service';
import { Usuario } from '../../../core/interfaces/usuario';
import { UserForm } from '../user-form/user-form';
import { UserSaleRegister } from '../user-sale-register/user-sale-register';

// ✅ NUEVO: Importar pipes de usuario
import { EstadoUsuarioPipe } from '../../../core/pipes/usuario.pipes';
import { GeneroUsuarioPipe } from '../../../core/pipes/usuario.pipes';
import { MonedaVentasPipe } from '../../../core/pipes/usuario.pipes';
import { RendimientoVendedorPipe } from '../../../core/pipes/usuario.pipes';
import { UltimaVentaPipe } from '../../../core/pipes/usuario.pipes';
import { CantidadVentasPipe } from '../../../core/pipes/usuario.pipes';
// ⚠️ CORRECCIÓN: Importar el pipe faltante TipoDocumentoUsuarioPipe
import { TipoDocumentoUsuarioPipe } from '../../../core/pipes/usuario.pipes';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    DatePipe,
    MatTooltipModule, 
    EstadoUsuarioPipe,
    GeneroUsuarioPipe,
    MonedaVentasPipe,
    RendimientoVendedorPipe,
    UltimaVentaPipe,
    CantidadVentasPipe,
    TipoDocumentoUsuarioPipe,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'vendedor',
    'contacto',
    'genero',
    'ventas',
    'cantidad',
    'registrationDate',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Usuario>();
  isLoading = true;
  currentFilterStatus: 'all' | 'active' | 'inactive' = 'active';
  allUsers: Usuario[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute, 
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // ✅ NUEVO: Consumir datos del resolver
    this.route.data.subscribe((data) => {
      if (data['usuarios']) {
        this.allUsers = data['usuarios'].map((user: Usuario) => this.mapearUsuario(user));
        this.applyStatusFilter(this.currentFilterStatus);
        this.isLoading = false;
      } else {
        this.loadUsers(); 
      }
    });

    this.dataSource.filterPredicate = (data: Usuario, filter: string) => {
      const searchTerm = filter.trim().toLowerCase();
      const fullName = (data.firstName + ' ' + data.lastName).toLowerCase();
      const document = (data.documentType + ' ' + data.numberDocument).toLowerCase();
      const email = (data.email || '').toLowerCase();
      const address = (data.address || '').toLowerCase();

      const matchesSearch =
        fullName.includes(searchTerm) ||
        document.includes(searchTerm) ||
        email.includes(searchTerm) ||
        address.includes(searchTerm);

      if (this.currentFilterStatus === 'active') {
        return matchesSearch && data.estado === 'A';
      } else if (this.currentFilterStatus === 'inactive') {
        return matchesSearch && data.estado === 'I';
      }
      return matchesSearch;
    };
  }

  ngAfterViewInit() {
    // Conectar paginator y sort después de que la vista se inicialice
  }

  private mapearUsuario(user: Usuario): Usuario {
    return {
      ...user,
      totalSales: user.totalSales ?? 0,
      totalSaleAmount: user.totalSaleAmount ?? 0,
      registrationDate: user.registrationDate
        ? typeof user.registrationDate === 'string' && isValid(parseISO(user.registrationDate))
          ? parseISO(user.registrationDate)
          : user.registrationDate instanceof Date
          ? user.registrationDate
          : null
        : null,
      lastSaleDate: user.lastSaleDate
        ? typeof user.lastSaleDate === 'string' && isValid(parseISO(user.lastSaleDate))
          ? parseISO(user.lastSaleDate)
          : user.lastSaleDate instanceof Date
          ? user.lastSaleDate
          : null
        : null,
    };
  }

  private connectPaginatorAndSort(): void {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.dataSource.data.length > 0) {
        this.paginator.firstPage();
      }
    } else {
      console.warn('Paginador o Sort aún no disponibles.');
    }
  }

  loadUsers(): void {
    this.isLoading = true;
    this.usuarioService.findAll().subscribe({
      next: (data) => {
        this.allUsers = data.map((user) => this.mapearUsuario(user));
        this.applyStatusFilter(this.currentFilterStatus);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al cargar la lista de vendedores. Por favor, inténtelo de nuevo más tarde.',
          confirmButtonText: 'Entendido',
        });
      },
    });
  }

  applyStatusFilter(status: 'all' | 'active' | 'inactive'): void {
    this.currentFilterStatus = status;
    let filteredUsers: Usuario[] = [];

    if (status === 'active') {
      filteredUsers = this.allUsers.filter((user) => user.estado === 'A');
    } else if (status === 'inactive') {
      filteredUsers = this.allUsers.filter((user) => user.estado === 'I');
    } else {
      filteredUsers = [...this.allUsers];
    }
    this.dataSource.data = filteredUsers;
    this.dataSource.filter = this.dataSource.filter;
    setTimeout(() => {
      this.connectPaginatorAndSort();
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
    if (event.index === 0) {
      setTimeout(() => {
        this.connectPaginatorAndSort();
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserForm, {
      width: '600px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  openEditUserDialog(usuario: Usuario): void {
    const dialogRef = this.dialog.open(UserForm, {
      width: '600px',
      data: { isEdit: true, usuario: { ...usuario } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deleteUser(id: number | undefined): void {
    if (id === undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Eliminación',
        text: 'Error: ID de usuario no disponible para eliminar.',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto! El usuario será marcado como inactivo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo lógicamente',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(id).subscribe({
          next: () => {
            this.loadUsers();
            Swal.fire('Eliminado!', 'El usuario ha sido eliminado lógicamente.', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar usuario:', err);
            Swal.fire('Error', 'Hubo un error al eliminar el usuario.', 'error');
          },
        });
      }
    });
  }

  openUserSaleRegisterDialog(usuario: Usuario): void {
    if (usuario.id === undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Registro',
        text: 'Error: ID de usuario no disponible para registrar venta.',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    const dialogRef = this.dialog.open(UserSaleRegister, {
      width: '400px',
      data: {
        userId: usuario.id,
        userName: `${usuario.firstName} ${usuario.lastName}`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.saleAmount !== undefined && result.quantity !== undefined) {
        const saleAmount = parseFloat(result.saleAmount);
        const quantity = parseInt(result.quantity, 10);

        if (!isNaN(saleAmount) && saleAmount > 0 && !isNaN(quantity) && quantity > 0) {
          this.usuarioService.registerSale(usuario.id, saleAmount, quantity).subscribe({
            next: () => {
              Swal.fire('Éxito!', 'Venta registrada exitosamente!', 'success');
              this.loadUsers();
            },
            error: (err) => {
              console.error('Error al registrar venta:', err);
              Swal.fire('Error', 'Hubo un error al registrar la venta.', 'error');
            },
          });
        } else {
          Swal.fire('Atención', 'Monto y/o cantidad inválidos.', 'warning');
        }
      }
    });
  }
}
