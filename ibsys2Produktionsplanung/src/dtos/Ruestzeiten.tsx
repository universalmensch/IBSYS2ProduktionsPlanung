export class Ruestzeit {
    private readonly _teilnummer: number;
    private readonly _arbeitsplatz: number;
    private readonly _zeit: number;

    constructor(teilnummer: number, arbeitsplatz: number, zeit: number) {
        this._teilnummer = teilnummer;
        this._arbeitsplatz = arbeitsplatz;
        this._zeit = zeit;
    }

    get teilnummer(): number {
        return this._teilnummer;
    }

    get arbeitsplatz(): number {
        return this._arbeitsplatz;
    }

    get zeit(): number {
        return this._zeit;
    }
}

export const Ruestzeiten: Ruestzeit[] = [
    new Ruestzeit(4, 10, 20),
    new Ruestzeit(4, 11, 10),
    new Ruestzeit(5, 10, 20),
    new Ruestzeit(5, 11, 10),
    new Ruestzeit(6, 10, 20),
    new Ruestzeit(6, 11, 20),
    new Ruestzeit(7, 10, 20),
    new Ruestzeit(7, 11, 20),
    new Ruestzeit(8, 10, 20),
    new Ruestzeit(8, 11, 20),
    new Ruestzeit(9, 10, 20),
    new Ruestzeit(9, 11, 20),
    new Ruestzeit(10, 7, 20),
    new Ruestzeit(10, 8, 15),
    new Ruestzeit(10, 9, 15),
    new Ruestzeit(10, 12, 0),
    new Ruestzeit(10, 13, 0),
    new Ruestzeit(11, 7, 20),
    new Ruestzeit(11, 8, 15),
    new Ruestzeit(11, 9, 15),
    new Ruestzeit(11, 12, 0),
    new Ruestzeit(11, 13, 0),
    new Ruestzeit(12, 7, 20),
    new Ruestzeit(12, 8, 15),
    new Ruestzeit(12, 9, 15),
    new Ruestzeit(12, 12, 0),
    new Ruestzeit(12, 13, 0),
    new Ruestzeit(13, 7, 20),
    new Ruestzeit(13, 8, 15),
    new Ruestzeit(13, 9, 15),
    new Ruestzeit(13, 12, 0),
    new Ruestzeit(13, 13, 0),
    new Ruestzeit(14, 7, 20),
    new Ruestzeit(14, 8, 15),
    new Ruestzeit(14, 9, 15),
    new Ruestzeit(14, 12, 0),
    new Ruestzeit(14, 13, 0),
    new Ruestzeit(15, 7, 20),
    new Ruestzeit(15, 8, 15),
    new Ruestzeit(15, 9, 15),
    new Ruestzeit(15, 12, 0),
    new Ruestzeit(15, 13, 0),
    new Ruestzeit(16, 6, 15),
    new Ruestzeit(16, 14, 0),
    new Ruestzeit(17, 15, 15),
    new Ruestzeit(18, 6, 15),
    new Ruestzeit(18, 7, 20),
    new Ruestzeit(18, 8, 20),
    new Ruestzeit(18, 9, 15),
    new Ruestzeit(19, 6, 15),
    new Ruestzeit(19, 7, 20),
    new Ruestzeit(19, 8, 25),
    new Ruestzeit(19, 9, 20),
    new Ruestzeit(20, 6, 15),
    new Ruestzeit(20, 7, 20),
    new Ruestzeit(20, 8, 20),
    new Ruestzeit(20, 9, 15),
    new Ruestzeit(26, 7, 30),
    new Ruestzeit(26, 15, 15),
    new Ruestzeit(49, 1, 20),
    new Ruestzeit(54, 1, 20),
    new Ruestzeit(29, 1, 20),
    new Ruestzeit(50, 2, 30),
    new Ruestzeit(55, 2, 30),
    new Ruestzeit(30, 2, 20),
    new Ruestzeit(51, 3, 20),
    new Ruestzeit(56, 3, 20),
    new Ruestzeit(31, 3, 20),
    new Ruestzeit(1, 4, 30),
    new Ruestzeit(1, 4, 20),
    new Ruestzeit(1, 4, 30),
];
