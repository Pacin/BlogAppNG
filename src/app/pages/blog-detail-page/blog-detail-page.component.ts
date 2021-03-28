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
  comments:any[] = [];
  commentText:string;
  isSubmittingComment:boolean = false;


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
        .subscribe((data:any) => this.post = data);
      this.fetchComments(id);
      })
  }

  get isMe() {
    if(this.authService.user) {
      return this.authService.user.id === this.post.user.id;
    }
  }

  get isAuthenticated(){
    return !!this.authService.jwt;
  }

  fetchComments(postId:number) {
    this.http.get(`http://localhost:1337/comments?post=${postId}`)
    .subscribe((data:any) => this.comments = data) 
  }

  deletePost(postId) {
    if(this.authService.user.id !== this.post.user.id) return window.alert('You dont have the perm to do it.');

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
    if(this.authService.user.id !== this.post.user.id) return window.alert('You dont have the perm to do it.');

      this.http.put(`http://localhost:1337/posts/${postId}`, this.post, {
        headers: {
          Authorization: `Bearer ${this.authService.jwt}`
        }
      })
        .subscribe(() => this.router.navigateByUrl('/blogs'))
  }

  createComment() {
    this.isSubmittingComment = true;

    

  const newComment = {
    text: this.commentText,
    post: this.post.id,
    user: this.authService.user.id
  }

    this.http.post(`http://localhost:1337/comments`, newComment, {
      headers: {
        Authorization:`Bearer ${this.authService.jwt}`
      }
    }) .subscribe(data => {
      this.commentText = '';
      this.isSubmittingComment = false;
      this.fetchComments(this.post.id);
    })
  }

  deleteComment(commentId:number) {
this.http.delete(`http://localhost:1337/comments/${commentId}`, {
   headers:{
     Authorization: `Bearer ${this.authService.jwt}`
   }
}).subscribe(data => this.fetchComments(this.post.id));
  }
}
