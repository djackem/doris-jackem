import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThumbComponent } from './comp/thumb/thumb.component';

import { SplashComponent } from './comp/splash/splash.component';
import { CategoryComponent } from './comp/category/category.component';
import { CategoriesComponent } from './comp/categories/categories.component';
import { ItemComponent } from './comp/item/item.component';
import { SearchBarComponent } from './comp/search-bar/search-bar.component';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SearchResultComponent } from './comp/search-result/search-result.component';
import { SearchPageComponent } from './comp/search-page/search-page.component';
import { KeyValuePipe } from '@angular/common';
import { LoadImgDirective } from './comp/load-img/load-img.directive';


@NgModule({
  declarations: [
    AppComponent,   
    ThumbComponent,
    SplashComponent, 
    CategoryComponent, 
    CategoriesComponent,
    ItemComponent, 
    SearchBarComponent, 
    SearchResultComponent, 
    SearchPageComponent, 
    LoadImgDirective,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LazyLoadImageModule,
    KeyValuePipe,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
