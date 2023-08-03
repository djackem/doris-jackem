import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemsService } from 'src/app/serv/items.service';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit{
  search_string: string = 'test';
  loading$?: Subscription;
  items: Item[] = [];

  constructor( public itemService: ItemsService ){}

  ngOnInit(){
      // Wait for itemservice to load config before trying to fill if not loaded yet
      // This uses an event emitter in the service
      if ( this.itemService.loading ){
        this.items = this.itemService.SearchItems( this.search_string );
      }else{
        this.loading$ = this.itemService.loading_emitter.subscribe( loading => {
          this.items = this.itemService.SearchItems( this.search_string );
          this.loading$?.unsubscribe();
        })
      }      
  }

}
