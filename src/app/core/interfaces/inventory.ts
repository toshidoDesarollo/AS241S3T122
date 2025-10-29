export interface Inventory {
    id?: number;
    productsId: number;
    quantityAvaila: number;
    batchNumber: string;
    specs: string;
    location: string;
    entry_date: string;
    lastUpdated: string;
    status: string;
}