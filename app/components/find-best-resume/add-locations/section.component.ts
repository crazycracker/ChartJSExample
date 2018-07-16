import { Component, Input, ViewContainerRef } from '@angular/core';

@Component({
   selector: 'div[app-type=Locationsection]',
   template: '',
   styles: ['div { width: 100% }']
})
export class LocationSectionComponent {
  @Input() active: boolean;

   constructor(public viewContainerRef: ViewContainerRef) { }
}  