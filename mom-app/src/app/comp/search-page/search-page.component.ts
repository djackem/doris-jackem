import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ItemsService } from 'src/app/serv/items.service';
import { SearchResult } from 'src/app/types/SearchResult';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit{
  constructor(
    public router: Router, 
    public activatedRoute: ActivatedRoute,
    public itemService: ItemsService
  ){};

  ngOnInit(){
    this.GetContent();

    // Router events will trigger a reload
    this.router.events.pipe( filter( e => e instanceof NavigationEnd ) )
      .subscribe( e =>{ this.GetContent(); }) 
  };
  
  search_string!: string;
  results!: SearchResult[];
  categories !: SearchResult[];
  items !: Item[];
  start_index: number = 0;
  end_index: number = 0;
  
  GetContent() {
    this.items = [];
    this.categories = [];
    this.search_string = this.activatedRoute.snapshot.url[1].path;
    const res = this.itemService.Search(this.search_string);
    const count = res?.length || 0;
    this.results = count ? res : [];
    
    // Separate items and categories from results for template
    for (let result of this.results ){
      if (result.item){
        this.items.push(result.item);
      }else{
        this.categories.push(result);
      }
    }

    this.end_index = this.results.length
  };

  
};;
