export class Machine {
    public stockLevel = 10;
    public lowStockWarningFired = false;
    public stockLevelOkFired = false;
    public id: string;

    constructor(id: string) {
        this.id = id;
        console.log(`Machine ${this.id} created with stock level: ${this.stockLevel}`);
    }
}
