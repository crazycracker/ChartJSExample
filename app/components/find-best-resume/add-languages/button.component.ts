import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-languages-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss']
})
export class LanguageButtonComponent {
  @Output() addComponentClick = new EventEmitter();
   constructor() { }
} 