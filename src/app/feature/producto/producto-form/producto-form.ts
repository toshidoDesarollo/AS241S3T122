import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../core/interfaces/producto';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.scss'
})
export class ProductoForm {
  @Input() producto: Producto = {
    name: '',
    brand: '',
    categories: '',
    unit_measure: '',
    unit_price: null,
    minimum_stock: null,
    toxicity: '',
    expiration_date: '',
    state: 'A'
  };

  @Output() guardar = new EventEmitter<Producto>();
  @Output() cerrar = new EventEmitter<void>();

  toxicityMap: { [key: string]: string } = {
    'am': 'amarillo',
    'ro': 'rojo',
    've': 'verde',
    'az': 'azul'
  };

  toxicityCodes: string[] = Object.keys(this.toxicityMap);

  nameTouched = false;
  brandTouched = false;
  unitTouched = false;
  categoryTouched = false;
  priceTouched = false;
  stockTouched = false;
  toxicityTouched = false;
  dateTouched = false;

  minDate!: string;

  constructor() {
    this.setMinMaxDates();
  }

  setMinMaxDates(): void {
    const today = new Date();
    const minAllowedDate = new Date(today);
    minAllowedDate.setFullYear(today.getFullYear() + 1);
    this.minDate = minAllowedDate.toISOString().split('T')[0];
  }

  sanitizeInput(value: string): string {
    value = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, '');
    value = value.replace(/ {3,}/g, '  ');
    value = value.replace(/^ +/, '');
    if (!/[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(value)) {
      value = value.replace(/ +/g, ' ');
    }
    return value;
  }

  // --- Eventos de entrada ---
  onInputName(event: any) {
    const value = event.target.value;
    const sanitized = this.sanitizeInput(value);
    this.producto.name = sanitized;
    event.target.value = sanitized;
  }

  onInputBrand(event: any) {
    const value = event.target.value;
    const sanitized = this.sanitizeInput(value);
    this.producto.brand = sanitized;
    event.target.value = sanitized;
  }

  // ELIMINAMOS onInputToxicity YA QUE USAMOS SELECT

  onInputPrice(event: any) {
    let value = event.target.value;
    value = value.replace(/[^0-9.,]/g, '');
    value = value.replace(/,/g, '.');
    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    event.target.value = value;

    const parsedValue = parseFloat(value);
    this.producto.unit_price = value === '' ? null : (isNaN(parsedValue) ? null : parsedValue);
  }

  onInputStock(event: any) {
    const value = parseInt(event.target.value, 10);
    this.producto.minimum_stock = isNaN(value) ? null : value;
  }

  // --- Validaciones ---
  nameValid(): boolean {
    return (
      this.producto.name.trim().length > 0 &&
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: {1,2}[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/.test(this.producto.name)
    );
  }

  brandValid(): boolean {
    return (
      this.producto.brand.trim().length > 0 &&
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: {1,2}[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/.test(this.producto.brand)
    );
  }

  // VALIDACIÓN DE TOXICIDAD REEMPLAZADA POR VERIFICACIÓN EN MAPA
  toxicityValid(): boolean {
    return this.toxicityCodes.includes(this.producto.toxicity);
  }

  unitValid(): boolean {
    return ['L', 'K'].includes(this.producto.unit_measure);
  }

  categoryValid(): boolean {
    return ['FU', 'IN', 'FO', 'SE'].includes(this.producto.categories);
  }

  isPriceContentReady(): boolean {
    return this.producto.unit_price !== null && this.producto.unit_price !== undefined;
  }

  priceValid(): boolean {
    return (
      typeof this.producto.unit_price === 'number' &&
      !isNaN(this.producto.unit_price) &&
      this.producto.unit_price > 0
    );
  }

  stockValid(): boolean {
    return this.producto.minimum_stock !== null && this.producto.minimum_stock! >= 0;
  }

  expirationDateValid(): boolean {
    if (!this.producto.expiration_date) return false;
    const selectedDate = new Date(this.producto.expiration_date);
    const minDateObj = new Date(this.minDate);
    selectedDate.setHours(0, 0, 0, 0);
    minDateObj.setHours(0, 0, 0, 0);
    return selectedDate >= minDateObj;
  }

  guardarProducto() {
    this.nameTouched = true;
    this.brandTouched = true;
    this.unitTouched = true;
    this.categoryTouched = true;
    this.priceTouched = true;
    this.stockTouched = true;
    this.toxicityTouched = true;
    this.dateTouched = true;

    if (
      this.nameValid() &&
      this.brandValid() &&
      this.unitValid() &&
      this.categoryValid() &&
      this.priceValid() &&
      this.stockValid() &&
      this.toxicityValid() && // Usamos la nueva validación
      this.expirationDateValid()
    ) {
      this.guardar.emit(this.producto);
    }
  }

  cerrarFormulario() {
    this.cerrar.emit();
  }
}
