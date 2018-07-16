import { Component, Input, ViewContainerRef } from '@angular/core';

@Component({
   selector: 'div[app-type=Languagesection]',
   template: '',
})
export class LanguageSectionComponent {
  @Input() active: boolean;

   constructor(public viewContainerRef: ViewContainerRef) { }
}  