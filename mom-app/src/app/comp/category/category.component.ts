import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  constructor( private route: ActivatedRoute,  private router: Router ) {
    this.router.events.pipe(
      filter( e=> e instanceof NavigationEnd )
    ).subscribe( e =>{
      this.GetCategory();
    })
  }

  category!: string | null;

  ngOnInit(){
    this.GetCategory();
    
    //console.log(this.category)
  }

  GetCategory(){
    this.category = this.route.snapshot.paramMap.get('cat');
  }

}
