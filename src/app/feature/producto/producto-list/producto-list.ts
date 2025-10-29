import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoForm } from '../producto-form/producto-form';
import Swal from 'sweetalert2';
import { faPen, faTrash, faRotateRight, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/interfaces/producto';
import { CodeToLabelPipe } from '../../../core/pipes/productcode.pipes';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductoForm, FontAwesomeModule, CurrencyPipe, CodeToLabelPipe],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.scss'
})
export class ProductoList implements OnInit {

  constructor(library: FaIconLibrary) {
    library.addIcons(faPen, faTrash, faRotateRight, faSeedling);
  }

  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  private router = inject(Router);

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  searchTerm = '';
  currentFilter: 'all' | 'active' | 'inactive' = 'active';
  mostrarFormulario = false;

  // 3. DEFINICIÓN DE LOS MAPAS DE TRADUCCIÓN
  unitMap: { [key: string]: string } = {
    'L': 'Litro',
    'K': 'Kilo'
  };

  categoryMap: { [key: string]: string } = {
    'FU': 'Fungicida',
    'IN': 'Insecticida',
    'FO': 'Foliar',
    'SE': 'Semilla',
    'HE': 'Herbicida'
  };

    toxicityMap: { [key: string]: string } = {
      'am': 'amarillo',
      'ro': 'rojo',
      've': 'verde',
      'az': 'azul'
    };

  productoParaEditar: Producto = {
    id: 0,
    name: '',
    brand: '',
    unit_measure: '',
    categories: '',
    unit_price: null,
    minimum_stock: null,
    toxicity: '',
    expiration_date: '',
    state: 'A'
  };

  ngOnInit(): void {
    this.route.data.subscribe(({ productos }) => {
      if (productos?.length) {
        this.productos = productos;
        this.filtrarProductos();
      } else {
        this.recargarTodos();
      }
    });
  }

  abrirFormulario(): void {
    this.productoParaEditar = {
      id: 0,
      name: '',
      brand: '',
      unit_measure: '',
      categories: '',
      unit_price: null,
      minimum_stock: null,
      toxicity: '',
      expiration_date: '',
      state: 'A'
    };
    this.mostrarFormulario = true;
  }

  editar(producto: Producto): void {
    this.productoParaEditar = { ...producto };
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  procesarProductoGuardado(producto: Producto) {
    const productoACrearOActualizar = { ...producto };
    const isNewProduct = productoACrearOActualizar.id === 0;
    if (isNewProduct) delete productoACrearOActualizar.id;

    this.productoService.save(productoACrearOActualizar).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: isNewProduct ? '¡Producto Creado!' : '¡Producto Actualizado!',
          showConfirmButton: false,
          timer: 1500
        });
        this.recargarTodos();
        this.cerrarFormulario();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al Guardar',
          text: 'No se pudo guardar el producto.',
        });
      }
    });
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este producto se pondrá como "Inactivo".',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, inactivar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.productoService.deleteLogico(id).subscribe({
          next: () => {
            Swal.fire('¡Inactivado!', 'El producto ha sido marcado como inactivo.', 'success');
            this.recargarTodos();
          },
          error: () => Swal.fire('Error', 'No se pudo inactivar el producto.', 'error')
        });
      }
    });
  }

  restaurar(id: number) {
    Swal.fire({
      title: '¿Restaurar producto?',
      text: 'Se pondrá como "Activo".',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, restaurar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.productoService.findById(id).subscribe({
          next: productoEncontrado => {
            if (productoEncontrado) {
              productoEncontrado.state = 'A';
              this.productoService.save(productoEncontrado).subscribe({
                next: () => {
                  Swal.fire('¡Restaurado!', 'Producto activo nuevamente.', 'success');
                  this.recargarTodos();
                },
                error: () => Swal.fire('Error', 'No se pudo restaurar el producto.', 'error')
              });
            }
          },
          error: () => Swal.fire('Error', 'No se pudo obtener el producto.', 'error')
        });
      }
    });
  }

  //Recarga todos los productos (activos + inactivos)
  private recargarTodos(): void {
    this.productoService.findAll().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.filtrarProductos();
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los productos.', 'error');
      }
    });
  }

  setFilter(filter: 'all' | 'active' | 'inactive'): void {
    this.currentFilter = filter;
    this.filtrarProductos();
  }

  filtrarProductos(): void {
    const term = this.searchTerm.trim().toLowerCase();

    let temp = [...this.productos];

    // Aplica el filtro según el botón seleccionado
    if (this.currentFilter === 'active') {
      temp = temp.filter(p => p.state === 'A');
    } else if (this.currentFilter === 'inactive') {
      temp = temp.filter(p => p.state === 'I');
    }

    // Aplica el filtro de búsqueda
    if (term) {
      temp = temp.filter(p =>
        p.name?.toLowerCase().includes(term) ||
        p.brand?.toLowerCase().includes(term) ||
        p.categories?.toLowerCase().includes(term)
      );
    }

    this.productosFiltrados = temp;
  }


  get activosCount(): number {
    return this.productos.filter(p => p.state === 'A').length;
  }

  get inactivosCount(): number {
    return this.productos.filter(p => p.state === 'I').length;
  }

  get totalCount(): number {
    return this.productos.length;
  }

  reportPdf() {
    this.productoService.reportPdf().subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte.pdf';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  goCustomerForm(): void {
    this.router.navigate(['/producto-form']);
  }
}
