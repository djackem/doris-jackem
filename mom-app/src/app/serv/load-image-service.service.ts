import { ElementRef, Injectable, OnInit } from '@angular/core';
import { Subject, delay, filter } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoadImageService{

  private _loadingImgUrl: string = 'assets/page-assets/loading.svg';  
  private loaded: Set<string> = new Set();  
  
  get loadingImgUrl(){ return this._loadingImgUrl; }; 

  IsImageLoaded = ( url: string ):boolean => this.loaded.has(url);
    
  GetImage( src: string ): Promise<string> {   
    return new Promise( res =>{
      if ( this.loaded.has(src) ) res(src);
      const img = new Image();
      img.onload = () =>{
        this.loaded.add( src );
        res( src );
      }
      img.src = src;
    });
  };
  
}
