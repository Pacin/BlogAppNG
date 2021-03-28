import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm = {
    identifier: '',
    password: ''
  }
  isSubmitting: boolean = false;
  isRememberMe: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.isSubmitting = true;

    this.authService.login(this.loginForm)
      .subscribe((data:any) => {
        this.authService.setUser(data.user);
        this.authService.setJwt(data.jwt, this.isRememberMe);
        this.loginForm.identifier = '';
        this.loginForm.password = '';
        this.isSubmitting = false;
        this.router.navigateByUrl('/');
      })
  }

}
