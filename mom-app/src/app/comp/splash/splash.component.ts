import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/serv/items.service';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit{
  featured_item: Item;

  constructor( public itemService: ItemsService ){}

  ngOnInit(){
    const random_item = this.itemService.GetRandom();
    this.featured_item = random_item;
  }

};;
