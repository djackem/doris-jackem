import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './comp/splash/splash.component';
import { CategoryComponent } from './comp/category/category.component';
import { CategoriesComponent } from './comp/categories/categories.component';
import { ItemComponent } from './comp/item/item.component';

const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'home', component: SplashComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: 'category', component: CategoriesComponent, children: [
    { path: ':cat', component: CategoryComponent },
  ] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
