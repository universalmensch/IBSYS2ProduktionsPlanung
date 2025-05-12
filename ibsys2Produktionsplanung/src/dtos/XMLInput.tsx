export type XMLInput = {
    results: {
        period: number;
        forecast: { p1: number, p2: number, p3: number };
        warehousestock: WarehouseStock;
        inwardstockmovement: InwardStockMovement;
        futureinwardstockmovement: FutureInwardStockMovement;
        idletimecosts: IdleTimeCosts;
        waitinglistworkstations: WaitingListWorkstations;
        waitinglistdtock: WaitingListStock;
        ordersineork: OrdersInWork;
        completedorders: CompletedOrders;
        cycletimes: CycleTimes;
    }
};
type WarehouseStock = {
    article: Article[];
    totalstockvalue: number;
};

type Article = {
    id: number;
    amount: number;
    startamount: number;
    pct: number;
    price: number;
    stockvalue: number;
};

type InwardStockMovement = {
    order: Order[];
};

type Order = {
    orderperiod: number;
    id: number;
    mode: number;
    article: number;
    amount: number;
    time: number;
    materialcosts: number;
    ordercosts: number;
    entirecosts: number;
    piececosts: number;
};

type FutureInwardStockMovement = {
    order: FutureOrder[];
};

type FutureOrder = {
    orderperiod: number;
    id: number;
    mode: number;
    article: number;
    amount: number;
};

type IdleTimeCosts = {
    workplace: Workplace[];
    sum: IdleTimeSum;
};

type Workplace = {
    id: number;
    setupevents: number;
    idletime: number;
    wageidletimecosts: number;
    wagecosts: number;
    machineidletimecosts: number;
};

type IdleTimeSum = {
    setupevents: number;
    idletime: number;
    wageidletimecosts: number;
    wagecosts: number;
    machineidletimecosts: number;
};

type WaitingListWorkstations = {
    workplace: WaitingWorkplace[];
};

type WaitingWorkplace = {
    id: number;
    timeneed: number;
    waitinglist?: WaitingList[];
};

type WaitingList = {
    period: number;
    order: number;
    firstbatch: number;
    lastbatch: number;
    item: number;
    amount: number;
    timeneed: number;
};

type WaitingListStock = {
    missingpart: MissingPart[];
};

type MissingPart = {
    id: number;
    workplace: MissingWorkplace[];
};

type MissingWorkplace = {
    id: number;
    timeneed: number;
    waitinglist: WaitingList[];
};

type OrdersInWork = {
    workplace: OrdersWorkplace[];
};

type OrdersWorkplace = {
    id: number;
    period: number;
    order: number;
    batch: number;
    item: number;
    amount: number;
    timeNeed: number;
};

type CompletedOrders = {
    order: CompletedOrder[];
};

type CompletedOrder = {
    period: number;
    id: number;
    item: number;
    quantity: number;
    cost: number;
    averageunitcosts: number;
    batch: Batch[];
};

type Batch = {
    id: number;
    amount: number;
    cycletime: number;
    cost: number;
};

type CycleTimes = {
    startedorders: number;
    waitingorders: number;
    order: CycleTimeOrder[];
};

type CycleTimeOrder = {
    id: number;
    period: number;
    starttime: string;
    finishtime: string;
    cycletimemin: number;
    cycletimefactor: number;
};