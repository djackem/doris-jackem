import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-config-item',
  templateUrl: './config-item.component.html',
  styleUrls: ['./config-item.component.css']
})
export class ConfigItemComponent implements OnInit{
  @Input() index: number;
  @Input() item: Item | null;
  @Input() categories: string[];
  @Output() UpdateJSON = new EventEmitter<any>();  
  @Output() NewItemEmitter = new EventEmitter<any>();
  @Output() PreviewEmitter = new EventEmitter<any>();
  @Output() DeleteMeEmitter = new EventEmitter<any>();
  
  active = false;
  active_char = "+";
  has_images: boolean;
  has_links: boolean;
  link_menu_valid: boolean=false;
  link_menu_text: string = "";
  link_menu_url: string = "";
  link_delete_key: string = null;

  delete_counter: number = 0;
  delete_text: string = "Delete";


  ngOnInit(){
    this.has_images = this.item.imgs ? this.item.imgs.length>0 : false;
    this.has_links = this.item.links ? true : false;

    if (this.item == null){
      this.item = { id:999, name: "", category:"", desc: "", img:"", imgs:[] };
    }
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
    this.link_menu_valid = this.link_menu_text.length>0 && this.link_menu_url.length>0 ;    
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

  DeleteLink( key: string ){
    if ( !this.link_delete_key ){
      this.link_delete_key = key;
    }else{
      this.link_delete_key = null;
      let links = {...this.item.links};
      delete links[key];   
      this.UpdateJSON.emit({
        "index": this.index,
        "prop": "links",
        "value": links
      });
    }    
  }

  // Delete button
  ResetDelete(){
    this.delete_text = `Delete`;
    this.delete_counter = 0;
  }

  DeleteMe(){
    if (++this.delete_counter <= 1){      
      this.delete_text = `Confirm Delete`;
    }else{
      this.DeleteMeEmitter.emit( this.index );
    }
    
  }

}
