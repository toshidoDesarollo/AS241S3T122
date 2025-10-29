// src/app/core/pipes/usuario.pipes.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoUsuario',
  standalone: true
})
export class EstadoUsuarioPipe implements PipeTransform {
  transform(value: string): string {
    return value === 'A' ? '✅ Activo' : '❌ Inactivo';
  }
}

@Pipe({
  name: 'generoUsuario',
  standalone: true
})
export class GeneroUsuarioPipe implements PipeTransform {
  transform(value: string): string {
    const generos: { [key: string]: string } = {
      'M': '👨 Masculino',
      'F': '👩 Femenino',
      'Masculino': '👨 Masculino',
      'Femenino': '👩 Femenino'
    };
    return generos[value] || value;
  }
}

@Pipe({
  name: 'monedaVentas',
  standalone: true
})
export class MonedaVentasPipe implements PipeTransform {
  transform(value: number): string {
    if (!value || value === 0) return 'S/ 0.00';
    
    let icono = '💰';
    if (value > 10000) icono = '💎'; 
    else if (value > 5000) icono = '🟢'; 
    else if (value > 1000) icono = '🟡'; 
    
    return `${icono} S/ ${value.toFixed(2)}`;
  }
}

@Pipe({
  name: 'tipoDocumentoUsuario',
  standalone: true
})
export class TipoDocumentoUsuarioPipe implements PipeTransform {
  transform(value: string): string {
    const tipos: { [key: string]: string } = {
      'DNI': '🆔 Documento Nacional de Identidad',
      'CNE': '📋 Carnet de Extranjería',
      'PASAPORTE': '🛂 Pasaporte'
    };
    return tipos[value] || value;
  }
}

@Pipe({
  name: 'ultimaVenta',
  standalone: true
})
export class UltimaVentaPipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (!value) return '📅 Sin registro';
    
    const fecha = new Date(value);
    const hoy = new Date();
    const ayer = new Date(hoy);
    ayer.setDate(ayer.getDate() - 1);
    
    const esHoy = fecha.toDateString() === hoy.toDateString();
    const esAyer = fecha.toDateString() === ayer.toDateString();
    
    if (esHoy) return '🕐 Hoy';
    if (esAyer) return '📆 Ayer';
    
    const dias = Math.floor((hoy.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24));
    if (dias < 30) return `📅 Hace ${dias} días`;
    
    return `📅 ${fecha.toLocaleDateString('es-PE')}`;
  }
}

@Pipe({
  name: 'rendimientoVendedor',
  standalone: true
})
export class RendimientoVendedorPipe implements PipeTransform {
  transform(usuario: any): string {
    if (!usuario) return 'Sin datos';
    
    const ventas = usuario.totalSales || 0;
    const monto = usuario.totalSaleAmount || 0;
    
    if (ventas === 0) return '📉 Sin ventas';
    if (monto > 5000) return '⭐ Vendedor Estrella';
    if (monto > 2000) return '🏆 Buen Desempeño';
    if (monto > 500) return '📈 En Desarrollo';
    
    return '🌱 Iniciante';
  }
}

@Pipe({
  name: 'nombreCompleto',
  standalone: true
})
export class NombreCompletoUsuarioPipe implements PipeTransform {
  transform(usuario: any): string {
    if (!usuario) return '';
    
    const nombre = `${usuario.firstName || ''} ${usuario.lastName || ''}`.trim();
    return nombre || 'Sin nombre';
  }
}

@Pipe({
  name: 'cantidadVentas',
  standalone: true
})
export class CantidadVentasPipe implements PipeTransform {
  transform(value: number): string { // Espera un número
    if (!value || value === 0) return '0️⃣ Sin ventas';
    // ...
    return `🛒 ${value} ventas`;
  }
}