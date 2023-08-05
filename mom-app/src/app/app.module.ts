import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultComponent } from './comp/search-result/search-result.component';
import { ThumbComponent } from './comp/thumb/thumb.component';

import { SplashComponent } from './comp/splash/splash.component';
import { CategoryComponent } from './comp/category/category.component';
import { CategoriesComponent } from './comp/categories/categories.component';
import { ItemComponent } from './comp/item/item.component';
import { SearchBarComponent } from './comp/search-bar/search-bar.component';


@NgModule({
  declarations: [
    AppComponent,   
    SearchResultComponent, 
    ThumbComponent,
    SplashComponent, 
    CategoryComponent, 
    CategoriesComponent,
    ItemComponent, 
    SearchBarComponent, 
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
