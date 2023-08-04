import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemsService } from 'src/app/serv/items.service';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{

  item!: Item;
  back_url!:string;

  constructor( public itemService: ItemsService, private route: ActivatedRoute ){}
  
  ngOnInit(){
    this.route.queryParams.subscribe( params => {
      this.back_url = params['refer'];
    });

    const id:number = Number(this.route.snapshot.paramMap.get('id'));
    this.item = this.itemService.GetItem(id);
  }

}
