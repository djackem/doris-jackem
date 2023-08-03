import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link-button',
  template: `    
      <div class="link-btn">
        <p>{{ text }}</p>
      </div>    
  `,
  styleUrls: ['./link-button.component.css']
})
export class LinkButtonComponent {
  @Input() text!: string;
}
