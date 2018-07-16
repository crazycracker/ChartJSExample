import { LanguageDropDownComponent } from './dropdown.component';
import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef, ComponentFactoryResolver, ComponentFactory, OnInit } from '@angular/core';
import { LanguageSectionComponent } from './section.component';

@Component({
  selector: 'app-irene-add-languages',
  templateUrl: './add-languages.component.html',
  styleUrls: ['./add-languages.component.scss']
})
export class AddLanguagesComponent implements AfterViewInit, OnInit {
  @ViewChildren(LanguageSectionComponent) sections: QueryList<LanguageSectionComponent>;
  activeSections: LanguageSectionComponent[];
  textComponentFactory: ComponentFactory<LanguageDropDownComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {  }

  ngOnInit() {
        this.textComponentFactory = this.componentFactoryResolver.resolveComponentFactory(LanguageDropDownComponent);
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