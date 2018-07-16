import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../../services/chatbot-service/chat.service';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public replyMessage: any = '';
  public chatMessages: any = [];
  /**
   * @constructor injects the dependent services
   * @description : The constructor initialises the class variables with the dependencies injected into the class
   * @param {ChatService} chatService
   */
  constructor(private chatService: ChatService) { }

  /**
   * @method ngOnInit
   * @description : subscribing the method from Chatservice
   */
  ngOnInit() {
    this.chatService.getChatDetails().subscribe(response => {
      this.chatMessages = response;
    });
    this.chatService.updateUserDetails({ userId: 'abc', password: 'abcd' }).subscribe(response => {
      console.log(response);
    });

  }


  /**
   * @method replyReceivedd
   * @description : Used to get the reply from user
   * @return {Object} data: push the data into chatMessage object
   */
  public replyReceived(): void {
    this.chatMessages.push({
      'text': this.replyMessage,
      'self': true
    });

    this.replyMessage = '';
  }
}
