import { IEvent } from '../events/IEvent';
import { ISubscriber } from '../subscribers/ISubscriber';
import { Machine } from '../models/Machine';
import { MachineSaleEvent } from '../events/MachineSaleEvent';
import { LowStockWarningEvent } from '../events/LowStockWarningEvent';
import { PublishSubscribeService } from '../services/PublishSubscribeService';

export class MachineSaleSubscriber implements ISubscriber {
    private machines: Machine[];
    private pubSubService: PublishSubscribeService;

    constructor(machines: Machine[], pubSubService: PublishSubscribeService) {
        this.machines = machines;
        this.pubSubService = pubSubService;
    }

    handle(event: IEvent): void {
        if (event instanceof MachineSaleEvent) {
            const machine = this.machines.find((m) => m.id === event.machineId());

            if (machine) {
                const soldQuantity = event.getSoldQuantity();

                // We sell all we have by default
                if (machine.stockLevel > 0 && soldQuantity > machine.stockLevel) {
                    console.log(`>> Warning: Machine ${machine.id}: sell all current stock (${machine.stockLevel})`);
                    machine.stockLevel = 0;
                } else if (machine.stockLevel < 0) {
                    console.log(`>> Error: Machine ${machine.id} cannot process sale. Stock is 0.`);
                } else {
                    machine.stockLevel -= soldQuantity;
                    console.log(`Machine ${machine.id} sold ${soldQuantity}. New stock: ${machine.stockLevel}`);
                }

                if (machine.stockLevel < 3 && !machine.lowStockWarningFired) {
                    this.pubSubService.publish(new LowStockWarningEvent(machine.id));
                    machine.lowStockWarningFired = true;
                    machine.stockLevelOkFired = false;
                }

            }
        }
    }
}
