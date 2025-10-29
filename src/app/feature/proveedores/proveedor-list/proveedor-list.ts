import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash, faRotateRight, faSeedling, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ProveedorService } from '../../../core/services/proveedor.service';
import { Proveedor } from '../../../core/interfaces/proveedor';
import { ProveedorForm } from '../proveedor-form/proveedor-form';

@Component({
  selector: 'app-proveedor-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    DatePipe,
    ProveedorForm
  ],
  templateUrl: './proveedor-list.html',
  styleUrls: ['./proveedor-list.scss']
})
export class ProveedorList implements OnInit {

  proveedores: Proveedor[] = [];
  proveedoresFiltrados: Proveedor[] = [];

  proveedorParaEditar: Proveedor | null = null;
  mostrarFormulario = false;

  searchTerm = '';
  currentFilter: 'all' | 'active' | 'inactive' = 'active';

  activosCount = 0;
  inactivosCount = 0;
  totalCount = 0;

  constructor(
    private proveedorService: ProveedorService,
    private route: ActivatedRoute,
    library: FaIconLibrary
  ) {
    library.addIcons(faPen, faTrash, faRotateRight, faSeedling, faFilePdf);
  }

  ngOnInit(): void {
    this.proveedores = this.route.snapshot.data['proveedores'] || [];
    this.actualizarContadores();
    this.filtrarProveedores();
  }

  recargarProveedores(): void {
    this.proveedorService.findAll().subscribe({
      next: (data) => {
        this.proveedores = data || [];
        this.actualizarContadores();
        this.filtrarProveedores();
      },
      error: (err) => {
        console.error('Error al recargar proveedores:', err);
        Swal.fire('Error', 'No se pudieron cargar los proveedores.', 'error');
      }
    });
  }

  actualizarContadores(): void {
    this.activosCount = this.proveedores.filter((p: Proveedor) => p.state === 'A').length;
    this.inactivosCount = this.proveedores.filter((p: Proveedor) => p.state === 'I').length;
    this.totalCount = this.proveedores.length;
  }

  filtrarProveedores(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.proveedoresFiltrados = this.proveedores.filter((p: Proveedor) => {
      const coincideTexto =
        p.company_name.toLowerCase().includes(term) ||
        p.ruc.toLowerCase().includes(term) ||
        p.gmail.toLowerCase().includes(term);

      if (this.currentFilter === 'active') return coincideTexto && p.state === 'A';
      if (this.currentFilter === 'inactive') return coincideTexto && p.state === 'I';
      return coincideTexto;
    });
  }

  setFilter(filter: 'all' | 'active' | 'inactive'): void {
    this.currentFilter = filter;
    this.filtrarProveedores();
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.proveedorParaEditar = null;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  editar(proveedor: Proveedor): void {
    this.mostrarFormulario = true;
    this.proveedorParaEditar = { ...proveedor };
  }

  guardarProveedor(proveedor: Proveedor): void {
    const nuevoProveedor = { ...proveedor };

    if (!nuevoProveedor.id || nuevoProveedor.id === 0) {
      delete nuevoProveedor.id;
      this.proveedorService.save(nuevoProveedor).subscribe({
        next: () => {
          this.recargarProveedores();
          this.mostrarFormulario = false;
          Swal.fire({
            icon: 'success',
            title: 'Proveedor agregado',
            text: 'El proveedor se ha registrado correctamente.',
            timer: 2000,
            showConfirmButton: false
          });
        },
        error: (err) => {
          console.error('Error al guardar proveedor:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar',
            text: err?.error?.message || 'No se pudo registrar el proveedor. Verifica los datos.',
          });
        }
      });
    } else {
      this.proveedorService.update(nuevoProveedor).subscribe({
        next: () => {
          this.recargarProveedores();
          this.mostrarFormulario = false;
          Swal.fire({
            icon: 'success',
            title: 'Proveedor actualizado',
            text: 'Los datos se actualizaron correctamente.',
            timer: 2000,
            showConfirmButton: false
          });
        },
        error: (err) => {
          console.error('Error al actualizar proveedor:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: err?.error?.message || 'No se pudo actualizar el proveedor.',
          });
        }
      });
    }
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Deseas eliminar este proveedor?',
      text: 'El proveedor se marcará como inactivo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proveedorService.deleteLogico(id).subscribe({
          next: () => {
            this.recargarProveedores();
            Swal.fire('Eliminado', 'El proveedor ha sido desactivado.', 'success');
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el proveedor.', 'error')
        });
      }
    });
  }

  restaurar(id: number): void {
    this.proveedorService.restore(id).subscribe({
      next: () => {
        this.recargarProveedores();
        Swal.fire('Restaurado', 'El proveedor ha sido reactivado.', 'success');
      },
      error: () => Swal.fire('Error', 'No se pudo restaurar el proveedor.', 'error')
    });
  }

  reportPdf(): void {
    Swal.fire('Reporte', 'La generación de reportes PDF aún no está implementada.', 'info');
  }
}
