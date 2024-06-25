import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutentificationService } from '../../services/autentification.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  klinike: any = null;

  constructor(
    private authService: AutentificationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  isValidEmail() {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.user.email).toLowerCase());
  }

  isValidPhone(phone) {
    if (!phone) {
      return true;
    }
    const re = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{3}/;
    return re.test(String(phone));
  }

  validate() {
    if (
      !this.user.ime ||
      !this.user.prezime ||
      !this.user.email ||
      !this.user.pass
    ) {
      this.toastr.error(
        'Ime, prezime, email, telefon i lozinka su obavezna polja!'
      );
      return false;
    } else if (this.user.pass.length < 5) {
      this.toastr.error('Lozinka mora da sadrži minumum 5 karaktera!');
      return false;
    } else if (this.user.pass != this.user.pass2) {
      this.toastr.error('Lozinke se ne podudaraju!');
      return false;
    } else if (!this.isValidEmail()) {
      this.toastr.error('Email nije validan!');
      return false;
    } else if (!this.isValidPhone(this.user.telefon)) {
      this.toastr.error('Telefon nije validan!');
      return false;
    }
    return true;
  }

  register() {
    if (this.validate()) {
      this.authService.register(this.user).subscribe(
        () => {
          this.toastr.success('Uspešna registracija!');
          this.router.navigate(['home']);
        },
        (err) => this.toastr.error(err.error.poruka)
      );
    }
  }
}
