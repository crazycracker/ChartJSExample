/**
 * Components Module
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChatBotModule } from './chatbot/chatbot.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { HeaderModule } from './header/header.module';
import { FindResumeModule } from '../components/find-best-resume/find-resume/find-resume.module';


@NgModule({
  declarations: [],
  exports: [
    ChatBotModule,
    SidebarModule,
    HeaderModule,
    FindResumeModule
  ],
  imports: [
    CommonModule,
    ChatBotModule,
    SidebarModule,
    HeaderModule,
    FindResumeModule
  ],
})
export class ComponentsModule { }
