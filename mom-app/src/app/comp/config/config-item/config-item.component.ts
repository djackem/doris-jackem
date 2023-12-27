import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-config-item',
  templateUrl: './config-item.component.html',
  styleUrls: ['./config-item.component.css']
})
export class ConfigItemComponent {
  @Input() index: number;
  @Input() item: Item;
  @Output() UpdateJSON = new EventEmitter<any>();

  UpdateItemValue(event:any, prop: string ){
    console.log(this.item);
    this.UpdateJSON.emit({
      "index": this.index,
      "prop": prop,
      "value": event.target.value
    });
  }

}
