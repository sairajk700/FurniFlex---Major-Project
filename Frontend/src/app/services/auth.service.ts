import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  register(firstname: string, lastname: string, email: string, phonenumber: number, newpassword: string, confirmpassword: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        firstname,
        lastname,
        email,
        phonenumber,
        newpassword,
        confirmpassword
      },
      httpOptions
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login',
      {
        email, password
      });
  }
}
