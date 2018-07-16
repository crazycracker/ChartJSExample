import { LocationSectionComponent } from './../add-locations/section.component';
import { LocationDropDownComponent } from './../add-locations/dropdown.component';
import { LocationButtonComponent } from './../add-locations/button.component';
import { LanguageDropDownComponent } from './../add-languages/dropdown.component';
import { LanguageButtonComponent } from './../add-languages/button.component';
import { LanguageSectionComponent } from './../add-languages/section.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FindResumeComponent } from './find-resume.component';
import { FormsModule } from '@angular/forms';
import { AddSkillsComponent } from '../add-skills/add-skills.component';
import { AddLanguagesComponent } from '../add-languages/add-languages.component';
import { AddLocationsComponent } from '../add-locations/add-locations.component';

@NgModule({
  declarations: [
    FindResumeComponent,
    AddSkillsComponent,
    AddLanguagesComponent,
    AddLocationsComponent,
    LanguageSectionComponent,
    LanguageButtonComponent,
    LanguageDropDownComponent,
    LocationButtonComponent,
    LocationDropDownComponent,
    LocationSectionComponent
  ],
  exports: [
    FindResumeComponent,
    AddSkillsComponent,
    AddLanguagesComponent,
    AddLocationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  entryComponents:[
    LanguageDropDownComponent,
    LocationDropDownComponent
  ]
})
export class FindResumeModule { }
