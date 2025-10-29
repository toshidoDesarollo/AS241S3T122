import { Component, OnInit, AfterViewInit, ViewChild, inject, OnDestroy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/interfaces/order.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { OrderForm } from '../order-form/order-form';
import { OrderDetailDialog } from '../order-detail-dialog/order-detail-dialog';

import {
  EstadoOrdenPipe,
  MetodoPagoPipe,
  DiasHastaEntregaPipe,
  ResumenDireccionPipe,
  CantidadProductosPipe,
  PrioridadOrdenPipe,
} from '../../../core/pipes/order.pipes';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    MatSortModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    EstadoOrdenPipe,
    MetodoPagoPipe,
    DiasHastaEntregaPipe,
    ResumenDireccionPipe,
    CantidadProductosPipe,
    PrioridadOrdenPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList implements OnInit, AfterViewInit, OnDestroy {
  private orderService = inject(OrderService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);

  dataSourceCompleted = new MatTableDataSource<Order>([]);
  dataSourcePending = new MatTableDataSource<Order>([]);
  dataSourceCancelled = new MatTableDataSource<Order>([]);

  @ViewChild('paginatorCompleted') paginatorCompleted!: MatPaginator;
  @ViewChild('paginatorPending') paginatorPending!: MatPaginator;
  @ViewChild('paginatorCancelled') paginatorCancelled!: MatPaginator;

  @ViewChild('sortCompleted') sortCompleted!: MatSort;
  @ViewChild('sortPending') sortPending!: MatSort;
  @ViewChild('sortCancelled') sortCancelled!: MatSort;

  displayedColumns: string[] = [
    'id',
    'orderDate',
    'deliveryDate',
    'deliveryAddress',
    'paymentMethod',
    'notes',
    'totalAmount',
    'status',
    'actions',
    'details',
    'report',
  ];

  // ========== VARIABLES DE FILTROS ==========
  filterId: number | null = null;
  filterDate: Date | null = null;
  filterAddress: string = '';

  private allOrders: Order[] = [];
  private allPendingOrders: Order[] = [];
  private allCompletedOrders: Order[] = [];
  private allCancelledOrders: Order[] = [];

  // ========== AUTO-ACTUALIZACIÓN ==========
  private autoRefreshSubscription?: Subscription;
  private refreshInterval = 30000; // 30 segundos

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['ordenesPendientes']) {
        this.allPendingOrders = data['ordenesPendientes'];
        this.dataSourcePending.data = [...this.allPendingOrders];
        this.loadRemainingOrders();
      }
    });

    // ✅ Iniciar auto-actualización
    this.startAutoRefresh();
  }

  ngOnDestroy(): void {
    // ✅ Detener auto-actualización al destruir el componente
    if (this.autoRefreshSubscription) {
      this.autoRefreshSubscription.unsubscribe();
    }
  }

  // ========== AUTO-ACTUALIZACIÓN ==========
  private startAutoRefresh(): void {
    this.autoRefreshSubscription = interval(this.refreshInterval).subscribe(() => {
      console.log('🔄 Auto-actualizando órdenes...');
      this.loadOrdersSilently();
    });
  }

  private loadOrdersSilently(): void {
    this.orderService.findAll().subscribe({
      next: (data: Order[]) => {
        this.allOrders = data;
        this.allPendingOrders = data.filter((order) => order.status === 'P');
        this.allCompletedOrders = data.filter((order) => order.status === 'E');
        this.allCancelledOrders = data.filter((order) => order.status === 'C');
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error en auto-actualización:', err);
      },
    });
  }

  private loadRemainingOrders(): void {
    this.orderService.findByEstado('E').subscribe({
      next: (data) => {
        this.allCompletedOrders = data;
        this.dataSourceCompleted.data = [...this.allCompletedOrders];
      },
    });
    this.orderService.findByEstado('C').subscribe({
      next: (data) => {
        this.allCancelledOrders = data;
        this.dataSourceCancelled.data = [...this.allCancelledOrders];
      },
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSourceCompleted.paginator = this.paginatorCompleted;
      this.dataSourceCompleted.sort = this.sortCompleted;

      this.dataSourcePending.paginator = this.paginatorPending;
      this.dataSourcePending.sort = this.sortPending;

      this.dataSourceCancelled.paginator = this.paginatorCancelled;
      this.dataSourceCancelled.sort = this.sortCancelled;
    });
  }

  // ========== FILTROS ==========
  applyFilters(): void {
    // Filtrar PENDIENTES
    let filteredPending = [...this.allPendingOrders];
    
    if (this.filterId !== null && this.filterId !== undefined) {
      filteredPending = filteredPending.filter(order => order.id === this.filterId);
    }
    
    if (this.filterDate) {
      const filterDateStr = this.filterDate.toISOString().split('T')[0];
      filteredPending = filteredPending.filter(order => {
        const orderDateStr = new Date(order.orderDate).toISOString().split('T')[0];
        return orderDateStr === filterDateStr;
      });
    }
    
    if (this.filterAddress.trim() !== '') {
      const addressLower = this.filterAddress.toLowerCase();
      filteredPending = filteredPending.filter(order => 
        order.deliveryAddress?.toLowerCase().includes(addressLower)
      );
    }
    
    this.dataSourcePending.data = filteredPending;

    // Filtrar ENTREGADOS
    let filteredCompleted = [...this.allCompletedOrders];
    
    if (this.filterId !== null && this.filterId !== undefined) {
      filteredCompleted = filteredCompleted.filter(order => order.id === this.filterId);
    }
    
    if (this.filterDate) {
      const filterDateStr = this.filterDate.toISOString().split('T')[0];
      filteredCompleted = filteredCompleted.filter(order => {
        const orderDateStr = new Date(order.orderDate).toISOString().split('T')[0];
        return orderDateStr === filterDateStr;
      });
    }
    
    if (this.filterAddress.trim() !== '') {
      const addressLower = this.filterAddress.toLowerCase();
      filteredCompleted = filteredCompleted.filter(order => 
        order.deliveryAddress?.toLowerCase().includes(addressLower)
      );
    }
    
    this.dataSourceCompleted.data = filteredCompleted;

    // Filtrar CANCELADOS
    let filteredCancelled = [...this.allCancelledOrders];
    
    if (this.filterId !== null && this.filterId !== undefined) {
      filteredCancelled = filteredCancelled.filter(order => order.id === this.filterId);
    }
    
    if (this.filterDate) {
      const filterDateStr = this.filterDate.toISOString().split('T')[0];
      filteredCancelled = filteredCancelled.filter(order => {
        const orderDateStr = new Date(order.orderDate).toISOString().split('T')[0];
        return orderDateStr === filterDateStr;
      });
    }
    
    if (this.filterAddress.trim() !== '') {
      const addressLower = this.filterAddress.toLowerCase();
      filteredCancelled = filteredCancelled.filter(order => 
        order.deliveryAddress?.toLowerCase().includes(addressLower)
      );
    }
    
    this.dataSourceCancelled.data = filteredCancelled;
  }

  clearFilters(): void {
    this.filterId = null;
    this.filterDate = null;
    this.filterAddress = '';
    this.applyFilters();
  }

  // ========== RESTO DE MÉTODOS (sin cambios) ==========
  
  generateReport(orderId: number): void {
    this.orderService.generateOrderReport(orderId).subscribe({
      next: (data: Blob) => {
        const fileURL = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = `reporte_orden_${orderId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(fileURL);
      },
      error: (err) => {
        console.error('Error al generar el reporte:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo generar el reporte de la orden.',
        });
      },
    });
  }

  loadOrders(): void {
    this.orderService.findAll().subscribe({
      next: (data: Order[]) => {
        this.allOrders = data;
        this.allPendingOrders = data.filter((order) => order.status === 'P');
        this.allCompletedOrders = data.filter((order) => order.status === 'E');
        this.allCancelledOrders = data.filter((order) => order.status === 'C');
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error al cargar las órdenes:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar las órdenes.',
        });
      },
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
    setTimeout(() => {
      if (event.index === 0) {
        this.dataSourcePending.paginator = this.paginatorPending;
        this.dataSourcePending.sort = this.sortPending;
      } else if (event.index === 1) {
        this.dataSourceCompleted.paginator = this.paginatorCompleted;
        this.dataSourceCompleted.sort = this.sortCompleted;
      } else if (event.index === 2) {
        this.dataSourceCancelled.paginator = this.paginatorCancelled;
        this.dataSourceCancelled.sort = this.sortCancelled;
      }
    });
  }

  editOrder(order: Order): void {
    Swal.fire({
      title: '¿Editar esta orden?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const dialogRef = this.dialog.open(OrderForm, {
          width: '700px',
          data: { order: { ...order } },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.loadOrders();
          }
        });
      }
    });
  }

  createNewOrder(): void {
    const newOrder: Partial<Order> = {
      orderDate: new Date(),
      status: 'P',
    };

    const dialogRef = this.dialog.open(OrderForm, {
      width: '700px',
      data: { order: newOrder },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadOrders();
      }
    });
  }

  changeOrderStatus(orderId: number, currentStatus: string, newStatus: string): void {
    const statusNames: { [key: string]: string } = {
      'P': 'Pendiente',
      'E': 'Entregado',
      'C': 'Cancelado'
    };

    Swal.fire({
      title: `¿Cambiar estado a ${statusNames[newStatus]}?`,
      html: `La orden #${orderId} cambiará de <b>${statusNames[currentStatus]}</b> a <b>${statusNames[newStatus]}</b>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#38a169',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.changeStatus(orderId, newStatus).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Estado actualizado!',
              text: `La orden ahora está en estado: ${statusNames[newStatus]}`,
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.loadOrders();
          },
          error: (err) => {
            console.error('Error al cambiar el estado:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo cambiar el estado de la orden.',
            });
          },
        });
      }
    });
  }

  deleteOrderPermanently(id: number): void {
    Swal.fire({
      title: '⚠️ ¿Eliminar permanentemente?',
      html: `Esta acción <b>NO SE PUEDE DESHACER</b>.<br>La orden #${id} será eliminada de forma permanente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar permanentemente',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteFisico(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'La orden ha sido eliminada permanentemente.',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            this.loadOrders();
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la orden.',
            });
          },
        });
      }
    });
  }

  viewDetails(order: Order): void {
    this.dialog.open(OrderDetailDialog, {
      width: '600px',
      data: { order },
    });
  }
}