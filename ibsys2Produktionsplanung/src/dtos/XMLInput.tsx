export type XMLInput = {
    qualitycontrol: QualityControl;
    sellwish: SellWish;
    selldirect: SellDirect;
    orderlist: Order[];
    productionlist: Production[];
    workingtimelist: WorkingTime[];
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
  
  type Order = {
    article: number;
    quantity: number;
    modus: number;
  };
  
  type Production = {
    article: number;
    quantity: number;
  };
  
  type WorkingTime = {
    station: number;
    shift: number;
    overtime: number;
  };
