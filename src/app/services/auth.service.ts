import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = null;
  jwt:string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(registerData) {
   return this.http.post('http://localhost:1337/auth/local/register', registerData);
  }

  setUser(userData) {
    this.user = userData;
  }

  setJwt(jwt:string, isRememberMe: boolean = true) {
    if(isRememberMe) {
      window.localStorage.setItem('jwt', jwt);
    }
    this.jwt = jwt;
  }

  tryLogin() {
   const jwt:string = window.localStorage.getItem('jwt');

   if(jwt) {
     this.fetchMe(jwt)
   }
  }

  fetchMe(jwt) {
    this.http.get('http://localhost:1337/users/me', {
      headers:{
        Authorization: `Bearer ${jwt}`
      }
    }).subscribe(data => {
      this.user = data;
      this.jwt = jwt;
    })
  }

  login(loginData) {
    return this.http.post('http://localhost:1337/auth/local', loginData);
  }

  logout() {
    window.localStorage.removeItem('jwt');
    this.user = null;
    this.jwt = '';
    this.router.navigateByUrl('/');
  }
}
