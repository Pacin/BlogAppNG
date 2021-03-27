import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-blog-detail-page',
  templateUrl: './blog-detail-page.component.html',
  styleUrls: ['./blog-detail-page.component.scss']
})
export class BlogDetailPageComponent implements OnInit {
  post = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.http.get(`http://localhost:1337/posts/${id}`)
        .subscribe(data => this.post = data);
    })
  }

  get isAuthenticated() {
    return !!this.authService.jwt;
  }

  deletePost(postId) {
    this.http.delete(`http://localhost:1337/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${this.authService.jwt}`
      }
    })
      .subscribe(() => this.router.navigateByUrl('/blogs'))
  }
}
