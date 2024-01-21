import { Component, Input } from '@angular/core';
import { SearchResult } from 'src/app/types/SearchResult';

@Component({
  selector: 'app-search-result',
  template: `
    <div class="search-result-container">
      <img *ngIf="data.item" [loadImg]="'assets/img/'+data.item.img" />
      <div>
        <h4>{{ data.text }}</h4>
        <div id="small" *ngIf="data.desc">{{ Desc }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  @Input() data!: SearchResult;
  
  public get Desc(){
    if (this.data.desc.length<130){
      return this.data.desc;
    }else{
      let d = this.data.desc.slice(0, 130).trim();
      if (d.length < this.data.desc.length) d += "...";
      return d;
    }
    
  }
}
