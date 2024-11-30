import { Machine } from './models/Machine';
import { MachineSaleEvent } from './events/MachineSaleEvent';
import { MachineRefillEvent } from './events/MachineRefillEvent';
import { IPublishSubscribeService } from './services/IPublishSubscribeService';
import { PublishSubscribeService } from './services/PublishSubscribeService';
import { MachineSaleSubscriber } from './subscribers/MachineSaleSubscriber';
import { MachineRefillSubscriber } from './subscribers/MachineRefillSubscriber';
import { StockWarningSubscriber } from './subscribers/StockWarningSubscriber';
import { IEvent } from './events/IEvent';

// Helper functions
const randomMachine = (): string => {
  const random = Math.random() * 3;
  if (random < 1) return '001';
  if (random < 2) return '002';
  return '003';
};

const eventGenerator = (): IEvent => {
  const random = Math.random();
  if (random < 0.5) {
    const saleQty = Math.random() < 0.5 ? 1 : 2; // 1 or 2
    return new MachineSaleEvent(saleQty, randomMachine());
  }
  const refillQty = Math.random() < 0.5 ? 3 : 5; // 3 or 5
  return new MachineRefillEvent(refillQty, randomMachine());
};

class App {
  private machines: Machine[] = [];
  private pubSubService: PublishSubscribeService;

  constructor() {
    this.machines = [
      new Machine('001'),
      new Machine('002'),
      new Machine('003'),
    ];
    this.pubSubService = new PublishSubscribeService();
  }

  private setupSubscribers(): void {
    const saleSubscriber = new MachineSaleSubscriber(this.machines);
    const refillSubscriber = new MachineRefillSubscriber(this.machines);
    const stockWarningSubscriber = new StockWarningSubscriber();

    this.pubSubService.subscribe('sale', saleSubscriber);
    this.pubSubService.subscribe('refill', refillSubscriber);
    this.pubSubService.subscribe('lowStockWarning', stockWarningSubscriber);
    this.pubSubService.subscribe('stockLevelOk', stockWarningSubscriber);
  }

  private generateAndPublishEvents(): void {
    const events = [1, 2, 3, 4, 5].map(() => eventGenerator());
    events.forEach((event) => this.pubSubService.publish(event));
  }

  public static main(): void {
    const app = new App();
    app.setupSubscribers();
    app.generateAndPublishEvents();
  }
}

App.main();
