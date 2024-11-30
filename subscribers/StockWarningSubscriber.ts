import { IEvent } from '../events/IEvent';
import { ISubscriber } from '../subscribers/ISubscriber';
import { LowStockWarningEvent } from '../events/LowStockWarningEvent';
import { StockLevelOkEvent } from '../events/StockLevelOkEvent';

export class StockWarningSubscriber implements ISubscriber {
    handle(event: IEvent): void {
        if (event instanceof LowStockWarningEvent) {
            console.log(`>> Warning: Machine ${event.machineId()}: low stock`);
        } else if (event instanceof StockLevelOkEvent) {
            console.log(`>> Info: Machine ${event.machineId()}: normal`);
        }
    }
}
