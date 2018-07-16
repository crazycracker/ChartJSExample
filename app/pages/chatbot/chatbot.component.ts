import { Component, OnInit } from '@angular/core';
import { AppChatbotPage } from './chatbot.constants.component';

@Component({
  selector: 'app-chatbot-page',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})


export class ChatbotComponent implements OnInit {

  constructor() { }
  
  public username: any;

  /**
   * @method ngOnInit
   * @description : Getting the Constants from chatbot.constants Component
   */

  ngOnInit() : void {    
    this.username=AppChatbotPage;
  }

}
