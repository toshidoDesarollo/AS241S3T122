import { Pipe, PipeTransform } from '@angular/core';

interface OptionsMap {
  [key: string]: string;
}

@Pipe({
  name: 'codeToLabel',
  standalone: true
})
export class CodeToLabelPipe implements PipeTransform {

  transform(code: string | undefined, map: OptionsMap, defaultValue: string = 'N/A'): string {
    if (!code || !map) {
      return defaultValue;
    }

    return map[code] || defaultValue;
  }
}
