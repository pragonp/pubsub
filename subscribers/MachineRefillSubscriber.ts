import { IEvent } from '../events/IEvent';
import { ISubscriber } from '../subscribers/ISubscriber';
import { Machine } from '../models/Machine';
import { MachineRefillEvent } from '../events/MachineRefillEvent';
import { StockLevelOkEvent } from '../events/StockLevelOkEvent';
import { PublishSubscribeService } from '../services/PublishSubscribeService';

export class MachineRefillSubscriber implements ISubscriber {
    private machines: Machine[];
    private pubSubService: PublishSubscribeService;

    constructor(machines: Machine[], pubSubService: PublishSubscribeService) {
        this.machines = machines;
        this.pubSubService = pubSubService;
    }

    handle(event: IEvent): void {
        if (event instanceof MachineRefillEvent) {
            const machine = this.machines.find((m) => m.id === event.machineId());

            if (machine) {
                const refillQuantity = event.getRefillQuantity();
                machine.stockLevel += refillQuantity;
                console.log(`Machine ${machine.id} refilled (+${refillQuantity}). New stock: ${machine.stockLevel}`);

                if (machine.stockLevel >= 3 && !machine.stockLevelOkFired) {
                    this.pubSubService.publish(new StockLevelOkEvent(machine.id));
                    machine.stockLevelOkFired = true;
                    machine.lowStockWarningFired = false;
                }
            }
        }
    }
}
