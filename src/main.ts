// main.ts
import 'zone.js'; // ⚠️ debe ser la primera línea
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

import { registerLocaleData } from '@angular/common';
import localePe from '@angular/common/locales/es-PE';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localePe, 'es-PE');

async function main() {
  try {
    const newConfig = {
      ...appConfig,
      providers: [
        ...(appConfig.providers || []),
        // Establece el idioma predeterminado de la aplicación a 'es-PE'
        { provide: LOCALE_ID, useValue: 'es-PE' } 
      ]
    };
    
    await bootstrapApplication(App, newConfig);

  } catch (err) {
    console.error('Error bootstrapping Angular app:', err);
  }
}

main();