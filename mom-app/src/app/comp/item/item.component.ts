import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { ItemsService } from 'src/app/serv/items.service';
import { LoadImageService } from 'src/app/serv/load-image-service.service';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  animations:[
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: '0', top: '0px' }),        
        animate('150ms ease-in', style({ opacity: '1' }))        
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: '0' }))        
      ])
    ])
  ]
})
export class ItemComponent implements OnInit{

  item!: Item;
  back_url:string | undefined;
  back_name:string | undefined;
  view:string = 'gallery';
  zoom_url: string | undefined;

  fragment: string = undefined;

  constructor( 
    public itemService: ItemsService, 
    private router: Router,
    private route: ActivatedRoute,
    private loadImage: LoadImageService
  ){    
    router.events.subscribe( s => {
      if ( s instanceof NavigationEnd ){
        const t = router.parseUrl(router.url);
        this.fragment = t.fragment;
      }
    })    
  }
  
  ngOnInit(){
    this.router.events.pipe( filter( e => e instanceof NavigationEnd ) )
      .subscribe( e =>{
        this.back_name = this.back_url ? this.back_url.split('/')[1] : 'missing';
        this.getMyItem();
      }) 

      this.route.queryParams.subscribe((params) => {
        this.back_url  = params['refer'];
        this.back_name = this.back_url?.split('/')[1];
      })
    
    this.getMyItem();
  }

  getMyItem(){
    // Get item from id
    const id:number = Number(this.route.snapshot.paramMap.get('id'));
    this.item = this.itemService.GetItem(id);
  }

  onImageClick( event:any ){
    if ( event.target.src.includes(this.loadImage.loadingImgUrl) ){
      //console.log('Loading')
    }else{
      this.zoom_url = event.target.src;
    }
  }

  onCloseClick(){
    this.zoom_url = undefined;
  }

}
