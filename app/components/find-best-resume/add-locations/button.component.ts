import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-locations-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss']
})
export class LocationButtonComponent {
  @Output() addComponentClick = new EventEmitter();
   constructor() { }
} 