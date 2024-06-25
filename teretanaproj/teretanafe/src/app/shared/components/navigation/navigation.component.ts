import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AutentificationService } from 'src/app/autentification/services/autentification.service';
import { LocalStorageService } from '../../service/local-storage-service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  mode = new FormControl('push');
  roleKorisnik: Boolean = false;

  constructor(
    private storageService: LocalStorageService,
    private authService: AutentificationService
  ) {
    this.storageService.watchStorage().subscribe((role: string) => {
      this.roleKorisnik = false;

      if (role) {
        let authorities = JSON.parse(role);
        for (const auth of authorities) {
          if (auth.authority === 'KORISNIK') {
            this.roleKorisnik = true;
          }
        }
      }
      console.log('listener' + this.roleKorisnik);
    });
  }

  ngOnInit() {
    this.roleKorisnik = false;

    let authorities = JSON.parse(`${this.authService.getUserRole()}`);
    for (const auth of authorities) {
      if (auth.authority === 'KORISNIK') {
        this.roleKorisnik = true;
      }
    }
    console.log(this.roleKorisnik);
  }

  logout() {
    this.authService.logout();
    this.storageService.logout();
    this.roleKorisnik = false;
  }
}
