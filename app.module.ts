import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppComponent }   from './app.component';
import { FindBestResumeComponent } from './find-best-resume/find-best-resume.component';
import { DynamicContentsComponent } from './dynamic-contents/dynamic-contents.component';

@NgModule({
  imports:      [ BrowserModule ,FormsModule],
  declarations: [ AppComponent, FindBestResumeComponent, DynamicContentsComponent],
  bootstrap:    [ AppComponent ,FindBestResumeComponent, DynamicContentsComponent],
})

export class AppModule { }