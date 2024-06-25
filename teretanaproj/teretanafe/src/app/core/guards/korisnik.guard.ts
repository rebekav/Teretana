import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AutentificationService } from '../../autentification/services/autentification.service';

@Injectable({
  providedIn: 'root',
})
export class KorisnikGuard implements CanActivate {
  constructor(
    private authService: AutentificationService,
    private router: Router
  ) {}
  canActivate(): Observable<any> {
    let roleKorisnik = false;

    let authorities = JSON.parse(`${this.authService.getUserRole()}`);
    for (const auth of authorities) {
      if (auth.authority === 'KORISNIK') {
        roleKorisnik = true;
      }
    }
    console.log(roleKorisnik);
    if (roleKorisnik) {
      return of(true);
    }
    this.router.navigate(['/auth']);
    return of(false);
  }
}
