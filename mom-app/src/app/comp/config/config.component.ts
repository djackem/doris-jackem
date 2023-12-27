import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/serv/items.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  json_final!:any;
  data_copy!:any;
  items:any = [];

  constructor( public itemService: ItemsService ){}
  
  ngOnInit(){
    // Copy items from service
    this.data_copy = JSON.parse(JSON.stringify(this.itemService.Data));
    this.json_final = JSON.stringify(this.data_copy, null, 2);
    for( let item of this.data_copy["items"]){
      this.items.push(item);
    }
  }

  Update(data){    
    this.data_copy.items[data.index][data.prop] = data.value;    
    this.json_final = JSON.stringify(this.data_copy, null, 2);
  }

}
