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
  isVisible:boolean = false;


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

  get isMe() {
    return this.authService.user.id === this.post.user.id;
  }

  deletePost(postId) {
    if(this.authService.user.username !== this.post.user.username) return window.alert('You dont have the perm to do it.');

    this.http.delete(`http://localhost:1337/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${this.authService.jwt}`
      }
    })
      .subscribe(() => this.router.navigateByUrl('/blogs'))
}

  editHandler() {
    this.isVisible = !this.isVisible;
  }

  editPost(postId) {
    if(this.authService.user.username !== this.post.user.username) return window.alert('You dont have the perm to do it.');

      this.http.put(`http://localhost:1337/posts/${postId}`, this.post, {
        headers: {
          Authorization: `Bearer ${this.authService.jwt}`
        }
      })
        .subscribe(() => this.router.navigateByUrl('/blogs'))
  }
}
