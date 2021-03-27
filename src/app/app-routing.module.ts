import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailPageComponent } from './pages/blog-detail-page/blog-detail-page.component';
import { BlogListPageComponent } from './pages/blog-list-page/blog-list-page.component';
import { CreateBlogPageComponent } from './pages/create-blog-page/create-blog-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  {path:'', component: HomePageComponent},
  {path:'register', component: RegisterPageComponent},
  {path:'login', component: LoginPageComponent},
  {path:'blogs', component: BlogListPageComponent},
  {path:'blogs/:id', component: BlogDetailPageComponent},
  {path:'create-post', component: CreateBlogPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
