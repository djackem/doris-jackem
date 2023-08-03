import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../types/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {  
  
  data: any = null;
  items: Item[] = [];
  url: string = './assets/config.json';
  loading: boolean = false;
  loading_emitter: EventEmitter<boolean> = new EventEmitter();
  
  constructor( http: HttpClient ) { 
    http.get(this.url).subscribe( data => {
      this.data = data;
      if ( !this.data.hasOwnProperty('items') ){
        console.error(`Data file does not have items prop: ${data}`);
        return;
      }else{        
        let id = 0;

        // Build item array
        for (let item of this.data.items ){
          const new_item: Item = {
            id: id++,
            name: item.name || 'Missing',
            desc: item.desc || 'Missing',
            category: item.category || 'Missing',
            img_src: `assets/img/${item.img}` || 'Missing',
            img_loaded: false
          }
          this.items.push( new_item );
        }
        this.loading = false;
        this.loading_emitter.emit( true );
      }
      // Load item images
      /* let image_load_promises: Promise<number>[] = [];
      for ( const item of this.items ){
        this.LoadImage( item );
      } */


      console.log(this.items);
    });

  }

  SearchItems( name='*', category='*' ): Item[] {         
      const search_result = new Set<Item>();
      for ( const item of this.items ){
        if ( item.name.includes(name) || name=='*' ) search_result.add( item );
        if ( item.category.includes(category) || category=='*' ) search_result.add( item );
      }
      return [...search_result];
  }

  

  LoadImage( item: Item ): Promise<number>{
    return new Promise((res,rej)=>{

    })
  }


}
