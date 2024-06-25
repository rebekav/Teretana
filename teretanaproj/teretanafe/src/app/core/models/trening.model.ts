export class Trening {
  vrsta: string;
  beleska: string;
  tip: string;
  trajanje: number;
  kalorije: number;
  tezina: number;
  umor: number;
  datum: string;

  constructor(args: any = {}) {
    this.vrsta = args.vrsta;
    this.beleska = args.beleska;
    this.tip = args.tip;
    this.trajanje = args.trajanje;
    this.kalorije = args.kalorije;
    this.tezina = args.tezina;
    this.umor = args.umor;
    this.datum = args.datum;
  }
}
