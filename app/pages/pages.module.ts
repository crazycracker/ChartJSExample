/**
 * Pages module
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from '../components/components.module';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FindBestResumeComponent } from './find-best-resume/find-best-resume.component';

@NgModule({
  declarations: [
  ChatbotComponent,
  FindBestResumeComponent],
  imports: [
    CommonModule,
    ComponentsModule,
  ],
})
export class PagesModule { }
