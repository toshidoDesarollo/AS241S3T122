import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { InventoryForm } from '../inventory-form/inventory-form';
import { InventoryService } from '../../../core/services/inventory.service';
import { Inventory } from '../../../core/interfaces/inventory';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-inventory-list',
    imports: [CommonModule, FormsModule, InventoryForm, FontAwesomeModule],
    templateUrl: './inventory-list.html',
    styleUrl: './inventory-list.scss'
})
export class InventoryList implements OnInit {
    inventoryService = inject(InventoryService);
    router = inject(Router);
    route = inject(ActivatedRoute);

    inventory: Inventory[] = [];
    inventoryFiltrados: Inventory[] = [];
    searchTerm = '';
    currentFilter: 'all' | 'active' | 'inactive' = 'active';
    productIds: number[] = [];
    mostrarFormulario = false;

    constructor(library: FaIconLibrary) {
        library.addIcons(faPen);
    }

    nuevoInventario: Inventory = {
        productsId: 0,
        quantityAvaila: 0,
        batchNumber: '',
        specs: '',
        location: '',
        entry_date: '',
        lastUpdated: '',
        status: ''
    };

    ngOnInit(): void {
        this.route.data.subscribe(({ inventario }) => {
            if (inventario) {
                this.inventory = inventario;
                this.filtrarInventory();
                this.productIds = inventario.map((p: Inventory) => p.productsId);
            } else {
                this.findAll(); // respaldo si el resolver no trajo nada
            }
        });
    }

    findAll(): void {
        this.inventoryService.findAll().subscribe(response => {
            this.inventory = response;
            this.filtrarInventory();
            this.productIds = response.map(p => p.productsId);
        });
    }

    abrirFormulario(): void {
        this.mostrarFormulario = true;
        this.nuevoInventario = {
            productsId: 0,
            quantityAvaila: 0,
            batchNumber: '',
            specs: '',
            location: '',
            entry_date: '',
            lastUpdated: '',
            status: ''
        };
    }

    abrirFormularioParaEdicion(inventory: Inventory): void {
        this.nuevoInventario = { ...inventory };
        this.mostrarFormulario = true;
    }

    setFilter(filter: 'all' | 'active' | 'inactive'): void {
        this.currentFilter = filter;
        this.filtrarInventory();
    }

    filtrarInventory(): void {
        const term = this.searchTerm.trim().toLowerCase();
        let tempInventory = [...this.inventory];

        if (this.currentFilter === 'active') {
            tempInventory = tempInventory.filter(p => p.status === 'DIS');
        } else if (this.currentFilter === 'inactive') {
            tempInventory = tempInventory.filter(p => p.status === 'RES' || p.status === 'DAÑ');
        }

        if (term) {
            this.inventoryFiltrados = tempInventory.filter(p =>
                p.productsId.toString().includes(term)
            );
        } else {
            this.inventoryFiltrados = tempInventory;
        }
    }

    get activosCount(): number {
        return this.inventory.filter(p => p.status === 'DIS').length;
    }

    get inactivosCount(): number {
        return this.inventory.filter(p =>
            p.status === 'RES' || p.status === 'DAÑ'
        ).length;
    }

    get totalCount(): number {
        return this.inventory.length;
    }

    guardarInventario(inventory: Inventory): void {
        let saveOrUpdate$: Observable<Inventory>;
        if (inventory.id) {
            saveOrUpdate$ = this.inventoryService.update(inventory);
        } else {
            saveOrUpdate$ = this.inventoryService.save(inventory);
        }

        saveOrUpdate$.subscribe({
            next: () => {
                this.findAll();
                this.cerrarFormulario();
            },
            error: (err) => console.error('Error al guardar/actualizar el inventario:', err)
        });
    }

    cerrarFormulario(): void {
        this.mostrarFormulario = false;
    }

    descargarReporte(): void {
        this.inventoryService.generateReport().subscribe({
            next: (data: Blob) => {
                const blob = new Blob([data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'reporte_inventario.pdf';
                a.click();
                window.URL.revokeObjectURL(url);
            },
            error: (err) => {
                console.error('Error al generar reporte PDF:', err);
                alert('No se pudo generar el reporte PDF.');
            }
        });
    }

}
