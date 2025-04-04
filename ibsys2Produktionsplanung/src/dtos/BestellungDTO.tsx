
export class BestellungDTO {
    kaufteilID: number;
    typ: BestellTyp;
    menge: number;

    constructor(kaufteilID: number, typ: BestellTyp, menge: number){
        this.kaufteilID = kaufteilID;
        this.typ = typ;
        this.menge = menge;
    }
}

export enum BestellTyp {
    NORMAL,
    EIL
}