import { IEvent } from '../events/IEvent';
import { ISubscriber } from '../subscribers/ISubscriber';
import { Machine } from '../models/Machine';
import { MachineSaleEvent } from '../events/MachineSaleEvent';

export class MachineSaleSubscriber implements ISubscriber {
    private machines: Machine[];

    constructor(machines: Machine[]) {
        this.machines = machines;
    }

    handle(event: IEvent): void {
        if (event instanceof MachineSaleEvent) {
            const machine = this.machines.find((m) => m.id === event.machineId());
            if (machine) {
                machine.stockLevel -= event.getSoldQuantity();
                console.log(`Machine ${machine.id} sold ${event.getSoldQuantity()}. New stock: ${machine.stockLevel}`);
            }
        }
    }
}
