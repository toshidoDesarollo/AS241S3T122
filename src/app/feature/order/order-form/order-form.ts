import { Component, inject, OnInit, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { OrderService } from '../../../core/services/order.service';
import { ProductoService } from '../../../core/services/producto.service';
import { Order, OrderDetail } from '../../../core/interfaces/order.model';
import { takeUntil, Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatTableModule,],
  providers: [
    provideNativeDateAdapter(),
  ],
  templateUrl: './order-form.html',
  styleUrl: './order-form.scss'
})
export class OrderForm implements OnInit, OnDestroy{
  private orderService = inject(OrderService);
  private productoService = inject(ProductoService); // ✅ Inyectar ProductoService
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<OrderForm>);
  private cdr = inject(ChangeDetectorRef);

  orderForm!: FormGroup;
  estados = ['P', 'E', 'C'];
  statusMap: { [key: string]: string } = {
    'P': 'Pendiente',
    'E': 'Entregado',
    'C': 'Cancelado'
  };

  displayedColumns: string[] = [
    'productId',
    'quantity',
    'unitPrice',
    'discount',
    'subtotal',
    'total',
    'comments',
    'actions',
  ];

  orderDetailsDataSource: FormGroup[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { order?: Order }) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      id: [this.data.order?.id || null],
      clientId: [this.data.order?.clientId || null, Validators.required],
      userId: [this.data.order?.userId || null, Validators.required],
      orderDate: [
        this.data.order?.orderDate
          ? new Date(this.data.order.orderDate)
          : new Date(),
        [Validators.required],
      ],
      deliveryDate: [
        this.data.order?.deliveryDate
          ? new Date(this.data.order.deliveryDate)
          : null,
        [Validators.required],
      ],
      deliveryAddress: [
        this.data.order?.deliveryAddress || '',
        [Validators.required],
      ],
      paymentMethod: [
        this.capitalizeFirstLetter(this.data.order?.paymentMethod || ''),
        [Validators.required],
      ],
      notes: [this.data.order?.notes || ''],
      totalAmount: [
        this.data.order?.totalAmount || 0,
        [Validators.required, Validators.min(0)],
      ],
      status: [
        this.data.order?.status || this.estados[0],
        [Validators.required],
      ],
      orderDetails: this.fb.array(
        this.data.order?.orderDetails
          ? this.data.order.orderDetails.map((detail) =>
              this.createOrderDetailFormGroup(detail)
            )
          : []
      ),
    });

    this.updateTotalAmount();
    this.updateDataSource();

    this.orderDetailsArray.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.updateTotalAmount();
      });

    this.orderForm
      .get('status')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((status) => {
        if (status === 'E') {
          this.orderForm.get('deliveryDate')?.patchValue(new Date());
        }
      });

    if (
      this.data.order?.status === 'E' &&
      !this.data.order?.deliveryDate
    ) {
      this.orderForm.get('deliveryDate')?.patchValue(new Date());
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private capitalizeFirstLetter(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  get orderDetailsArray(): FormArray {
    return this.orderForm.get('orderDetails') as FormArray;
  }

  private createOrderDetailFormGroup(detail?: OrderDetail): FormGroup {
    const formGroup = this.fb.group({
      id: [detail?.id || null],
      productId: [detail?.productId || null, [Validators.required]],
      quantity: [
        detail?.quantity || 1,
        [Validators.required, Validators.min(1)],
      ],
      unitPrice: [
        detail?.unitPrice || 0,
        [Validators.required, Validators.min(0)],
      ],
      discount: [
        detail?.discount || 0,
        [Validators.min(0), Validators.max(100)],
      ],
      subtotal: [detail?.subtotal || 0],
      total: [detail?.total || 0],
      comments: [detail?.comments || ''],
    });

    // ✅ Escuchar cambios en productId para cargar el precio automáticamente
    formGroup.get('productId')?.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500), // Esperar 500ms después de que el usuario termine de escribir
        distinctUntilChanged() // Solo si el valor cambió
      )
      .subscribe(productId => {
        if (productId && productId > 0) {
          this.loadProductPrice(formGroup, productId);
        }
      });

    formGroup.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.calculateOrderDetailTotals(formGroup);
    });

    this.calculateOrderDetailTotals(formGroup);
    return formGroup;
  }

  // ✅ Método para cargar el precio del producto desde el backend
  private loadProductPrice(detailFormGroup: FormGroup, productId: number): void {
    console.log('🔍 Buscando precio para producto ID:', productId);
    
    this.productoService.findById(productId).subscribe({
      next: (product) => {
        console.log('✅ Producto encontrado:', product);
        
        if (product && product.unit_price) {
          // Solo actualizar el precio si está en 0 o null
          const currentPrice = detailFormGroup.get('unitPrice')?.value;
          if (!currentPrice || currentPrice === 0) {
            detailFormGroup.patchValue({
              unitPrice: product.unit_price
            }, { emitEvent: true });
            
            Swal.fire({
              icon: 'success',
              title: 'Precio cargado',
              text: `Precio unitario: $${product.unit_price}`,
              timer: 1500,
              showConfirmButton: false,
              toast: true,
              position: 'top-end'
            });
          }
        } else {
          console.warn('⚠️ Producto sin precio definido');
          Swal.fire({
            icon: 'warning',
            title: 'Sin precio',
            text: 'El producto no tiene precio definido',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
          });
        }
      },
      error: (err) => {
        console.error('❌ Error al cargar producto:', err);
        Swal.fire({
          icon: 'error',
          title: 'Producto no encontrado',
          text: `No se encontró el producto con ID ${productId}`,
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
      }
    });
  }

  addOrderDetail(): void {
    console.log('🔵 Añadiendo nuevo detalle de orden...');
    const newDetail = this.createOrderDetailFormGroup();
    this.orderDetailsArray.push(newDetail);
    this.updateDataSource();
    this.cdr.detectChanges();
    console.log('✅ Total de detalles:', this.orderDetailsArray.length);
    console.log('✅ DataSource length:', this.orderDetailsDataSource.length);
  }

  removeOrderDetail(index: number): void {
    console.log('🔴 Eliminando detalle en índice:', index);
    this.orderDetailsArray.removeAt(index);
    this.updateTotalAmount();
    this.updateDataSource();
    this.cdr.detectChanges();
    console.log('✅ Total de detalles después de eliminar:', this.orderDetailsArray.length);
  }

  private updateDataSource(): void {
    this.orderDetailsDataSource = [...this.orderDetailsArray.controls] as FormGroup[];
    console.log('📊 DataSource actualizado. Longitud:', this.orderDetailsDataSource.length);
  }

  private calculateOrderDetailTotals(detailFormGroup: FormGroup): void {
    const quantity = detailFormGroup.get('quantity')?.value || 0;
    const unitPrice = detailFormGroup.get('unitPrice')?.value || 0;
    const discount = detailFormGroup.get('discount')?.value || 0;

    const subtotal = quantity * unitPrice;
    const total = subtotal * (1 - discount / 100);

    detailFormGroup.patchValue(
      {
        subtotal: subtotal,
        total: total,
      },
      { emitEvent: false }
    );
  }

  private updateTotalAmount(): void {
    const totalOrderAmount = this.orderDetailsArray.controls.reduce(
      (sum, detailFormGroup) => {
        return sum + ((detailFormGroup as FormGroup).get('total')?.value || 0);
      },
      0
    );
    this.orderForm
      .get('totalAmount')
      ?.patchValue(totalOrderAmount, { emitEvent: false });
  }

  save(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos requeridos correctamente.',
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro de que deseas guardar este pedido?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const formValue = this.orderForm.value;

        const orderData: Order = {
          ...formValue,
          orderDate:
            formValue.orderDate instanceof Date
              ? formValue.orderDate.toISOString()
              : formValue.orderDate,
          deliveryDate:
            formValue.deliveryDate instanceof Date
              ? formValue.deliveryDate.toISOString()
              : formValue.deliveryDate,
          orderDetails: formValue.orderDetails || [],
        };

        delete (orderData as any).createdAt;
        delete (orderData as any).updatedAt;

        if (orderData.id) {
          this.orderService.update(orderData).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Orden actualizada correctamente.',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
              this.dialogRef.close(true);
            },
            error: (err) => {
              console.error('Error al actualizar la orden:', err);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar la orden: ' + (err.error?.message || 'Error desconocido'),
              });
            },
          });
        } else {
          this.orderService.save(orderData).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Orden creada correctamente.',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
              this.dialogRef.close(true);
            },
            error: (err) => {
              console.error('Error al crear la orden:', err);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al crear la orden: ' + (err.error?.message || 'Error desconocido'),
              });
            },
          });
        }
      }
    });
  }

  cancel(): void {
    Swal.fire({
      title: '¿Estás seguro de que deseas cancelar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, continuar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close(false);
      }
    });
  }
}