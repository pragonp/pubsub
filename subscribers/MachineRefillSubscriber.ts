import { IEvent } from '../events/IEvent';
import { ISubscriber } from '../subscribers/ISubscriber';
import { Machine } from '../models/Machine';
import { MachineRefillEvent } from '../events/MachineRefillEvent';

export class MachineRefillSubscriber implements ISubscriber {
    private machines: Machine[];

    constructor(machines: Machine[]) {
        this.machines = machines;
    }

    handle(event: IEvent): void {
        if (event instanceof MachineRefillEvent) {
            const machine = this.machines.find((m) => m.id === event.machineId());

            if (machine) {
                machine.stockLevel += event.getRefillQuantity();
                console.log(`Machine ${machine.id} refilled. New stock: ${machine.stockLevel}`);
            }
        }
    }
}