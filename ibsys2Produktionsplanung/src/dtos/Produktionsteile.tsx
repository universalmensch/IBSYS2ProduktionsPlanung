export class Produktionsteil {
    private readonly _id: number;

    constructor(id: number, planRestbestand: number) {
        this._id = id;
        this._planRestbestand = planRestbestand;
    }

    get id(): number {
        return this._id;
    }

    private _auftraege?: number;

    get auftraege(): number {
        return this._auftraege ?? 0;
    }

    set auftraege(value: number) {
        this._auftraege = value;
    }

    private _fuerWarteschlangen?: number;

    get fuerWarteschlangen(): number {
        return this._fuerWarteschlangen ?? 0;
    }

    set fuerWarteschlangen(value: number) {
        this._fuerWarteschlangen = value;
    }

    private _planRestbestand: number;

    get planRestbestand(): number {
        return this._planRestbestand;
    }

    set planRestbestand(value: number) {
        this._planRestbestand = value;
    }

    private _restBestand?: number;

    get restBestand(): number {
        return this._restBestand ?? 0;
    }

    set restBestand(value: number) {
        this._restBestand = value;
    }

    private _warteschlange?: number;

    get warteschlange(): number {
        return this._warteschlange ?? 0;
    }

    set warteschlange(value: number) {
        this._warteschlange = value;
    }

    private _bearbeitung?: number;

    get bearbeitung(): number {
        return this._bearbeitung ?? 0;
    }

    set bearbeitung(value: number) {
        this._bearbeitung = value;
    }

    private _menge?: number;

    get menge(): number {
        return this._menge ?? 0;
    }

    set menge(value: number) {
        this._menge = value;
    }
}

export const Produktionsteile: Produktionsteil[] =
    [
        new Produktionsteil(16, 180),
        new Produktionsteil(17, 210),
        new Produktionsteil(26, 270),

        new Produktionsteil(1, 50),
        new Produktionsteil(51, 50),
        new Produktionsteil(50, 70),
        new Produktionsteil(4, 70),
        new Produktionsteil(10, 90),
        new Produktionsteil(49, 50),
        new Produktionsteil(7, 50),
        new Produktionsteil(13, 90),
        new Produktionsteil(18, 90),

        new Produktionsteil(2, 50),
        new Produktionsteil(56, 50),
        new Produktionsteil(55, 70),
        new Produktionsteil(5, 70),
        new Produktionsteil(11, 90),
        new Produktionsteil(54, 50),
        new Produktionsteil(8, 50),
        new Produktionsteil(14, 90),
        new Produktionsteil(19, 90),

        new Produktionsteil(3, 50),
        new Produktionsteil(31, 50),
        new Produktionsteil(30, 70),
        new Produktionsteil(6, 70),
        new Produktionsteil(12, 90),
        new Produktionsteil(29, 50),
        new Produktionsteil(9, 50),
        new Produktionsteil(15, 90),
        new Produktionsteil(20, 90),
    ];

export const AnzeigeReihenfolge: number[] = [
    1, 26, 51, 16, 17, 50, 4, 10, 49, 7, 13, 18, 2, 26, 56, 16, 17, 55, 5, 11, 54, 8, 14, 19, 3, 26, 31, 16, 17, 30, 6, 12, 29, 9, 15, 20
];
export const SpaceAfterRow: number[] = [
    1, 51, 50, 49, 18, 2, 56, 55, 54, 19, 3, 31, 30, 29, 20
];