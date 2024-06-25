import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private dashboardUrl = environment.baseUrl + '/trening/dashboard';

  constructor(public http: HttpClient) {}

  dashboard(month: number, year: number): Observable<any> {
    return this.http.get(`${this.dashboardUrl}/${month}/${year}`);
  }
}
