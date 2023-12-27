import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../types/item';
import { SearchResult } from '../types/SearchResult';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private data: any = null;
  private items: Item[] = []; // *use id to get index from obj ( items[item.id] )
  private items_by_category: any = {};
  private url: string = './assets/config.json';
  public loading: boolean = true;
  public loading_emitter: EventEmitter<boolean> = new EventEmitter();
  private sub$:Subscription;
  
  public get ItemsByCategory(){ return this.items_by_category};
  public get Data(){ return this.data };

  SetItems( new_items: any ){
    this.items = new_items;
  }
  
  constructor( http: HttpClient ) { 
    this.sub$ = http.get(this.url).subscribe( data => {
      this.sub$.unsubscribe();
      this.data = data;
      let id = 0;

      // Structure check
      if ( !this.data.hasOwnProperty('items') ){
        console.error(`Data file does not have items prop: ${data}`);
        return;
      }else{

        // Build item array
        for (let item of this.data.items ){ 
          const new_item: Item = {
            id: id++,
            name: item.name || 'Missing',
            desc: item.desc || 'Missing',
            category: item.category || 'Missing',
            img: `assets/img/${item.img}` || 'Missing',
            imgs : item.imgs?.map( i => `assets/img/${i}`),
            dimensions: item.dimensions ? item.dimensions : undefined,
            links: item.links ? item.links : undefined,
            note: item.note ? item.note : undefined,
            extra: item.extra ? item.extra : undefined
          }

          // Add to category register
          if ( !this.items_by_category.hasOwnProperty( item.category ) ){
             this.items_by_category[ item.category ] = [];
          }
          this.items_by_category[item.category].push( new_item );

          // Add to items
          this.items.push( new_item );
        }

        // Finished loading json
        this.loading = false;
        this.loading_emitter.emit( true );
      }
      
    });
    //console.log(this.items_by_category)
  }

  get categories(): string[] {
    return Object.keys( this.items_by_category ); 
  }

  GetCategoryItems( category: string ): Item[] { 
    return this.items_by_category[ category ];
  }

  GetItem( id:number ): Item {
    return this.items[id];
  }

  // Search for txt in items or category
  // Adds them to the results array, returns array
  Search( txt: string ): SearchResult[] | null {
    const lowered = txt.toLowerCase(); 
    const results: SearchResult[] = [];

    // Categories search
    this.categories.forEach( cat => {
      if ( cat.toLowerCase().includes( lowered ) ){
        results.push( <SearchResult>{
          url: `/category/${cat}`,
          text: cat,
          desc: `The "${cat}" category`,
        })
      };
    })

    // Item search - name or desc
    this.items.forEach( item => {
      if (  item.name.toLowerCase().includes( lowered ) || 
            item.desc.toLowerCase().includes( lowered ) ||
            item.name===lowered || item.desc===lowered ){
        results.push( <SearchResult>{
          url: '/item',
          params: item.id,
          item: item,
          text: item.name,
          desc: item.desc,
        })
      }
    });
    return results.length ? results : null;
  }

  // Search item by category or name
  SearchItems( name='*', category='*' ): Item[] {         
      const search_result = new Set<Item>();
      for ( const item of this.items ){
        if ( item.name.toLowerCase().includes(name) || name=='*' ) search_result.add( item );
        if ( item.category.includes(category) || category=='*' ) search_result.add( item );
      }
      return [...search_result];
  }

  // Get random item
  GetRandom(){
    const i_random = Math.floor( Math.random() * this.items.length );    
    return this.items[i_random] ? this.items[i_random] : this.items[0];
  }
  
};;
