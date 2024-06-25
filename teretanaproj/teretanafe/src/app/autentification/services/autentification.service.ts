import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AutentificationService {
  private loginUrl = environment.baseUrl + '/login';

  private registrationUrl = environment.baseUrl + '/register';

  constructor(public http: HttpClient) {}

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, {
      username: username,
      password: password,
    });
  }

  getUserRole(): String {
    return localStorage.getItem('role');
  }

  getUserUsername(): String {
    return localStorage.getItem('username');
  }

  logout() {
    localStorage.clear();
  }

  register(user: User): Observable<any> {
    return this.http.post(this.registrationUrl, user);
  }
}
