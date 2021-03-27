import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-blog-list-page',
  templateUrl: './blog-list-page.component.html',
  styleUrls: ['./blog-list-page.component.scss']
})
export class BlogListPageComponent implements OnInit {
  posts:any[] = null;

  get isAuthenticated() {
    return !!this.authService.jwt;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get('http://localhost:1337/posts')
      .subscribe((data:any) => this.posts = data);
  }



}
