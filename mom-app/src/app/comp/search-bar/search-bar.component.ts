import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ItemsService } from 'src/app/serv/items.service';
import { Item } from 'src/app/types/item';
import { InputError } from 'src/app/types/InputError';
import { trigger, transition, animate, style } from '@angular/animations';
import { SearchResult } from 'src/app/types/SearchResult';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  animations:[
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'scaleY(0%)'}),        
        animate('200ms ease-in', style({ transform: 'scaleY(100%)' }))
        
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scaleY(0%)' }))
        
      ])
    ])
  ]
})
export class SearchBarComponent {  
  search_string:string='';
  isFocused: boolean = false;
  results: SearchResult[] | null = null;
  errors: InputError[] | null = null;

  @ViewChild('search_input') search_input: any;

  constructor( private router: Router, public itemService: ItemsService ) {    
    // Clear results div if we navigate somewhere
    this.router.events.pipe( filter( e => e instanceof NavigationEnd ) )
      .subscribe( e =>{
        this.onFocusEvent(false);
        this.search_string = "";
        this.results = null;
        this.errors = null;
      });
  };

  onFocusEvent( focus: boolean ){
    this.isFocused = focus;
  };

  onClearClick(){
    this.search_string = '';
    this.results = null;
    this.errors = null;
  };

  onSearchClick(){
    if ( !this.Validate(this.search_string) ){
      this.router.navigate(['/search', this.search_string]);
    };
  };
  
  
  onInputChange( txt: string ){
    this.results = null;
    if (txt.length < 3) {
      // Too short
    }else{
      const errors = this.Validate( txt );
      this.errors = null;
      if ( errors ){
        this.errors = errors;
      }else{
        let res:SearchResult[] | null = this.itemService.Search( txt );        
        this.results = res ? res : [];
      }
    };
  };

  onFocusChange( focus: boolean ){
    this.isFocused = focus;
  };

  Validate( txt: string ): InputError[] | null {
    let errs: InputError[] = [];
    txt = txt.trim();
    if ( txt.length < 3 ){
      errs.push(<InputError>{ text: 'Search too Short', desc: 'Please enter more than 3 valid characters.' });
    }
    return errs.length ? errs : null;
  };

};
