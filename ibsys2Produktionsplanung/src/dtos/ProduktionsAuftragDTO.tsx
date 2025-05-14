export class ProduktionsAuftragDTO {
    kaufteilID: number;
    menge: number;

    constructor(kaufteilID: number, menge: number) {
        this.kaufteilID = kaufteilID;
        this.menge = menge;
    }
}