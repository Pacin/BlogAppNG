import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-blog-page',
  templateUrl: './create-blog-page.component.html',
  styleUrls: ['./create-blog-page.component.scss']
})
export class CreateBlogPageComponent implements OnInit {
  blogTitle = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  blogBody = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);


  isSubmitting:boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  createPost(){
    if(this.blogBody.invalid || this.blogTitle.invalid) return;

    this.isSubmitting = false;
    const newPost = {
      title: this.blogTitle.value,
      body: this.blogBody.value,
      user: this.authService.user.id
    }

    this.http.post('http://localhost:1337/posts', newPost, {
      headers: {
        Authorization: `Bearer ${this.authService.jwt}`
      }
    })
      .subscribe((data) => {
        this.blogTitle.setValue('');
        this.blogBody.setValue('');
        this.router.navigateByUrl('/blogs');
      })
  }
}
