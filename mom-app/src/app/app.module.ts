import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultComponent } from './comp/search-result/search-result.component';
import { ThumbComponent } from './comp/thumb/thumb.component';

import { SplashComponent } from './comp/splash/splash.component';
import { CategoryComponent } from './comp/category/category.component';


@NgModule({
  declarations: [
    AppComponent,   
    SearchResultComponent, 
    ThumbComponent,
    SplashComponent, 
    CategoryComponent, 
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
