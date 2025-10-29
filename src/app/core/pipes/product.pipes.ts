import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCleaner',
  standalone: true
})
export class TextCleanerPipe implements PipeTransform {

  transform(value: string | number | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }
    
    // Asegura que el valor sea string y conviértelo a minúsculas
    let strValue = String(value).toLowerCase();
    
    // 1. Reemplaza múltiples espacios con un solo espacio y elimina espacios al inicio/final
    strValue = strValue.replace(/\s+/g, ' ').trim();
    
    // 2. Convierte a Title Case (primera letra de cada palabra en mayúscula)
    return strValue.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
