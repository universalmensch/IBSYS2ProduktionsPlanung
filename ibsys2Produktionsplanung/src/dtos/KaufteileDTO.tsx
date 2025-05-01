import {BestellArt} from "./BestellArt.tsx";

export class Kaufteil {
    private readonly _id: number;
    private readonly _lieferzeit: number;
    private readonly _lieferzeitAbweichung: number;
    private readonly _verwendungP1: number;
    private readonly _verwendungP2: number;
    private readonly _verwendungP3: number;
    private readonly _diskontmenge: number;
    private readonly _wert: number;
    private readonly _bestellKosten: number;

    constructor(id: number, lieferzeit: number, lieferzeitAbweichung: number, verwendungP1: number, verwendungP2: number, verwendungP3: number, diskontmenge: number, wert: number, bestellKosten: number) {
        this._id = id;
        this._lieferzeit = lieferzeit;
        this._lieferzeitAbweichung = lieferzeitAbweichung;
        this._verwendungP1 = verwendungP1;
        this._verwendungP2 = verwendungP2;
        this._verwendungP3 = verwendungP3;
        this._diskontmenge = diskontmenge;
        this._wert = wert;
        this._bestellKosten = bestellKosten;
        this._bestellung = BestellArt.KEINE;
    }

    get wert(): number {
        return this._wert;
    }

    get bestellKosten(): number {
        return this._bestellKosten;
    }

    get id(): number {
        return this._id;
    }

    get lieferzeit(): number {
        return this._lieferzeit;
    }

    get lieferzeitAbweichung(): number {
        return this._lieferzeitAbweichung;
    }

    get verwendungP1(): number {
        return this._verwendungP1;
    }

    get verwendungP2(): number {
        return this._verwendungP2;
    }

    get verwendungP3(): number {
        return this._verwendungP3;
    }

    get diskontmenge(): number {
        return this._diskontmenge;
    }

    private _restbestandVorperiode?: number;

    get restbestandVorperiode(): number {
        return this._restbestandVorperiode != undefined ? this._restbestandVorperiode : 0;
    }

    set restbestandVorperiode(value: number) {
        this._restbestandVorperiode = value;
    }

    private _bestellung: BestellArt;

    get bestellung(): BestellArt {
        return this._bestellung;
    }

    set bestellung(value: BestellArt) {
        this._bestellung = value;
    }
}

export const KaufteileDTO: Record<string, Kaufteil> = {
    kaufteil21: new Kaufteil(21, 9, 2, 1, 0, 0, 300, 5, 50),
    kaufteil22: new Kaufteil(22, 8.5, 2, 0, 1, 0, 300, 6.5, 50),
    kaufteil23: new Kaufteil(23, 6, 1, 0, 0, 1, 300, 6.5, 50),
    kaufteil24: new Kaufteil(24, 16, 1.5, 7, 7, 7, 6100, 0.06, 100),
    kaufteil25: new Kaufteil(25, 4.5, 1, 4, 4, 4, 3600, 0.06, 50),
    kaufteil27: new Kaufteil(27, 4.5, 1, 2, 2, 2, 1800, 0.1, 75),
    kaufteil28: new Kaufteil(28, 8.5, 2, 4, 5, 6, 4500, 1.2, 50),
    kaufteil32: new Kaufteil(32, 10.5, 2.5, 3, 3, 3, 2700, 0.75, 50),
    kaufteil33: new Kaufteil(33, 9.5, 2.5, 0, 0, 2, 900, 22, 75),
    kaufteil34: new Kaufteil(34, 8, 1.5, 0, 0, 72, 22000, 0.1, 50),
    kaufteil35: new Kaufteil(35, 11, 2, 4, 4, 4, 3600, 1, 75),
    kaufteil36: new Kaufteil(36, 6, 0.5, 1, 1, 1, 900, 8, 100),
    kaufteil37: new Kaufteil(37, 7.5, 1.5, 1, 1, 1, 900, 1.5, 50),
    kaufteil38: new Kaufteil(38, 8.5, 2, 1, 1, 1, 300, 1.5, 50),
    kaufteil39: new Kaufteil(39, 7.5, 1.5, 2, 2, 2, 1800, 1.5, 75),
    kaufteil40: new Kaufteil(40, 8.5, 1, 1, 1, 1, 900, 2.5, 50),
    kaufteil41: new Kaufteil(41, 4.5, 1, 1, 1, 1, 900, 0.06, 50),
    kaufteil42: new Kaufteil(42, 6, 1.5, 2, 2, 2, 1800, 0.1, 50),
    kaufteil43: new Kaufteil(43, 10, 2.5, 1, 1, 1, 2700, 5, 75),
    kaufteil44: new Kaufteil(44, 5, 1, 3, 3, 3, 900, 0.5, 50),
    kaufteil45: new Kaufteil(45, 8.5, 1.5, 1, 1, 1, 900, 0.06, 50),
    kaufteil46: new Kaufteil(46, 4.5, 1.5, 1, 1, 1, 900, 0.1, 50),
    kaufteil47: new Kaufteil(47, 7.05, 0.5, 1, 1, 1, 900, 3.5, 50),
    kaufteil48: new Kaufteil(48, 5, 1, 2, 2, 2, 1800, 1.5, 75),
    kaufteil52: new Kaufteil(52, 8, 2, 2, 0, 0, 600, 22, 50),
    kaufteil53: new Kaufteil(53, 8, 1, 72, 0, 0, 22000, 0.1, 50),
    kaufteil57: new Kaufteil(57, 8.5, 1.5, 0, 2, 0, 600, 22, 50),
    kaufteil58: new Kaufteil(58, 8, 2.5, 0, 72, 0, 22000, 0.1, 50),
    kaufteil59: new Kaufteil(59, 3.5, 1, 2, 2, 2, 1800, 0.15, 50)
};
