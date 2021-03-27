import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  get isAuthenticated() {
    return !!this.authService.jwt;
  }

  get user() {
  return this.authService.user ? this.authService.user : {}; 
  }
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
