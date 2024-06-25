import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TreninziService } from '../../services/treninzi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-istorija-treninga',
  templateUrl: './istorija-treninga.component.html',
  styleUrls: ['./istorija-treninga.component.css'],
})
export class IstorijaTreningaComponent implements OnInit {
  treninzi: any = null;
  displayedColumns: string[] = [
    'datum',
    'vrsta',
    'tip',
    'trajanje',
    'kalorije',
    'tezina',
    'umor',
    'beleska',
    'akcija',
  ];
  dataSource = new MatTableDataSource<any>(this.treninzi);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private treninziService: TreninziService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dobaviPodatke();
  }

  dobaviPodatke() {
    this.treninzi = this.treninziService.getIstorijaTreninga().subscribe(
      (res) => {
        this.treninzi = res;
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
      },
      () => this.router.navigate(['auth'])
    );
  }

  remove(id) {
    this.treninziService.remove(id).subscribe(
      (res) => {
        this.toastrService.success(res.poruka);
        this.dobaviPodatke();
      },
      () => this.router.navigate(['auth'])
    );
  }
}
