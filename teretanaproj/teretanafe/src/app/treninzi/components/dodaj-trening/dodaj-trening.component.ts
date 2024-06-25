import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Trening } from 'src/app/core/models/trening.model';
import { TreninziService } from '../../services/treninzi.service';

@Component({
  selector: 'app-dodaj-trening',
  templateUrl: './dodaj-trening.component.html',
  styleUrls: ['./dodaj-trening.component.css'],
})
export class DodajTreningComponent implements OnInit {
  trening: Trening = new Trening();
  tipovi: string[] = ['kardio', 'trening snage', 'fleksibilnost'];
  tezine: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    private treninziService: TreninziService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  validate() {
    if (
      !this.trening.kalorije ||
      !this.trening.tezina ||
      !this.trening.tip ||
      !this.trening.trajanje ||
      !this.trening.umor ||
      !this.trening.vrsta ||
      !this.trening.datum
    ) {
      this.toastr.error(
        'Kalorije, tezina, tip, trajanje, umor, datum i vrsta su obavezna polja!'
      );
      return false;
    }
    return true;
  }

  create() {
    if (this.validate()) {
      this.treninziService.beleziTrening(this.trening).subscribe(
        () => {
          this.toastr.success('Uspešno kreiran trening!');
          this.router.navigate(['home']);
        },
        (err) => this.toastr.error(err.error.message)
      );
    }
  }
}
