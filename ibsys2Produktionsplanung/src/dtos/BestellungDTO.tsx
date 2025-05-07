export class BestellungDTO {
    kaufteilID: number;
    typ: BestellTyp;
    menge: number;
    bereitsBestellt: boolean;
    bestellPeriode: number;

    constructor(kaufteilID: number, typ: BestellTyp, menge: number, bereitsBestellt: boolean, bestellPeriode: number) {
        this.kaufteilID = kaufteilID;
        this.typ = typ;
        this.menge = menge;
        this.bereitsBestellt = bereitsBestellt;
        this.bestellPeriode = bestellPeriode;
    }
}

export enum BestellTyp {
    NORMAL = "NORMAL",
    EIL = "EIL",
    KEINE = "KEINE"
}