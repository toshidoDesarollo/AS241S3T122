// src/app/core/pipes/order.pipes.ts
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'estadoOrden',
  standalone: true
})
export class EstadoOrdenPipe implements PipeTransform {
  transform(value: string): string {
    const estados: { [key: string]: string } = {
      'E': '✅ Entregado',
      'P': '⏳ Pendiente',
      'C': '❌ Cancelado'
    };
    return estados[value] || value;
  }
}


@Pipe({
  name: 'metodoPago',
  standalone: true
})
export class MetodoPagoPipe implements PipeTransform {
  transform(value: string): string {
    const iconos: { [key: string]: string } = {
      'Efectivo': '💵',
      'Yape': '📱',
      'Plin': '📱',
      'Transferencia': '🏦',
      'Tarjeta': '💳'
    };
    const icono = iconos[value] || '💰';
    return `${icono} ${value}`;
  }
}

@Pipe({
  name: 'diasHastaEntrega',
  standalone: true
})
export class DiasHastaEntregaPipe implements PipeTransform {
  transform(deliveryDate: Date | string): string {
    if (!deliveryDate) return 'Sin fecha';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const delivery = new Date(deliveryDate);
    delivery.setHours(0, 0, 0, 0);
    
    const diffTime = delivery.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `⏰ Faltan ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    } else if (diffDays === 0) {
      return '🎯 Hoy';
    } else {
      const daysAgo = Math.abs(diffDays);
      return `📅 Hace ${daysAgo} día${daysAgo > 1 ? 's' : ''}`;
    }
  }
}


@Pipe({
  name: 'totalConColor',
  standalone: true
})
export class TotalConColorPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '$0.00';
    
    let icono = '💰';
    if (value > 1000) icono = '🟢'; 
    else if (value > 500) icono = '🟡'; 
    else icono = '🔴'; 
    
    return `${icono} $${value.toFixed(2)}`;
  }
}


@Pipe({
  name: 'resumenDireccion',
  standalone: true
})
export class ResumenDireccionPipe implements PipeTransform {
  transform(value: string, maxLength: number = 30): string {
    if (!value) return 'Sin dirección';
    if (value.length <= maxLength) return value;
    return value.substring(0, maxLength) + '...';
  }
}


@Pipe({
  name: 'cantidadProductos',
  standalone: true
})
export class CantidadProductosPipe implements PipeTransform {
  transform(orden: any): string {
    if (!orden || !orden.orderDetails) return '0 productos';
    const cantidad = orden.orderDetails.length;
    return `${cantidad} producto${cantidad !== 1 ? 's' : ''}`;
  }
}


@Pipe({
  name: 'prioridadOrden',
  standalone: true
})
export class PrioridadOrdenPipe implements PipeTransform {
  transform(deliveryDate: Date | string, status: string): string {
    if (status === 'E') return '✅ Completado';
    if (status === 'C') return '❌ Cancelado';
    if (!deliveryDate) return '⚪ Sin prioridad';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const delivery = new Date(deliveryDate);
    delivery.setHours(0, 0, 0, 0);
    
    const diffDays = Math.ceil((delivery.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return '🔴 URGENTE';
    if (diffDays <= 3) return '🟡 Alta';
    if (diffDays <= 7) return '🟢 Media';
    return '⚪ Normal';
  }
}