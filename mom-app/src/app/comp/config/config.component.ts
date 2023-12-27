import { Component, HostListener, OnInit } from '@angular/core';
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
  output_string = "DEFAULT";
  output_visible: boolean = true;

  constructor( public itemService: ItemsService ){}
  
  // On Scroll, hide output
  @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll(event) {
      this.output_visible = false;
    }

  ngOnInit(){    
    // Copy items from service
    this.data_copy = JSON.parse(JSON.stringify(this.itemService.Data));
    this.json_final = JSON.stringify(this.data_copy, null, 2);
    for( let item of this.data_copy["items"]){
      this.items.push(item);
    }    
    this.output_string = "Initialized.";
  }

  Update(data){
    try{
      let old = this.data_copy.items[data.index][data.prop];
      this.data_copy.items[data.index][data.prop] = data.value;    
      this.json_final = JSON.stringify(this.data_copy, null, 2);      
      this.output_visible = true;
      this.output_string = `Changed: ( ${this.data_copy.items[data.index].name} ) : ${data.prop}\nfrom: ${old}\nto: ${data.value}`;
    }catch(E){
      this.output_string = `ERROR:\n${E}`
    }    
  }

}
