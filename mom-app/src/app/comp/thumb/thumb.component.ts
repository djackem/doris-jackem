import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css']
})
export class ThumbComponent implements OnInit{
  @Input() item!: Item;
  image_loaded: boolean=false;
  ngOnInit(){
    
  }
}
