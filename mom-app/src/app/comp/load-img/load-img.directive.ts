import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Subject, Subscription, delay, filter } from 'rxjs';
import { LoadImageService } from 'src/app/serv/load-image-service.service';

@Directive({
  selector: '[loadImg]',
})
export class LoadImgDirective implements OnInit, OnDestroy{
  @Input('loadImg') url: string;
  @Input() loadBg: boolean = false;
  @Input() useObserver: boolean = false;
  isLoaded: boolean = false; 
  private observer$: Subject<any> | undefined;
  
  constructor( 
    public loadService: LoadImageService,
    public elemRef: ElementRef, 
    public renderer: Renderer2 
  ){}

  
  ngOnChanges( changes: SimpleChanges ){ 
    // Fire init if the url input has changed
    if ( changes['url'] ){
      if( changes['url']['firstChange'] ){
        return; // Init
      }else{
        this.ngOnInit();
      }
    }
  }

  ngOnInit() {
    if ( !this.useObserver ){
      this.LoadSrc();
    }else{      
      if( this.loadService.IsImageLoaded( this.url ) ){
        this.LoadSrc();
      }else{
        if (this.isLoaded){

        }else{
          // Observer
          this.observer$ = this.loadService.ElemObserve( this.elemRef.nativeElement );
          this.observer$.subscribe( target =>{ 
              if ( target === this.elemRef.nativeElement ){
                this.LoadSrc();
              }
          });
        }
      }
    }
  };

  ngOnDestroy(){
    /* if (this.observer$) this.observer$.unsubscribe();
    this.observer$ = undefined; */
  };

  LoadSrc(){    
    if ( this.loadService.IsImageLoaded( this.url ) ){
      // Image has been loaded already
      if ( this.loadBg ){
        this.renderer.setStyle(this.elemRef.nativeElement, 'background-image', `url(${this.url})`);
      }else{
        this.elemRef.nativeElement.src = this.url;
      }
      this.isLoaded = true;
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
          this.isLoaded = true;
          if ( this.loadBg ){
            this.renderer.setStyle(this.elemRef.nativeElement, 'background-image', `url(${response})`);
          }else{
            this.elemRef.nativeElement.src = response;
          }
        });
    }
  };

};;
