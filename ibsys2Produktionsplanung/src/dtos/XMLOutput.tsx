export type XMLOutput = {
    input?: {
        qualitycontrol?: QualityControl;
        sellwish?: SellWish;
        selldirect?: SellDirect;
        orderlist?: OrderList;
        productionlist?: { production: Production[] };
        workingtimelist?: { workingtime: WorkingTime[] };
    }
};

type QualityControl = {
    type: string;
    losequantity: number;
    delay: number;
};

type SellWish = {
    item: SellWishItem[];
};

type SellWishItem = {
    article: number;
    quantity: number;
};

type SellDirect = {
    item: SellDirectItem[];
};

type SellDirectItem = {
    article: number;
    quantity: number;
    price: number;
    penalty: number;
};

type OrderList = {
    order: Order[]
}

type Order = {
    article: number;
    quantity: number;
    modus: number;
};

type Production = {
    article: number;
    quantity: number;
};

export type WorkingTime = {
    station: number;
    shift: number;
    overtime: number;
};
