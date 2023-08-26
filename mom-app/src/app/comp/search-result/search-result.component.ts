import { Component, Input } from '@angular/core';
import { SearchResult } from 'src/app/types/SearchResult';

@Component({
  selector: 'app-search-result',
  template: `
    <div class="search-result-container">
      <img *ngIf="data.item" [loadImg]="data.item.img_src" />
      <!-- <img *ngIf="data.item"
        [lazyLoad]="data.item.img_src"
        [defaultImage]="'/assets/img/tester.png'"
      /> -->
      <div>
        <h4>{{ data.text }}</h4>
        <small *ngIf="data.desc">{{ data.desc }}</small>
      </div>
    </div>
  `,
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  @Input() data!: SearchResult;
}
