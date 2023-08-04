import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/serv/items.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  activated: boolean = false;
  constructor( public itemService: ItemsService, public router: Router ){}

 /*  onActivate(event : any) {
    this.showOutlet = true;
    console.log('activated')
  }
  
  onDeactivate(event : any) {
    this.showOutlet = false;
    console.log('deactivated')
  } */
}
