// src/app/core/pipes/custom.pipes.ts
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'tipoDocumento',
  standalone: true
})
export class TipoDocumentoPipe implements PipeTransform {
  transform(value: string): string {
    const tipos: { [key: string]: string } = {
      'DNI': 'Documento Nacional de Identidad',
      'CNE': 'Carnet de Extranjería'
    };
    return tipos[value] || value;
  }
}

@Pipe({
  name: 'tipoCliente',
  standalone: true
})
export class TipoClientePipe implements PipeTransform {
  transform(value: string): string {
    const tipos: { [key: string]: string } = {
      'MI': 'Minorista',
      'MA': 'Mayorista'
    };
    return tipos[value] || value;
  }
}

@Pipe({
  name: 'estadoCliente',
  standalone: true
})
export class EstadoClientePipe implements PipeTransform {
  transform(value: string): string {
    return value === 'A' ? '✅ Activo' : '❌ Inactivo';
  }
}


@Pipe({
  name: 'telefonoPeru',
  standalone: true
})
export class TelefonoPeruPipe implements PipeTransform {
  transform(value: number | string): string {
    if (!value) return '';
    const num = String(value);
    return `+51 ${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6)}`;
  }
}


@Pipe({
  name: 'calcularEdad',
  standalone: true
})
export class CalcularEdadPipe implements PipeTransform {
  transform(birthdayDate: string | Date): string {
    if (!birthdayDate) return '';
    
    const today = new Date();
    const birthDate = new Date(birthdayDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age} años`;
  }
}


@Pipe({
  name: 'clienteVip',
  standalone: true
})
export class ClienteVipPipe implements PipeTransform {
  transform(cliente: any): string {
    if (!cliente) return '';
    const nombre = `${cliente.firstName} ${cliente.lastName}`;
    return cliente.vip ? `⭐ ${nombre} (VIP)` : nombre;
  }
}