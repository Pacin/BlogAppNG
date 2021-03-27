import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BlogListPageComponent } from './pages/blog-list-page/blog-list-page.component';
import { BlogDetailPageComponent } from './pages/blog-detail-page/blog-detail-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateBlogPageComponent } from './pages/create-blog-page/create-blog-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BlogListPageComponent,
    BlogDetailPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    CreateBlogPageComponent    
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
