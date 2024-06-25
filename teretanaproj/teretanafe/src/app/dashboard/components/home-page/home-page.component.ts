import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  month: number;
  year: number;

  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: number[] = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
  statistic: any;
  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.dobaviPodatke();
  }

  dobaviPodatke() {
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
    this.statistic = this.dashboardService
      .dashboard(this.month, this.year)
      .subscribe(
        (res) => {
          this.statistic = res;
          console.log(res);
        },
        () => this.router.navigate(['auth'])
      );
  }

  ucitaj() {
    this.statistic = this.dashboardService
      .dashboard(this.month, this.year)
      .subscribe(
        (res) => {
          this.statistic = res;
        },
        () => this.router.navigate(['auth'])
      );
  }
}
