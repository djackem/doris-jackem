import { ElementRef, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, delay, filter } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoadImageService implements OnInit, OnDestroy{
  
  // * This is what will be shown while loading
  private LOADING_IMG_URL: string = 'assets/page-assets/loading.svg';
  
  private loaded: Set<string> = new Set();
  private observer: IntersectionObserver | undefined;
  private subject$ : Subject<HTMLElement> | undefined;
  
  ngOnInit(){    
    this.GetImage( this.LOADING_IMG_URL ).then(
      res => console.log(res)
    );// Loading the loading image
  };

  ngOnDestroy() {
    this.DestroyObserver();
  };

  get loadingImgUrl(){ return this.LOADING_IMG_URL; };
  
  IsImageLoaded = ( url: string ):boolean => this.loaded.has( url );
  
  // Load the src url using a throw away Image().
  // Returns promise that will resolve when image loaded
  // keeps track of loaded images in this.loaded:Set
  GetImage( src: string ): Promise<string> {   
    return new Promise( res =>{
      if ( this.loaded.has(src) ) res(src);
      const img = new Image();
      img.onload = () =>{
        //this.loaded.add( src );
        res( src );
      }
      img.src = src;
    });
  };

  // Entry point for lazy loaded (observable) images
  // Sets up IntersectionObserver, Subject (rxjs observable)
  // Returns the observable to subscribe easy
  ElemObserve( elem : HTMLElement ): Subject<HTMLElement>{
    if ( !this.observer ) this.CreateObserver();
    this.observer.observe( elem );
    return this.subject$;
  };

  CreateObserver( options: any = { rootMargin: '0px', threshold: 0.1 } ){
    this.subject$ = new Subject<HTMLElement>();
    this.observer = new IntersectionObserver( entries => {
      for ( const entry of entries ){
        if (entry.isIntersecting || entry.intersectionRatio > 0){
          const target = entry.target as HTMLElement;
          //this.GetImage(target.)
          this.subject$.next( target ); // Should fire in directive
          this.observer.unobserve(target);
        }
      };
    }, options);
  };
  
  DestroyObserver(){
    if ( this.observer ) {
      this.observer.disconnect();
      this.observer = undefined;
      this.subject$.complete();
      this.subject$ = undefined;
    }
  };
  
};;
