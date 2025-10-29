import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-form.html',
  styleUrl: './inventory-form.scss'
})
export class InventoryForm {
  @Input() inventory: any = {};
  @Input() existingProductIds: number[] = [];
  @Output() guardar = new EventEmitter<any>();
  @Output() cerrar = new EventEmitter<void>();

  touched = {
    productsId: false,
    quantityAvaila: false,
    batchNumber: false,
    specs: false,
    location: false,
    entry_date: false,
    lastUpdated: false,
    status: false
  };

  today: string;

  constructor() {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  guardarInventario() {
    this.markAllTouched();
    
    const esCreacion = !this.inventory.id;

    const esValido =
      (!esCreacion || this.productsIdValid()) && // solo valida productsId si es creación
      this.quantityValid() &&
      this.batchValid() &&
      this.specsValid() &&
      this.locationValid() &&
      this.entryDateValid() &&
      this.lastUpdatedValid() &&
      this.statusValid();

    if (esValido) {
      this.guardar.emit(this.inventory);
    }
  }

  markAllTouched() {
    for (const key in this.touched) {
      this.touched[key as keyof typeof this.touched] = true;
    }
  }

  productsIdValid(): boolean {
    if (this.inventory.id) return true;
    const id = this.inventory.productsId;
    const max = Math.max(...this.existingProductIds, 0);
    return id && id > max;
  }

  quantityValid(): boolean {
    return this.inventory.quantityAvaila > 0;
  }

  batchValid(): boolean {
    return this.inventory.batchNumber?.trim().length > 0;
  }

  specsValid(): boolean {
    return this.inventory.specs?.trim().length > 0;
  }

  locationValid(): boolean {
    return this.inventory.location?.trim().length > 0;
  }

  entryDateValid(): boolean {
    return !!this.inventory.entry_date;
  }

  lastUpdatedValid(): boolean {
    return !!this.inventory.lastUpdated;
  }

  statusValid(): boolean {
    return ['DIS', 'RES', 'TRA', 'DAÑ'].includes(this.inventory.status);
  }

  cerrarFormulario() {
    this.cerrar.emit();
  }

}
