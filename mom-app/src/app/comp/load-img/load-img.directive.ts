import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Subject, Subscription, delay, filter } from 'rxjs';
import { LoadImageService } from 'src/app/serv/load-image-service.service';

@Directive({
  selector: '[loadImg]',
})
export class LoadImgDirective implements OnInit, OnDestroy{
  @Input('loadImg') url: string;
  @Input() loadBg: boolean = false;
  @Input() useObserver: boolean = true;
  isLoaded: boolean = false; 
  /* private observer$: Subject<any> | undefined; */
  private subscription$: Subscription | undefined;
  
  constructor( 
    public loadService: LoadImageService,
    public elemRef: ElementRef, 
    public renderer: Renderer2 
  ){}


  // Fire init if the url input has changed
  ngOnChanges( changes: SimpleChanges ){    
    /* if ( changes['url'] ){
      if( changes['url']['firstChange'] ){
        return; // Init
      }else{
        this.ngOnInit();
      }
    } */
    this.ngOnInit();
  }

  ngOnInit() {
    this.SetSrc(this.loadService.loadingImgUrl);

    // No observer - just load image right away
    /* if( !this.useObserver ){
      this.loadService.GetImage(this.url)
        .then( res =>{
          this.SetSrc(this.url);
        });
    }else{ */

        // Observe
        var observe_stream = this.loadService.ElemObserve( this.elemRef.nativeElement );
        this.subscription$ = observe_stream.subscribe( target =>{ 
            if ( target === this.elemRef.nativeElement ){
              this.subscription$.unsubscribe();
              this.subscription$ = undefined;
              this.loadService.GetImage(this.url)
                .then( res =>{
                  this.SetSrc(this.url);
                });              
            }
        });        
    //}
  };

  ngOnDestroy(){
    if (this.subscription$) this.subscription$.unsubscribe();
    this.subscription$ = undefined;
  };

  SetSrc( url: string ){
    if ( this.loadBg ){
      this.renderer.setStyle(this.elemRef.nativeElement, 'background-image', `url(${url})`);
    }else{
      this.elemRef.nativeElement.src = url;
    }
  }
};;
