export class User {
  idKorisnik: number;
  email: string;
  pass: string;
  pass2: string;
  ime: string;
  prezime: string;
  telefon: string;
  adresa: string;

  constructor(args: any = {}) {
    this.idKorisnik = args.idKorisnik;
    this.email = args.email;
    this.ime = args.ime;
    this.pass = args.sifra;
    this.pass2 = args.sifra2;
    this.prezime = args.prezime;
    this.telefon = args.telefon1;
    this.adresa = args.adresa1;
  }
}
