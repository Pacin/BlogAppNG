import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-blog-page',
  templateUrl: './create-blog-page.component.html',
  styleUrls: ['./create-blog-page.component.scss']
})
export class CreateBlogPageComponent implements OnInit {
  blogForm: {
    title: string,
    body: string
  } = {
    title: '',
    body: ''
  }
  isSubmitting:boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  createPost(){
    this.isSubmitting = false;
    const newPost = {
      ...this.blogForm,
      user: this.authService.user.id
    }

    this.http.post('http://localhost:1337/posts', newPost, {
      headers: {
        Authorization: `Bearer ${this.authService.jwt}`
      }
    })
      .subscribe(data => {
        this.blogForm.title = '';
        this.blogForm.body = '';
        this.router.navigateByUrl('/blogs');
      })
  }
}
