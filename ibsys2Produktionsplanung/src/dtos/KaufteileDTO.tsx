
class Kaufteil {
    id: number;
    lieferzeit: number;
    lieferzeitAbweichung: number;
    verwendungP1: number;
    verwendungP2: number;
    verwendungP3: number;
    diskontmenge: number;
    restbestandVorperiode?: number;

    constructor(id: number, lieferzeit: number, lieferzeitAbweichung: number, verwendungP1: number, verwendungP2: number, verwendungP3: number, diskontmenge: number) {
        this.id = id;
        this.lieferzeit = lieferzeit;
        this.lieferzeitAbweichung = lieferzeitAbweichung;
        this.verwendungP1 = verwendungP1;
        this.verwendungP2 = verwendungP2;
        this.verwendungP3 = verwendungP3;
        this.diskontmenge = diskontmenge;
    }
}

export const KaufteileDTO: Record<string, Kaufteil> = {
    kaufteil21: new Kaufteil(21, 9, 2, 1, 0, 0, 300),
    kaufteil22: new Kaufteil(22, 8.5, 2, 0, 1, 0, 300),
    kaufteil23: new Kaufteil(23, 6, 1, 0, 0, 1, 300),
    kaufteil24: new Kaufteil(24, 16, 1.5, 7, 7, 7, 6100),
    kaufteil25: new Kaufteil(25, 4.5, 1, 4, 4, 4, 3600),
    kaufteil27: new Kaufteil(27, 4.5, 1, 2, 2, 2, 1800),
    kaufteil28: new Kaufteil(28, 8.5, 2, 4, 5, 6, 4500),
    kaufteil32: new Kaufteil(32, 10.5, 2.5, 3, 3, 3, 2700),
    kaufteil33: new Kaufteil(33, 9.5, 2.5, 0, 0, 2, 900),
    kaufteil34: new Kaufteil(34, 8, 1.5, 0, 0, 72, 22000),
    kaufteil35: new Kaufteil(35, 11, 2, 4, 4, 4, 3600),
    kaufteil36: new Kaufteil(36, 6, 0.5, 1, 1, 1, 900),
    kaufteil37: new Kaufteil(37, 7.5, 1.5, 1, 1, 1, 900),
    kaufteil38: new Kaufteil(38, 8.5, 2, 1, 1, 1, 300),
    kaufteil39: new Kaufteil(39, 7.5, 1.5, 2, 2, 2, 1800),
    kaufteil40: new Kaufteil(40, 8.5, 1, 1, 1, 1, 900),
    kaufteil41: new Kaufteil(41, 4.5, 1, 1, 1, 1, 900),
    kaufteil42: new Kaufteil(42, 6, 1.5, 2, 2, 2, 1800),
    kaufteil43: new Kaufteil(43, 10, 2.5, 1, 1, 1, 2700),
    kaufteil44: new Kaufteil(44, 5, 1, 3, 3, 3, 900),
    kaufteil45: new Kaufteil(45, 8.5, 1.5, 1, 1, 1, 900),
    kaufteil46: new Kaufteil(46, 4.5, 1.5, 1, 1, 1, 900),
    kaufteil47: new Kaufteil(47, 7.05, 0.5, 1, 1, 1, 900),
    kaufteil48: new Kaufteil(48, 5, 1, 2, 2, 2, 1800),
    kaufteil52: new Kaufteil(52, 8, 2, 2, 0, 0, 600),
    kaufteil53: new Kaufteil(53, 8, 1, 72, 0, 0, 22000),
    kaufteil57: new Kaufteil(57, 8.5, 1.5, 0, 2, 0, 600),
    kaufteil58: new Kaufteil(58, 8, 2.5, 0, 72, 0, 22000),
    kaufteil59: new Kaufteil(59, 3.5, 1, 2, 2, 2, 1800)
};
