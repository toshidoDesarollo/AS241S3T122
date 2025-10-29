import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Proveedor } from '../../../core/interfaces/proveedor';
import { ProveedorService } from '../../../core/services/proveedor.service';

@Component({
  selector: 'app-proveedor-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedor-form.html',
  styleUrls: ['./proveedor-form.scss']
})
export class ProveedorForm {
  @Input() proveedor: Proveedor | null = null;
  @Output() guardar = new EventEmitter<Proveedor>();
  @Output() cerrar = new EventEmitter<void>();

  proveedorData: Proveedor = {
    company_name: '',
    ruc: '',
    address: '',
    gmail: '',
    cell_number: '',
    fecha_registro: '',
    state: 'A'
  };

  constructor(private proveedorService: ProveedorService) { }

  ngOnInit(): void {
    if (this.proveedor) {
      this.proveedorData = { ...this.proveedor };
    } else {
      const hoy = new Date();
      this.proveedorData.fecha_registro = hoy.toISOString().split('T')[0];
    }
  }

  // Guardar o actualizar
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.proveedorData.id) {
      this.proveedorService.update(this.proveedorData).subscribe({
        next: (resp) => this.guardar.emit(resp),
        error: (err) => console.error('Error al actualizar proveedor', err)
      });
    } else {
      this.proveedorService.save(this.proveedorData).subscribe({
        next: (resp) => this.guardar.emit(resp),
        error: (err) => console.error('Error al guardar proveedor', err)
      });
    }
  }

  onCancel() {
    this.cerrar.emit();
  }

  // Solo letras (sin espacio)
  soloLetrasSinEspacio(event: KeyboardEvent) {
    const pattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]$/;
    if (!pattern.test(event.key)) event.preventDefault();
  }

  // Solo letras (permitiendo espacios)
  soloLetrasConEspacio(event: KeyboardEvent) {
    const pattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]$/;
    if (!pattern.test(event.key)) event.preventDefault();
  }

  // VALIDACIÓN: solo números
  soloNumeros(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key)) event.preventDefault();
  }
}
