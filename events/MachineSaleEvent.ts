import { IEvent } from './IEvent';

export class MachineSaleEvent implements IEvent {
    constructor(private readonly _sold: number, private readonly _machineId: string) { }

    machineId(): string {
        return this._machineId;
    }

    type(): string {
        return 'sale';
    }

    getSoldQuantity(): number {
        return this._sold
    }
}