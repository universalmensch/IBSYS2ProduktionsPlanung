export class BestellungDTO {
    kaufteilID: number;
    typ: BestellTyp;
    menge: number;
    bestellPeriode: number;

    constructor(kaufteilID: number, typ: BestellTyp, menge: number, bestellPeriode: number) {
        this.kaufteilID = kaufteilID;
        this.typ = typ;
        this.menge = menge;
        this.bestellPeriode = bestellPeriode;
    }
}

export enum BestellTyp {
    NORMAL = "NORMAL",
    EIL = "EIL",
    KEINE = "KEINE"
}