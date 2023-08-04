import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ItemsService } from 'src/app/serv/items.service';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  category!: string | null;
  items: Item[] = [];

  constructor( private route: ActivatedRoute, private router: Router, public itemService: ItemsService ) {
      this.router.events.pipe( filter( e => e instanceof NavigationEnd ) )
        .subscribe( e =>{
          this.GetCategory();
        })
  }
  
  ngOnInit(){
    this.GetCategory();
  }  

  GetCategory(){
    this.category = this.route.snapshot.paramMap.get('cat') || "Welcome";
    this.items = this.itemService.GetCategoryItems( this.category );
  }


}
