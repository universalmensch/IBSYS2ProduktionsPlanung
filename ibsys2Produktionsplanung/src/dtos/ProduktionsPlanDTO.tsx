export class ProduktionsPlanDTO {
    private readonly _p1Restbestand: number;
    private readonly _p2Restbestand: number;
    private readonly _p3Restbestand: number;

    constructor(p1Restbestand: number, p2Restbestand: number, p3Restbestand: number) {
        this._p1Restbestand = p1Restbestand;
        this._p2Restbestand = p2Restbestand;
        this._p3Restbestand = p3Restbestand;
    }

    get p1Restbestand(): number {
        return this._p1Restbestand;
    }

    get p2Restbestand(): number {
        return this._p2Restbestand;
    }

    get p3Restbestand(): number {
        return this._p3Restbestand;
    }

    private _p1ProduktionWoche0?: number;

    get p1ProduktionWoche0(): number {
        return this._p1ProduktionWoche0 ?? 0;
    }

    set p1ProduktionWoche0(value: number) {
        this._p1ProduktionWoche0 = value;
    }

    private _p2ProduktionWoche0?: number;

    get p2ProduktionWoche0(): number {
        return this._p2ProduktionWoche0 ?? 0;
    }

    set p2ProduktionWoche0(value: number) {
        this._p2ProduktionWoche0 = value;
    }

    private _p3ProduktionWoche0?: number;

    get p3ProduktionWoche0(): number {
        return this._p3ProduktionWoche0 ?? 0;
    }

    set p3ProduktionWoche0(value: number) {
        this._p3ProduktionWoche0 = value;
    }

    private _p1ProduktionWoche1?: number;

    get p1ProduktionWoche1(): number {
        return this._p1ProduktionWoche1 ?? 0;
    }

    set p1ProduktionWoche1(value: number) {
        this._p1ProduktionWoche1 = value;
    }

    private _p2ProduktionWoche1?: number;

    get p2ProduktionWoche1(): number {
        return this._p2ProduktionWoche1 ?? 0;
    }

    set p2ProduktionWoche1(value: number) {
        this._p2ProduktionWoche1 = value;
    }

    private _p3ProduktionWoche1?: number;

    get p3ProduktionWoche1(): number {
        return this._p3ProduktionWoche1 ?? 0;
    }

    set p3ProduktionWoche1(value: number) {
        this._p3ProduktionWoche1 = value;
    }

    private _p1ProduktionWoche2?: number;

    get p1ProduktionWoche2(): number {
        return this._p1ProduktionWoche2 ?? 0;
    }

    set p1ProduktionWoche2(value: number) {
        this._p1ProduktionWoche2 = value;
    }

    private _p2ProduktionWoche2?: number;

    get p2ProduktionWoche2(): number {
        return this._p2ProduktionWoche2 ?? 0;
    }

    set p2ProduktionWoche2(value: number) {
        this._p2ProduktionWoche2 = value;
    }

    private _p3ProduktionWoche2?: number;

    get p3ProduktionWoche2(): number {
        return this._p3ProduktionWoche2 ?? 0;
    }

    set p3ProduktionWoche2(value: number) {
        this._p3ProduktionWoche2 = value;
    }

    private _p1ProduktionWoche3?: number;

    get p1ProduktionWoche3(): number {
        return this._p1ProduktionWoche3 ?? 0;
    }

    set p1ProduktionWoche3(value: number) {
        this._p1ProduktionWoche3 = value;
    }

    private _p2ProduktionWoche3?: number;

    get p2ProduktionWoche3(): number {
        return this._p2ProduktionWoche3 ?? 0;
    }

    set p2ProduktionWoche3(value: number) {
        this._p2ProduktionWoche3 = value;
    }

    private _p3ProduktionWoche3?: number;

    get p3ProduktionWoche3(): number {
        return this._p3ProduktionWoche3 ?? 0;
    }

    set p3ProduktionWoche3(value: number) {
        this._p3ProduktionWoche3 = value;
    }
}