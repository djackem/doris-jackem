import { Component, HostListener, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/serv/items.service';
import { Item } from 'src/app/types/item';

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

  show_new_item: boolean = false;
  new_name: string = "";
  new_desc: string = "";
  new_cat: string = "";
  new_img: string = "";
  new_valid: boolean = false;

  delete_category: string = null;
  selected_category: any;
  new_category: string = "";
  categories: string[];

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
    this.categories = [];
    for( let item of this.data_copy["items"]){
      this.items.push(item);      
      if ( this.categories.indexOf(item.category) == -1 ){
        this.categories.push(item.category);
      }
    }    
    this.output_string = "Initialized.";
  }


  DeleteCategory( cat: string ){
    if (this.delete_category){      
      this.categories.splice(this.categories.indexOf(this.delete_category), 1);      
      let output = [];
      
      // Check if we will have anything left
      let miss = 'missing';
      let change_cat = this.categories.length ? this.categories[0] : miss;
      if (change_cat == miss && this.categories.indexOf(miss) == -1){
        this.categories.push(miss);
      }

      // Check item categories and change them to a default
      for ( let item of this.items ){
        if ( item.category==this.delete_category ){
          output.push(` ${item.name}:${item.category} --> ${change_cat}`);
          item.category = change_cat;
        }
      }

      // Output
      this.output_string = `Deleted Category: ${this.delete_category}`;
      this.output_visible = true;
      if ( output.length ){
        this.output_string += `\nChanged item Categories:\n${output.join('\n')}`;
      }

      this.delete_category = null;
    }else{
      // Clicked once
      this.delete_category = cat;
    }
  }

  NewCategory(){    
    this.categories.push(this.new_category);
    this.output_visible = true;
    this.output_string = `Created new category: ${this.new_category}`;
    this.new_category = "";
  }

  /**
   * @param data 
   * object{
   *    index: number, // Array index of item in data
   *    prop: string,   // Property to change
   *    value: any    // New value
   * }
   */
  Update( data ){
    this.output_visible = true;
    try{
      let old = this.data_copy.items[data.index][data.prop];

      // Set new values    
      this.data_copy.items[data.index][data.prop] = data.value;    
      this.json_final = JSON.stringify(this.data_copy, null, 2);

      // Build Output string      
      let _to = (typeof data.value == "object") ? this.PrettyDict(data.value) : data.value;
      let _from = (typeof old == "object") ? this.PrettyDict(old) : old;

      // Falsy --> "nothing"
      _to = !_to ? "nothing" : _to;
      _from = !_from ? "nothing" : _from;

      // Output to user
      this.output_string = `Changed: ${this.data_copy.items[data.index].name}.${data.prop}\n${_from} --> ${_to}`;
    }catch(E){
      this.output_string = `ERROR:\n${E}`;
    }    
  }

    // Helper prettify the dictionary
    PrettyDict( dict:Object ):string{
      let ret = [];
      for(const [key, value] of Object.entries(dict)){
        ret.push(`${key} : ${value}`);
      }
      return ret.join('\n');
    }

  // Delete item at index i (this.items[i])
  Delete( i:number ){
    try{
      let item = this.items[i].name;

      this.data_copy.items.splice( i, 1 );
      this.json_final = JSON.stringify(this.data_copy, null, 2);
      
      this.items=[];
      for( let item of this.data_copy["items"]){
        this.items.push(item);
      }
      
      this.output_visible = true;
      this.output_string = `Deleted ${item}.`;

    }catch(E){
      console.log(`Error Deleting ${i}\n${E}`);
    }
  }


  CopyItems(){
    this.output_string = "Copied all items to clipboard.";
    this.output_visible = true;
    navigator.clipboard.writeText(JSON.stringify( this.data_copy, null, 2) );   
  }

  UpdateSiteItems(){
    this.itemService.SetItems(this.data_copy);
    navigator.clipboard.writeText(JSON.stringify( this.data_copy, null, 2) );
    this.output_string = "Copied all items to clipboard and updated site.";
    this.output_visible = true;
  }

  ////////////// New Item /////////////////////////////////
  SetNewFile($event){
    this.new_img = $event.target.value.split("\\").pop();
    this.CheckNew($event);
  }

  CheckNew( $event ){
    this.new_valid = 
      this.new_name.length>0 && 
      this.new_desc.length>0 && 
      this.selected_category &&
      this.new_img.length>0;    
  }

  // Actually creates the new item and registers it
  NewItem(){
    let item:Item = {
      name: this.new_name,
      desc: this.new_desc,
      img: this.new_img,
      category: this.selected_category
    }
    
    // Register new item
    this.items.push(item);
    this.data_copy.items.push(item);
    this.json_final = JSON.stringify(this.data_copy, null, 2);

    this.output_visible = true;
    this.output_string = `Created New Item: ${this.new_name}`;

    // Housekeeping
    this.CloseNew();
  }

  CloseNew(){
    this.new_name = "";
    this.new_desc = "";
    this.new_img = "";
    this.show_new_item = false;
  }

}
