import { LocationDropDownComponent } from './dropdown.component';
import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef, ComponentFactoryResolver, ComponentFactory, OnInit } from '@angular/core';
import { LocationSectionComponent } from './section.component';

@Component({
  selector: 'app-irene-add-locations',
  templateUrl: './add-locations.component.html',
  styleUrls: ['./add-locations.component.scss']
})

export class AddLocationsComponent implements AfterViewInit, OnInit {
  @ViewChildren(LocationSectionComponent) sections: QueryList<LocationSectionComponent>;
  activeSections: LocationSectionComponent[];
  textComponentFactory: ComponentFactory<LocationDropDownComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {  }

  ngOnInit() {
        this.textComponentFactory = this.componentFactoryResolver.resolveComponentFactory(LocationDropDownComponent);
  }

  ngAfterViewInit() {
    this.activeSections = this.sections.reduce((result, section, index) => {
      if(section.active) {
        result.push(section);
      }
      return result;
    }, []);
  }

   onAddComponentClick() {
    this.activeSections.forEach((section) => {
      section.viewContainerRef.createComponent(this.textComponentFactory);
    });
   }
}
