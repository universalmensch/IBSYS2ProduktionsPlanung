
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

  get P1Restbestand(): number {
    return p1Restbestand;
  }

  set P1Restbestand(value: number) {
    p1Restbestand = value;
  }


  get P2Restbestand(): number {
    return p2Restbestand;
  }

  set P2Restbestand(value: number) {
    p2Restbestand = value;
  }

  get P3Restbestand(): number {
    return p3Restbestand;
  }

  set P3Restbestand(value: number) {
    p3Restbestand = value;
  }

  get P1ProduktionWoche0(): number | undefined {
    return p1ProduktionWoche0;
  }

  set P1ProduktionWoche0(value: number | undefined) {
    p1ProduktionWoche0 = value;
  }

  get P2ProduktionWoche0(): number | undefined {
    return p2ProduktionWoche0;
  }

  set P2ProduktionWoche0(value: number | undefined) {
    p2ProduktionWoche0 = value;
  }

  get P3ProduktionWoche0(): number | undefined {
    return p3ProduktionWoche0;
  }

  set P3ProduktionWoche0(value: number | undefined) {
    p3ProduktionWoche0 = value;
  }

  get P1ProduktionWoche1(): number | undefined {
    return p1ProduktionWoche0;
  }

  set P1ProduktionWoche1(value: number | undefined) {
    p1ProduktionWoche1 = value;
  }

  get P2ProduktionWoche1(): number | undefined {
    return p2ProduktionWoche1;
  }

  set P2ProduktionWoche1(value: number | undefined) {
    p2ProduktionWoche1 = value;
  }

  get P3ProduktionWoche1(): number | undefined {
    return p3ProduktionWoche1;
  }

  set P3ProduktionWoche1(value: number | undefined) {
    p3ProduktionWoche1 = value;
  }

  get P1ProduktionWoche2(): number | undefined {
    return p1ProduktionWoche2;
  }

  set P1ProduktionWoche2(value: number | undefined) {
    p1ProduktionWoche2 = value;
  }

  get P2ProduktionWoche2(): number | undefined {
    return p2ProduktionWoche2;
  }

  set P2ProduktionWoche2(value: number | undefined) {
    p2ProduktionWoche2 = value;
  }

  get P3ProduktionWoche2(): number | undefined {
    return p3ProduktionWoche2;
  }

  set P3ProduktionWoche2(value: number | undefined) {
    p3ProduktionWoche2 = value;
  }

  get P1ProduktionWoche3(): number | undefined {
    return p1ProduktionWoche3;
  }

  set P1ProduktionWoche3(value: number | undefined) {
    p1ProduktionWoche3 = value;
  }

  get P2ProduktionWoche3(): number | undefined {
    return p2ProduktionWoche3;
  }

  set P2ProduktionWoche3(value: number | undefined) {
    p2ProduktionWoche3 = value;
  }

  get P3ProduktionWoche3(): number | undefined {
    return p3ProduktionWoche3;
  }

  set P3ProduktionWoche3(value: number | undefined) {
    p3ProduktionWoche3 = value;
  }
}