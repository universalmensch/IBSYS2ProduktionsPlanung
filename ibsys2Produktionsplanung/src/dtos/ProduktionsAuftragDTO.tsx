export class ProduktionsAuftragDTO {
    kaufteilID: number;
    planRestBestand: number;
    menge: number;

    constructor(kaufteilID: number, menge: number, planRestBestand: number) {
        this.kaufteilID = kaufteilID;
        this.menge = menge;
        this.planRestBestand = planRestBestand;
    }
}