import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './comp/splash/splash.component';
import { CategoryComponent } from './comp/category/category.component';

const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'home', component: SplashComponent },
  { path: 'category/:cat', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
