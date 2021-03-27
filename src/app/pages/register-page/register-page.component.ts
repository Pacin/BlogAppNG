import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm = {
    username: '',
    email: '',
    password:'',
    confirmPassword: ''
  };
  isToSChecked: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

register()  {
  this.isSubmitting=true;
  if(!this.isToSChecked) return;

  const { confirmPassword, ...registerData} = this.registerForm;

  if (this.registerForm.password !== confirmPassword) 
    return;

    this.authService.register(registerData)
      .subscribe((data:any) => {
        this.authService.setUser(data.user);
        this.authService.setJwt(data.jwt);
        this.registerForm.username = '';
        this.registerForm.email = '';
        this.registerForm.password  ='';
        this.registerForm.confirmPassword = '';
        this.isSubmitting=false;
        this.router.navigateByUrl('/');
      })
  }

}
