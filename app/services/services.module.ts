/**
 * Services module
 */

import { NgModule } from '@angular/core';
import { APIService } from './api-service/api.service';
import { ChatService } from './chatbot-service/chat.service';
import { Http2Service } from './http2/http2.service';

@NgModule({
  providers: [
    APIService,
    ChatService,
    Http2Service
  ],
})
export class ServicesModule {}
