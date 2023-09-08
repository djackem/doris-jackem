import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css']
})
export class ThumbComponent implements OnInit{  
  @Input() item!: Item;
  image_loaded: boolean=false;
  referral_url!: string;

  constructor( private router: Router ){};

  ngOnInit(){
    this.referral_url = this.router.url;
  }

};;
