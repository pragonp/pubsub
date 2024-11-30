This is the work submission and my first-ever coding project in JS/TS.

To execute the program, please run:
```bash
git clone https://github.com/pragonp/pubsub.git
```
```bash
ts-node App.ts 
```

This is a simple observer pattern.
The participants are:
- Subject: IPublishSubscribeService
- Concrete Subject: PublishSubscribeService
- Observer: ISubscriber
- Concrete Observers: MachineSaleSubscriber, MachineRefillSubscriber, StockWarningSubscriber
- Client: App
