import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trening } from 'src/app/core/models/trening.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TreninziService {
  private istorijaTreningaURL =
    environment.baseUrl + '/trening/istorijaTreninga';
  private beleziTreningURL = environment.baseUrl + '/trening/beleziTrening';
  private removeURL = environment.baseUrl + '/trening/remove/';

  constructor(public http: HttpClient) {}

  getIstorijaTreninga(): Observable<any> {
    return this.http.get(this.istorijaTreningaURL);
  }

  remove(id: number): Observable<any> {
    return this.http.put(this.removeURL + id, {});
  }

  beleziTrening(trening: Trening): Observable<any> {
    return this.http.post(this.beleziTreningURL, trening);
  }
}
