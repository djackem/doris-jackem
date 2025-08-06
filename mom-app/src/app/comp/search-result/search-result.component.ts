import { Component, Input } from '@angular/core';
import { SearchResult } from 'src/app/types/SearchResult';

@Component({
  selector: 'app-search-result',
  template: `
    <div class="search-result-container">
      <ng-template #noImg><div class="placeholder"></div></ng-template>
      <img *ngIf="data.item; else noImg" [loadImg]="'assets/img/'+data.item.img" />
      <div>
        <h4>{{ data.text }}</h4>
        <div class="search-description" *ngIf="data.desc">{{ data.desc }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  @Input() data!: SearchResult;
  /* 
  // This is wonky and there is no good way to do it with the elipsis without more here
  public get Desc(){
    if (this.data.desc.length<130){
      return this.data.desc;
    }else{
      let d = this.data.desc.slice(0, 130).trim();
      if (d.length < this.data.desc.length) d += "...";
      return d;
    }    
  } */

}
