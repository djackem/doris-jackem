import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/serv/items.service';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit{
  constructor( public itemService: ItemsService ){}
  featured_item: Item;
  ngOnInit(){
    const random_item = this.itemService.GetRandom();
    this.featured_item = random_item;
  }
}
