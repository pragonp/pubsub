To execute the program, please run

ts-node App.ts 

This is a simple observer pattern.
The participants are:
- Subject: IPublishSubscribeService
- Concrete Subject: PublishSubscribeService
- Observer: ISubscriber
- Concrete Observers: MachineSaleSubscriber, MachineRefillSubscriber, StockWarningSubscriber
- Client: App