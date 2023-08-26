import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { LoadImageService } from 'src/app/serv/load-image-service.service';

@Directive({
  selector: '[loadImg]',
})

export class LoadImgDirective implements OnInit{
  @Input('loadImg') url: string;
  @Input() loadBg: boolean = false;

  constructor( 
    public loadService: LoadImageService,
    public elemRef: ElementRef, 
    public renderer: Renderer2 
  ){}

  ngOnInit() {   
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
  }  
}
