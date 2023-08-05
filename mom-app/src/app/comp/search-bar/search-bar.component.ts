import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ItemsService } from 'src/app/serv/items.service';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {  
  search_string:string='';
  isFocused: boolean = false;
  results: any | null = null;

  @ViewChild('search_input') search_input: any;

  constructor( private router: Router, public itemService: ItemsService ) {
    
    // Clear results div if we navigate somewhere
    this.router.events.pipe( filter( e => e instanceof NavigationEnd ) )
      .subscribe( e =>{
        this.search_input.nativeElement.blur();
        this.search_string = "";
        this.results = null;
      }) 
  }
  
  
  onInputChange( txt: string ){
    this.results = {};
    const val = this.Validate( txt );
    if (val){
      console.error(val)
    }else{
      this.results = this.itemService.Search( txt );
    }
  }

  onFocusChange( focus: boolean ){
    this.isFocused = focus;
    //console.log('foc', focus)
  }

  Validate( txt: string ): string | null {
    if (txt.length < 3) return 'Text too short.';

    return null;
  }

}
