
export class ProduktionsPlanDTO{
    p1Restbestand: number;
    p2Restbestand: number;
    p3Restbestand: number;

    p1ProduktionWoche0?: number;
    p2ProduktionWoche0?: number;
    p3ProduktionWoche0?: number;

    p1ProduktionWoche1?: number;
    p2ProduktionWoche1?: number;
    p3ProduktionWoche1?: number;

    p1ProduktionWoche2?: number;
    p2ProduktionWoche2?: number;
    p3ProduktionWoche2?: number;

    p1ProduktionWoche3?: number;
    p2ProduktionWoche3?: number;
    p3ProduktionWoche3?: number;

    constructor(p1Restbestand: number, p2Restbestand: number, p3Restbestand: number){
        this.p1Restbestand = p1Restbestand;
        this.p2Restbestand = p2Restbestand;
        this.p3Restbestand = p3Restbestand;
    }
}