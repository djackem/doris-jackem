import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-config-item',
  templateUrl: './config-item.component.html',
  styleUrls: ['./config-item.component.css']
})
export class ConfigItemComponent implements OnInit{
  @Input() index: number;
  @Input() item: Item;
  @Output() UpdateJSON = new EventEmitter<any>();  
  active = false;
  active_char = "+";
  has_images: boolean;
  has_links: boolean;
  link_menu_valid: boolean=false;
  link_menu_text: string = "";
  link_menu_url: string = "";

  ngOnInit(){
    this.has_images = this.item.imgs ? this.item.imgs.length>0 : false;
    this.has_links = this.item.links ? true : false;
  }

  OpenClick(){
    this.active = !this.active;
    this.active_char = this.active ? "-" : "+";
  }

  OnMainImgChange($event){
    let v = $event.target.value;
    let f = v.split(/(\\|\/)/g).pop()
    this.UpdateJSON.emit({
      "index": this.index,
      "prop": "img",
      "value": f
    });
  }

  OnImagesChange($event){
    let new_list = [];
    for( let f of $event.target.files){
      new_list.push(f.name);
    }
    this.UpdateJSON.emit({
      "index": this.index,
      "prop": "imgs",
      "value": new_list
    });
    this.ngOnInit();
  }

  UpdateItemValue(event:any, prop: string ){
    this.UpdateJSON.emit({
      "index": this.index,
      "prop": prop,
      "value": event.target.value
    });
  }

  CheckLinkMenu(){
    this.link_menu_valid = this.link_menu_text.length>0 && this.link_menu_url.length>0;    
  }

  CreateLink(){
    if (this.link_menu_valid){
      //Build new dict 
      let links = this.item.links ? {...this.item.links} : {};
      links[this.link_menu_text] = this.link_menu_url;
      this.item.links = links;
      this.has_links = true;

      // Reset Values
      this.link_menu_text = "";
      this.link_menu_url = "";
      this.link_menu_valid = false;

      this.UpdateJSON.emit({
        "index": this.index,
        "prop": "links",
        "value":links
      });
    }
  }

}
