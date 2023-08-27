import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject, delay, filter } from 'rxjs';
import { LoadImageService } from 'src/app/serv/load-image-service.service';

@Directive({
  selector: '[loadImg]',
})

export class LoadImgDirective implements OnInit, OnDestroy{
  @Input('loadImg') url: string;
  @Input() loadBg: boolean = false;
  @Input() useObserver: boolean = false;

  private observer: IntersectionObserver | undefined;
  
  constructor( 
    public loadService: LoadImageService,
    public elemRef: ElementRef, 
    public renderer: Renderer2 
  ){}

  ngOnInit() {
    if ( !this.useObserver ){
      this.LoadSrc();
    }else{
      if( this.loadService.IsImageLoaded( this.url ) ){
        this.LoadSrc();
      }else{
        this.CreateObserver({
          rootMargin: '0px',
          threshold: 0.1
        });
      }
    }
  }

  ngOnDestroy(){
    this.DestroyObserver();
  }

  DestroyObserver(){
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }      
  }

  CreateObserver( options: any ){
    this.observer = new IntersectionObserver((entries, observer) => {
      for ( const entry of entries ){
        if (entry.isIntersecting || entry.intersectionRatio > 0) this.LoadSrc();
      };
    }, options);
    this.observer.observe( this.elemRef.nativeElement );
  }

  LoadSrc(){
    if ( this.loadService.IsImageLoaded( this.url ) ){
      // Image has been loaded already
      if ( this.loadBg ){
        this.renderer.setStyle(this.elemRef.nativeElement, 'background-image', `url(${this.url})`);
      }else{
        this.elemRef.nativeElement.src = this.url;
      }
    }else{
      // Wait for image to load, set src to loading image.
      // Once loaded, set src to url
      if ( this.loadBg ){
        this.renderer.setStyle(this.elemRef.nativeElement, 'background-image', `url(${this.loadService.loadingImgUrl})`);
      }else{
        this.elemRef.nativeElement.src = this.loadService.loadingImgUrl;
      }
      this.loadService.GetImage( this.url )
        .then( response => {
          if ( this.loadBg ){
            this.renderer.setStyle(this.elemRef.nativeElement, 'background-image', `url(${response})`);
          }else{
            this.elemRef.nativeElement.src = response;
          }
        });
    }
  };



}
