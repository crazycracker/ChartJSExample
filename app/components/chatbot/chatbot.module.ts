/**
 * Module for chatbot Child components
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ChatComponent,
  ],
  exports: [
    ChatComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class ChatBotModule { }
