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
      this.output_string = `Changed: ( ${this.data_copy.items[data.index].name} ) [ ${data.prop} ]\n\nfrom:\n${_from}\n\nto:\n${_to}`;
    }catch(E){
      this.output_string = `ERROR:\n${E}`
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

  OutputClicked(){
    this.output_visible = false;
  }

  CopyItems(){
    this.output_string = "Copied all items to clipboard.";
    this.output_visible = true;
    navigator.clipboard.writeText(JSON.stringify( this.data_copy, null, 2) );   
  }

}
