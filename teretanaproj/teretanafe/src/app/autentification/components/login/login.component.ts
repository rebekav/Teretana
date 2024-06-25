import { Component, OnInit } from '@angular/core';
import { AutentificationService } from '../../services/autentification.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/shared/service/local-storage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usernameInput: string;
  passwordInput: string;

  constructor(
    private auth: AutentificationService,
    private router: Router,
    private toastr: ToastrService,
    private storageService: LocalStorageService
  ) {}

  ngOnInit() {}

  onSubmit() {
    localStorage.clear();
    if (this.usernameInput && this.passwordInput) {
      this.auth.loginUser(this.usernameInput, this.passwordInput).subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);
          localStorage.setItem('email', res.email);
          localStorage.setItem('role', JSON.stringify(res.authorities));
          this.storageService.roleChanged(JSON.stringify(res.authorities));
          this.toastr.success('Uspešan login!');
          this.router.navigate(['home']);
        },
        (err) => this.toastr.error(err.error.poruka || 'Greška!')
      );
    } else {
      this.toastr.error('Morate uneti username i šifru!');
    }
  }
}
