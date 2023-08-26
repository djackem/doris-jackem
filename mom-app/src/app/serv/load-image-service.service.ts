import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadImageService{

  public loadingImgUrl: string = 'assets/page-assets/loading.svg';  
  private loaded: Set<string> = new Set();

  IsImageLoaded( url: string ):boolean{
    return this.loaded.has(url);
  };
  
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
